import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-info-toast',
  templateUrl: './info-toast.component.html',
  styleUrls: ['./info-toast.component.scss'],
})
export class InfoToastComponent implements OnInit {
  constructor(toastService: ToastService) {
    console.log('toast', toastService);
  }

  ngOnInit() {}
}
