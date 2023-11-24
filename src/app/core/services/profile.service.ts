import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilityService } from './utility.service';
import { EMPTY, catchError, map } from 'rxjs';

interface RequestTrackResponse {
  userId: number;
  requests: {
    createdAt: string;
    input: string;
    output: string;
  }[];
}

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
    return this.http.get(this.baseUrl + '/req', { observe: 'response' }).pipe(
      map((response) => {
        const body = response.body as RequestTrackResponse;
        return body;
      }),
      catchError(() => {
        return EMPTY;
      }),
    );
  }
}
