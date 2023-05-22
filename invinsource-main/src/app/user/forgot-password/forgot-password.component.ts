import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute , Router, ParamMap} from '@angular/router';
import { LocalService } from '../../shared/local.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  forgotPasswordForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private spinner: NgxSpinnerService, private route : ActivatedRoute, private router : Router, private local: LocalService) { }

  ngOnInit(){
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['',Validators.required],
    });
  }

  recoverPassword() {
    const emailAddress = this.forgotPasswordForm.value.email
    this.local.saveData('email', emailAddress);
    const requestBody = {
      email: emailAddress
    }
    this.spinner.show();
    this.apiService.forgotPassword(requestBody).subscribe((response: any) => {
      this.spinner.hide();
      if(response && response.statusCode === 200){
        this.router.navigate(['/reset-password']);
      }
    });
  }
}