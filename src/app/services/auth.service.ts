import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilityService } from './utility.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authenticated = false;
  private redirectUrl = '';
  private baseUrl = this.utility.getApiUrl();

  constructor(
    private http: HttpClient,
    private utility: UtilityService,
  ) {}

  signIn(email: string, password: string) {
    return this.http.post(
      this.baseUrl + '/login',
      {
        email: email,
        password: password,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
