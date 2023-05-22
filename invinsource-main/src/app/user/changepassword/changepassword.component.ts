import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute , Router, ParamMap} from '@angular/router';
import { LocalService } from '../../shared/local.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangePasswordComponent {

  changePasswordForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private spinner: NgxSpinnerService, private route : ActivatedRoute, private router : Router, private local: LocalService) { }

  ngOnInit(){
    this.changePasswordForm = this.formBuilder.group({
      newPassword: ['',Validators.required],
      confirmPassword: ['',Validators.required],
    });
  }

  submit() {
    const requestBody = {
      email: this.local.getData('email'),
      session: this.local.getData('session'),
      new_password: this.changePasswordForm.value.newPassword
    }
    this.spinner.show();
    this.apiService.confirmSignUp(requestBody).subscribe((response: any) => {
      this.spinner.hide();
      this.local.clearData();
      if(response && response.statusCode === 200){
        this.router.navigate(['/login']);
      }
    });
  }
}