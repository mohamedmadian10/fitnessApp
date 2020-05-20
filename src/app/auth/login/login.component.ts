import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UiService } from 'src/app/_services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  private loadSub: Subscription;
  constructor(private authservice: AuthService, private uiService: UiService) {}

  ngOnInit(): void {
    this.loadSub = this.uiService.loadingSpinner.subscribe((loading) => {
      this.isLoading = loading;
    });
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  onlogin() {
    this.authservice.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    });
    console.log(this.loginForm);
  }
  ngOnDestroy() {
    if (this.loadSub) {
      this.loadSub.unsubscribe();
    }
  }
}
