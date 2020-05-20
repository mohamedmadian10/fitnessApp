import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate,CanLoad {
  constructor(private authService:AuthService,private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
     if (this.authService.isAuth()) return true;

      this.router.navigate(['/login'])

  }
  canLoad(
    route:Route
    
  ): Observable<boolean> | Promise<boolean> | boolean {
     if (this.authService.isAuth()) return true;

      this.router.navigate(['/login'])

  }
}
