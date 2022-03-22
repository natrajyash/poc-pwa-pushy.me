import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss'],
  host: {'class': 'toast-container position-fixed bottom-0 end-0 p-3', 'style': 'z-index: 1200'}
})
export class ToastsComponent implements OnInit {

  constructor(
    public commonService: CommonService
  ) { }

  ngOnInit(): void {
  }

  isTemplate(toast: any) { return toast.textOrTpl instanceof TemplateRef; }

}
