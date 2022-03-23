import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { CommonService } from './services/common.service';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'poc-pwa';
  loading: boolean = false;

  constructor(
    private commonService: CommonService,
    private loadingService: LoadingService
  ){ }

  ngOnInit() {
    this.listenToLoading();
  }
  
  listenToLoading(): void {
    this.loadingService.loadingSub
      .pipe(delay(0))
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

  ngOnDestroy(): void {
    this.commonService.clear();
  }
}
