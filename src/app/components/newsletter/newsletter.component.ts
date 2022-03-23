import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {

  isNewsletterSend: boolean = false;
  isNewsletterSendFailed: boolean = false;
  isLoadingFinished: boolean = true;

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  sendNewsletter(): void {
    this.isLoadingFinished = false;
    this.notificationService.send().subscribe((response: any) => {
      this.isLoadingFinished = true;
      if (response.hasOwnProperty('isError')) {
        this.isNewsletterSendFailed = true;
      } else {
        this.isNewsletterSend = true;
      }
    });
  }

}
