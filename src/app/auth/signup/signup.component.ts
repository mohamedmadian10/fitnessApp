import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/_services/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  private loadSub: Subscription;
  maxDate;
  constructor(private authservice: AuthService, private uiser: UiService) {}

  ngOnInit(): void {
    this.loadSub = this.uiser.loadingSpinner.subscribe((loading) => {
      this.isLoading = loading;
    });
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    console.log(this.maxDate);
  }
  onSignup(form: NgForm) {
    // console.log(f);
    this.authservice.registerUser({
      email: form.value.email,
      password: form.value.password,
    });
  }
  ngOnDestroy() {
    if (this.loadSub) {
      this.loadSub.unsubscribe();
    }
  }
}
