import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilityService } from './utility.service';
import { catchError, map, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SummaryService {
  constructor(
    private http: HttpClient,
    private utility: UtilityService,
  ) {}

  summarise(text: string) {
    return this.http
      .post(
        this.utility.getApiUrl() + '/ai/text/summarise',
        { text: text },
        {
          observe: 'response',
        },
      )
      .pipe(
        map((response) => {
          return response.body as { result_text: string };
        }),
        catchError((err) => {
          return throwError(() => err);
        }),
      );
  }

  generate(text: string) {
    return this.http
      .post(
        this.utility.getApiUrl() + '/ai/gen/generate',
        { text: text },
        {
          observe: 'response',
        },
      )
      .pipe(
        map((response) => {
          return response.body as { result_text: string };
        }),
        catchError((err) => {
          return throwError(() => err);
        }),
      );
  }
}
