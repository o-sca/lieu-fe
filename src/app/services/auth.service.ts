import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signIn(email: string, password: string) {
    return this.http.post(
      'http://localhost:3000/signin',
      {
        email: email,
        password: password,
      },
      { headers: { 'content-type': 'application/json' } },
    );
  }
}
