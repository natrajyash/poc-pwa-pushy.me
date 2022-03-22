import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private commonService: CommonService
  ) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/users/').pipe(
      catchError((error) => { this.commonService.handleError(error); return of([]); })
    );
  }
}
