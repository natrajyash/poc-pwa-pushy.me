import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnableNotificationsComponent } from './components/enable-notifications/enable-notifications.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'enable-notifications',
    component: EnableNotificationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
