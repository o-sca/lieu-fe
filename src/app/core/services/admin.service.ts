import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, throwError } from 'rxjs';
import { UtilityService } from './utility.service';
import {
  Endpoint,
  RequestUser,
  TrackedRequestAdmin,
} from '../schemas/requests.schema';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly _baseUrl: string;

  constructor(
    private http: HttpClient,
    private utility: UtilityService,
  ) {
    this._baseUrl = this.utility.getApiUrl();
  }

  getAll() {
    return this.http
      .get(this._baseUrl + '/requests/all', { observe: 'response' })
      .pipe(
        map((response) => {
          return response.body as TrackedRequestAdmin[];
        }),
        catchError((err) => {
          return throwError(() => err);
        }),
      );
  }

  getEndpointCount() {
    return this.http
      .get(this._baseUrl + '/requests/log', { observe: 'response' })
      .pipe(
        map((response) => {
          return response.body as Endpoint[];
        }),
        catchError((err) => {
          return throwError(() => err);
        }),
      );
  }

  getAllUsers() {
    return this.http
      .get(this._baseUrl + '/requests/users', { observe: 'response' })
      .pipe(
        map((response) => {
          return response.body as RequestUser[];
        }),
        catchError((err) => {
          return throwError(() => err);
        }),
      );
  }

  upgradeToAdmin(userId: number) {
    return this.http
      .put(
        this._baseUrl + '/auth/privileges',
        { userId: userId, userType: 'ADMIN' },
        { observe: 'response' },
      )
      .pipe(
        map((response) => {
          return response.body;
        }),
        catchError((err) => {
          return throwError(() => err);
        }),
      );
  }

  downgradeToUser(userId: number) {
    return this.http
      .put(
        this._baseUrl + '/auth/privileges',
        { userId: userId, userType: 'USER' },
        { observe: 'response' },
      )
      .pipe(
        map((response) => {
          return response.body;
        }),
        catchError((err) => {
          return throwError(() => err);
        }),
      );
  }
}
