import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/services/notification.service';
import 'babel-polyfill';
declare var Pushy: any;

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class WelcomeComponent implements OnInit {

  isNotificationPermissionGranted = false;
  isLoadingFinished = false;
  errorMessage: string = "Error! Notifications could not be subscribed to!";
  @ViewChild('modal') modal: any;

  constructor(
    private router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private notificationService: NotificationService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
      if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'notifications' })
        .then((permission) => {
          if (permission.state == 'granted') {
            this.isNotificationPermissionGranted = true;
          }
          this.isLoadingFinished = true;
          permission.onchange = () => {
            if (permission.state == 'granted') {
              this.isNotificationPermissionGranted = true;
            } else {
              this.isNotificationPermissionGranted = false;
            }
          }
        });
    }
  }

  async subscribe(): Promise<void> {
    // Register visitor to receive push notifications
    await Pushy.register({ appId: '6242b0447cbf7cf4508887e0' }).then((deviceToken: string) => {
      // Print device token to console
      console.log('Pushy device token: ' + deviceToken);

      // Send the token to your backend server via an HTTP GET request
      this.notificationService.addPushSubscriber({deviceToken: deviceToken}).subscribe();
    }).catch((err: any) => {
      // Handle registration errors
      console.error('Pushy Error => ', err);
      console.log('reached below error');
      this.errorMessage = 'Could not subscribe due to: "' + err + '"';
      console.log('reached errorMessage', this.errorMessage);
      this.open(this.modal);
    });
  }

  open(content: any) {
    console.log('reached open');
    this.modalService.open(content);
  }

  navigate(): void {
    this.router.navigateByUrl('enable-notifications');
  }

}
