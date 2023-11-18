import { CommonModule, NgIf } from '@angular/common';
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
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgIf,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  authError: boolean;
  errorMessage: string;
  username: FormControl;
  password: FormControl;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
    this.authError = false;
    this.errorMessage = '';
    this.username = new FormControl(null, [Validators.required]);
    this.password = new FormControl(null, [Validators.required]);
  }

  getErrorMessage(): string {
    if (this.username.hasError('required')) {
      return 'You must enter a username';
    }

    if (this.password.hasError('required')) {
      return 'Password is required';
    }

    return 'Invalid value';
  }

  signIn() {
    this.auth.signIn(this.username.value!, this.password.value!).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.authError = true;
        this.errorMessage = err.message;
      },
    });
  }
}
