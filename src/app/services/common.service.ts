import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  toasts: any[] = [];

  constructor() { }

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }

  handleError(error: any): void {
    let errorMessage = 'Unknown Error';
    if (error instanceof HttpErrorResponse) {
      if (error?.hasOwnProperty('error') && error?.error?.hasOwnProperty('error')) {
        errorMessage = error?.error?.error;
      } else if (error?.hasOwnProperty('statusText') && error?.statusText) {
        errorMessage = error?.statusText;
      } else {
        errorMessage = 'Unknown Server Error';
      }
    } else if (error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    }
    this.show(errorMessage, { classname: 'bg-danger text-light'});
  }
}
