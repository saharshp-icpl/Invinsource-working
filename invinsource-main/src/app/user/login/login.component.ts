import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { LocalService } from '../../shared/local.service';
import { ToastService } from '../../shared/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private spinner: NgxSpinnerService, private route: ActivatedRoute, private router: Router, private local: LocalService, private toast: ToastService) { }

  ngOnInit() {
    this.local.clearData();

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }

  login() {
    const requestBody = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.spinner.show();
    try {
      this.apiService.login(requestBody).subscribe((response: any) => {
        this.spinner.hide();
        const { data, statusCode, message } = response;
        if (data && statusCode == 200) {
          const { ChallengeName, Session } = data;
          if (ChallengeName == "NEW_PASSWORD_REQUIRED" && Session) {
            this.local.saveData('session', Session);
            this.local.saveData('email', this.loginForm.value.email);
            this.router.navigate(['/change-password']);
          } else {
            this.local.saveData('token', JSON.stringify(data || {}));
            this.local.saveData('email', this.loginForm.value.email);
            this.router.navigate(['/profile']);
          }
        } else {
          if(statusCode == 400){
            this.toast.showError("You are not registered with us, Please signup.","Error");
          } else {
            this.toast.showError(message,"Error");
          }
        }
      });
    } catch (err: any) {
      this.toast.showError(err,"Error");
    }
  }
}