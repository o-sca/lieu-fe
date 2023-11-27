import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, catchError, map } from 'rxjs';
import { TrackedRequest } from '../schemas/requests.schema';
import { UtilityService } from './utility.service';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly baseUrl: string;

  constructor(
    private http: HttpClient,
    private utility: UtilityService,
  ) {
    this.baseUrl = this.utility.getApiUrl();
  }

  getProfile() {
    return this.http
      .get(this.baseUrl + '/requests', { observe: 'response' })
      .pipe(
        map((response) => {
          const body = response.body as TrackedRequest[];
          return body;
        }),
        catchError(() => {
          return EMPTY;
        }),
      );
  }
}
