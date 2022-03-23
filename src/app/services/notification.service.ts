import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private http: HttpClient,
    private commonService: CommonService
  ) { }

  addPushSubscriber(sub: any) {
    return this.http.post('/api/notifications', sub).pipe(
      catchError((error) => { this.commonService.handleError(error); return of({isError: true}); })
    );
  }

  send() {
    return this.http.post('/api/newsletter', null).pipe(
      catchError((error) => { this.commonService.handleError(error); return of({isError: true}); })
    );
  }

}
