import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { AuthData } from '../_models/auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ExerciseService } from './exercise.service';
import { UiService } from './ui.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChange = new Subject<boolean>();
  // private user: User;
  private isAuthenticated = false;
  constructor(
    private router: Router,
    private afauth: AngularFireAuth,
    private exerSer: ExerciseService,
    private uiService: UiService,
    private db: AngularFirestore
  ) {}
  initAuthListener() {
    this.afauth.authState.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.exerSer.cancelSubscription();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData) {
    this.uiService.loadingSpinner.next(true);
    this.afauth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((user) => {
        this.uiService.loadingSpinner.next(false);
        this.db.collection('user').doc(user.user.uid).valueChanges()

      })
      .catch((err) => {
        this.uiService.loadingSpinner.next(false);
        this.uiService.showSnackBar(err.message,null,4000,'top')
        // this.snackBar.open(err.message, null, {
        //   duration: 3000,
        //   verticalPosition: 'top',
        // });
      });
  }

  login(authData: AuthData) {
    this.uiService.loadingSpinner.next(true);
    this.afauth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((user) => {
        this.uiService.loadingSpinner.next(false);
      })
      .catch((err) => {
        this.uiService.loadingSpinner.next(false);
        this.uiService.showSnackBar(err.message,null,4000,'top')
        // this.snackBar.open(err.message, null, {
        //   duration: 3000,
        //   verticalPosition: 'top',
        // });
      });
  }
  logout() {
    this.afauth.signOut();
  }
  // getUser() {
  //   return { ...this.user };
  // }
  isAuth() {
    return this.isAuthenticated;
  }
}
