import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  isSubscribed(): boolean {
    return !!localStorage.getItem('pwa-sub')
  }

  getSubscription(): any {
    let sub = localStorage.getItem('pwa-sub');
    return sub ? JSON.parse(sub) : null;
  }

  saveSubscription(sub: any): void {
    localStorage.setItem('pwa-sub', JSON.stringify(sub));
  }

  deleteSubscription(): void {
    localStorage.removeItem('pwa-sub');
  }
}
