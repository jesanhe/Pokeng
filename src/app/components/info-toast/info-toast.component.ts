import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-info-toast',
  templateUrl: './info-toast.component.html',
  styleUrls: ['./info-toast.component.scss'],
})
export class InfoToastComponent implements OnInit {
  constructor(public toastService: ToastService) {}

  isTemplate(toast) {
    return toast.textOrTpl instanceof TemplateRef;
  }

  ngOnInit() {}
}
