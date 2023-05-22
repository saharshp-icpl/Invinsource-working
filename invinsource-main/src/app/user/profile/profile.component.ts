import { Component } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalService } from '../../shared/local.service';
import { ToastService } from '../../shared/toast.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  profileData: any = {};

  constructor(private apiService: ApiService, private spinner: NgxSpinnerService, private route : ActivatedRoute, private router : Router, private local : LocalService, private toast: ToastService) { }

  ngOnInit(){
    this.profile();
  }

  profile() {
    const token = JSON.parse(this.local.getData('token'));
    const requestBody = {
      acc_token: token.access_token
    }
    this.spinner.show();
    this.apiService.getUserProfile(requestBody).subscribe((response: any) => {
      this.spinner.hide();
      const {data, statusCode} = response;
      if(data && statusCode == 200){
        this.profileData = data;
      } else if(statusCode == 400){
        this.toast.showError('Session expired, please login again', 'Error');
        this.router.navigate(['/login']);
      }
    });
  }
}