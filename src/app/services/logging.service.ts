import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  constructor(private toastr: ToastrService) {}

  logError(message: string, stack: string) {
    this.toastr.error(message, null, {
      onActivateTick: true,
      timeOut: 5000,
      positionClass: 'toast-bottom-center',
    });
  }
}
