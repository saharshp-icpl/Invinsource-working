import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasterOptions = {
    timeout: 5000,
    progressBar: true,
  }

  constructor(private toastr: ToastrService) { }

  showSuccess(msg: string, title: string = "Success") {
    this.toastr.success(msg, title, this.toasterOptions);
  }

  showError(msg: string, title: string = "Error") {
    this.toastr.error(msg, title, this.toasterOptions);
  }

  showInfo(msg: string, title: string = "Information") {
    this.toastr.info(msg, title, this.toasterOptions);
  }

  showWarning(msg: string, title: string = "Warning") {
    this.toastr.warning(msg, title, this.toasterOptions);
  }

}