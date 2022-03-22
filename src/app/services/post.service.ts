import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  currentUser: any = null;

  constructor() { }
}
