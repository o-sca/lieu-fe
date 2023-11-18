import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilityService } from './utility.service';
import { catchError, map, throwError } from 'rxjs';

interface ProfileResponse {
  name: string;
  email: string;
  user_type: string;
}

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private _baseUrl: string;

  constructor(
    private http: HttpClient,
    private utility: UtilityService,
  ) {
    this._baseUrl = this.utility.getApiUrl();
  }

  getProfile() {
    return this.http
      .get(this._baseUrl + '/me', { observe: 'body' as const })
      .pipe(
        map((response) => {
          return response as ProfileResponse;
        }),
        catchError((err) => {
          return throwError(() => err);
        }),
      );
  }
}
