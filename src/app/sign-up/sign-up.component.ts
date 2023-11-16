import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  registrationError = false;
  errorMessage = '';

  name = new FormControl(null, [Validators.required]);
  email = new FormControl(null, [Validators.required, Validators.email]);
  password = new FormControl(null, [Validators.required]);

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  signUp() {
    this.auth
      .signUp(this.email.value!, this.password.value!, this.name.value!)
      .subscribe(
        (response) => {
          if (response.ok) {
            this.router.navigate([this.auth.redirectUrl]);
          }
        },
        (err) => {
          this.registrationError = true;
          this.errorMessage = err.error.message;
        },
      );
  }

  getErrorMessage(control: FormControl) {
    if (control.getError('required')) {
      return 'You must enter a value';
    }
    if (control.getError('email')) {
      return 'You must enter a valid email';
    }
    return 'Invalid value';
  }
}
