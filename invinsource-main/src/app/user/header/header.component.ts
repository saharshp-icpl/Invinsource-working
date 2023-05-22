import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { ToastService } from '../../shared/toast.service';
import { ApiService } from '../../shared/api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { LocalService } from '../../shared/local.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isNotLoggedIn = false;

  constructor(private router: Router, private auth: AuthService, private apiService: ApiService, private spinner: NgxSpinnerService, private toast: ToastService, private local: LocalService) { }

  ngOnInit() {
    this.isNotLoggedIn = this.auth.isNotLoggedIn();
  }

  logout() {
    const token = JSON.parse(this.local.getData('token'));
    const reqBody = {
      email: this.local.getData('email'),
      acc_token: token.access_token
    }

    try {
      this.spinner.show();
      this.apiService.globalLogout(reqBody).subscribe((response: any) => {
        this.auth.logout();
        this.spinner.hide();
        this.router.navigate(['/login']);
      });
    } catch (err: any) {
      this.spinner.hide();
      this.toast.showError(err, "Error");
    }
  }
}