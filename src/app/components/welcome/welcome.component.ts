import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/services/notification.service';

const WEB_PUSH_PUBLIC_KEY = "BJy_ehmZZv-Kh2BZgVjvhtEtYq0ukfoG3M_ujLcR84_eLsvf6DifhDbwqrM3Xl5eRXzeQ8SJPpxoP0OFwf_fbxA";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class WelcomeComponent implements OnInit {

  isSubscribed: boolean = false;
  errorMessage: string = "Error! Notifications could not be subscribed to!";
  @ViewChild('modal') modal: any;

  constructor(
    private swPush: SwPush,
    private router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private notificationService: NotificationService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.isSubscribed = this.notificationService.isSubscribed();
    console.log(this.isSubscribed);
  }

  async subscribe(): Promise<void> {
    try {
      const sub = await this.swPush.requestSubscription({
        serverPublicKey: WEB_PUSH_PUBLIC_KEY,
      });
      console.log(sub);
      this.isSubscribed = true;
      this.notificationService.saveSubscription(sub);
      // TODO: Send to server.
    } catch (err) {
      console.error('Could not subscribe due to:', err);
      this.errorMessage = 'Could not subscribe due to: "' + err + '"';
      this.open(this.modal);
    }
  }

  async clearSubscription(): Promise<void> {
    try {
      await this.swPush.unsubscribe();
      this.notificationService.deleteSubscription();
      this.isSubscribed = false;
    } catch (error) {
      alert('Unsubscribe didn\'t work');
    }
  }
  
  open(content: any) {
    this.modalService.open(content);
  }
  
  navigate(): void {
    this.router.navigateByUrl('enable-notifications');
  }

}
