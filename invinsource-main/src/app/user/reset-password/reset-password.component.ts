import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute , Router, ParamMap} from '@angular/router';
import { LocalService } from '../../shared/local.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetPasswordForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private spinner: NgxSpinnerService, private route : ActivatedRoute, private router : Router, private local: LocalService) { }

  ngOnInit(){
    this.resetPasswordForm = this.formBuilder.group({
      email: ['',Validators.required],
      newPassword: ['',Validators.required],
      confirmPassword: ['',Validators.required],
      code: ['',Validators.required],
    });
  }

  resetPassword() {
    const email = this.local.getData('email');
    const requestBody = {
      email: email,
      new_password: this.resetPasswordForm.value.newPassword,
      code: this.resetPasswordForm.value.code,
    }
    this.spinner.show();
    this.apiService.confirmForgotPassword(requestBody).subscribe((response: any) => {
      this.spinner.hide();
      if(response && response.statusCode === 200){
        this.router.navigate(['/login']);
      }
    });
  }

}
