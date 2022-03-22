import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-notification',
  templateUrl: './test-notification.component.html',
  styleUrls: ['./test-notification.component.scss']
})
export class TestNotificationComponent implements OnInit {

  isNotificationPermissionGranted = false;
  isLoadingFinished = false;

  constructor() { }

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

  sendNotification(): void {
    const options = {
      body: 'HEY! Your task "POC" is now overdue.',
      icon: '/assets/icons/icon-128x128.png'
    }
    const notification = new Notification('Test Notification', options);
  }

}
