import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { UtilityService } from './utility.service';
import { catchError, map, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authenticated = false;
  private _redirectUrl = '';
  private _baseUrl = this.utility.getApiUrl();
  @Output() authChanged: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private utility: UtilityService,
  ) {}

  get authenticated() {
    return this._authenticated;
  }

  get redirectUrl() {
    return this._redirectUrl;
  }

  signIn(email: string, password: string) {
    return this.http
      .post(
        this._baseUrl + '/login',
        {
          email: email,
          password: password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          observe: 'response',
        },
      )
      .pipe(
        map((response) => {
          this._authenticated = true;
          this._redirectUrl = '/profile';
          this.setAuthChange(true);
          return response;
        }),
        catchError((err) => {
          return throwError(err);
        }),
      );
  }

  signUp(email: string, password: string, name: string) {
    return this.http
      .post(
        this._baseUrl + '/signup',
        {
          email,
          password,
          name,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          observe: 'response',
        },
      )
      .pipe(
        map((response) => {
          this._authenticated = true;
          this._redirectUrl = '/';
          this.setAuthChange(true);
          return response;
        }),
        catchError((err) => {
          return throwError(err);
        }),
      );
  }

  signOut() {
    return this.http
      .get(this._baseUrl + '/logout', { observe: 'response' })
      .pipe(
        map((response) => {
          this._authenticated = false;
          this._redirectUrl = '/';
          this.setAuthChange(false);
          return response;
        }),
        catchError((err) => {
          return throwError(err);
        }),
      );
  }

  private setAuthChange(status: boolean) {
    this.authChanged.emit(status);
  }
}
