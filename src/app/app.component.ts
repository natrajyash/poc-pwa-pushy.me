import { Component, OnDestroy } from '@angular/core';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'poc-pwa';

  constructor(
    private commonService: CommonService
  ){ }

  ngOnDestroy(): void {
    this.commonService.clear();
  }
}
