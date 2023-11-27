import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, throwError } from 'rxjs';
import { UtilityService } from './utility.service';
import { Endpoint, TrackedRequestAdmin } from '../schemas/requests.schema';

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
}
