import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private spinner: NgxSpinnerService,private router: Router) { }

  personalDetails!: FormGroup;
  ndaDetails!: FormGroup;
  workDetails!: FormGroup;
  testDetails!: FormGroup;
  technicalDetails!: FormGroup;

  personal_step = false;
  nda_step = false;
  work_step = false;
  test_step = false;
  technical_step = false;
  confirmation_step = false;

  step = 1;

  apiResponse = null;

  ngOnInit() {

    // this.apiService.getAllProfiles().subscribe((response)=>{
    //   console.log(response);
    // });

    this.personalDetails = this.formBuilder.group({
      name: ['',Validators.required],
      phone: ['',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: ['',Validators.email],
      terms: ['',Validators.required],

      // fname: ['', Validators.required],
      // lname: ['', Validators.required],
      // phone: ['', Validators.required],
      // email: ['', Validators.required],
    });

    this.ndaDetails = this.formBuilder.group({
      nda: [''],
    });

    this.workDetails = this.formBuilder.group({
      work_experience: [''],
    });

    this.testDetails = this.formBuilder.group({
      bg_test: [''],
      apt_test: [''],
    });
    
    this.technicalDetails = this.formBuilder.group({
      compliance: [''],
      offensive: [''],
      defensive: [''],
      devsecops: [''],
    });
    

    // this.addressDetails = this.formBuilder.group({
    //   city: ['', Validators.required],
    //   address: ['', Validators.required],
    //   pincode: ['', Validators.required]
    // });

    // this.educationalDetails = this.formBuilder.group({
    //   highest_qualification: ['', Validators.required],
    //   university: ['', Validators.required],
    //   total_marks: ['', Validators.required]
    // });
    
  }

  get personal() { return this.personalDetails.controls; }
  get nda() { return this.ndaDetails.controls; }
  get work() { return this.workDetails.controls; }
  get test() { return this.testDetails.controls; }
  get technical() { return this.technicalDetails.controls; }

  next() {
    this.hideSteps();
    if (this.step == 1) {
      if (this.personalDetails.invalid) { return }
      this.step++;
      this.nda_step = true;
    }
    else if (this.step == 2) {
      if (this.ndaDetails.invalid) { return }
      this.work_step = true;
      this.step++;
    }
    else if (this.step == 3) {
      if (this.workDetails.invalid) { return }
      this.test_step = true;
      this.step++;
    }
    else if (this.step == 4) {
      if (this.testDetails.invalid) { return }
      this.test_step = true;
      this.step++;
    }
    else if (this.step == 5) {
      if (this.technicalDetails.invalid) { return }
      this.technical_step = true;
      this.step++;
    }
    else if (this.step == 6) {
      this.confirmation_step = true;
    }

  }

  previous() {
    this.step--;
    this.hideSteps();
    if (this.step == 1) {
      this.personal_step = true;
    }
    else if (this.step == 2) {
      this.nda_step = true;
    }
    else if (this.step == 3) {
      this.work_step = true;
    }
    else if (this.step == 2) {
      this.test_step = true;
    }
    else if (this.step == 5) {
      this.technical_step = true;
    }
  }

  hideSteps(){
    this.personal_step = false;
    this.nda_step = false;
    this.work_step = false;
    this.test_step = false;
    this.technical_step = false;
    this.confirmation_step = false;
  }

  submit() {
    const requestBody = {
      ...this.personalDetails.value || {},
      ...this.ndaDetails.value || {},
      work_experience:this.workDetails.value.work_experience || {},
      ...this.testDetails.value || {},
      "technical_experience":JSON.stringify(this.technicalDetails.value) || {},
      "meta":JSON.stringify([{"technical_skills":this.technicalDetails.value}] || []),
    }
    
    this.spinner.show();
    setTimeout(()=>{
      this.spinner.hide();
      this.confirmation_step = true;
      this.step++;
    },4000);

    this.apiService.createProfile(requestBody).subscribe((response: any)=>{
      this.spinner.hide();
      if(response && response.statusCode === 200){
        this.router.navigate(['/login']);
      }
    });

    // this.apiService.getAllProfiles().subscribe((response)=>{
    //     console.log(response);
    // });
    
  }
}
