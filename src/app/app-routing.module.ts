import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnableNotificationsComponent } from './components/enable-notifications/enable-notifications.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { PostsComponent } from './components/posts/posts.component';
import { TestNotificationComponent } from './components/test-notification/test-notification.component';
import { UsersComponent } from './components/users/users.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'enable-notifications',
    component: EnableNotificationsComponent
  },
  {
    path: 'test',
    component: TestNotificationComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'newsletter',
    component: NewsletterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
