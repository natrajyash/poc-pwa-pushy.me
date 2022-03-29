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
    try {
      const deviceToken = await Pushy.register({ appId: '6242b0447cbf7cf4508887e0' });

      // Print device token to console
      console.log('Pushy device token: ' + deviceToken);

      // Send the token to your backend server via an HTTP GET request
      this.notificationService.addPushSubscriber({ deviceToken: deviceToken }).subscribe();
    } catch (err) {
      // Handle registration errors
      console.error('Pushy Error => ', err);
      this.errorMessage = 'Could not subscribe due to: "' + err + '"';
      this.open(this.modal);
    }
  }

  open(content: any) {
    this.modalService.open(content);
  }

  navigate(): void {
    this.router.navigateByUrl('enable-notifications');
  }

}
