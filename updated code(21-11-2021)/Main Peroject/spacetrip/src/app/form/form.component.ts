import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubmitService } from '../services/submit.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  error: any;
  err = 0;
  registerForm: any;
  user: any = {};
  submitted: boolean = false;
  name: any
  details: any
  trip: any
  sugar: any;
  bp: any;
  heart: any;
  respiratory: any;
  firstName: any;
  lastName: any;
  dob: any;
  email: any;
  blood: any;
  phone: any;
  code: any;
  address: any;
  address2: any;
  why: any;

  constructor(private formBuilder: FormBuilder, public ps: SubmitService) {

    this.name = localStorage.getItem('Users');
    console.log(this.name)
    if (this.name != null) {
      this.details = JSON.parse(this.name)
      this.trip = this.details.trip
      this.firstName = this.details.firstName
      this.lastName = this.details.lastName
      this.dob = this.details.dob
      this.email = this.details.email
      this.phone = this.details.phone
      this.sugar = this.details.sugar
      this.heart = this.details.heart
      this.blood = this.details.blood
      this.bp = this.details.bp
      this.address = this.details.address
      this.address2 = this.details.address2
      this.code=this.details.code
      this.respiratory=this.details.respiratory
    }

  }
  record: any

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({

      trip: [this.trip, Validators.required],
      address: [this.address, Validators.required],
      address2: [this.address2, Validators.required],
      sugar: [this.sugar, Validators.required],
      bp: [this.bp, Validators.required],
      heart: [this.heart, Validators.required],
      respiratory: [this.respiratory, Validators.required],
      firstName: [this.firstName, Validators.required],
      lastName: [this.lastName, Validators.required],
      dob: [this.dob, [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      email: [this.email, [Validators.required, Validators.email]],
      blood: [this.blood, Validators.required],
      phone: [this.phone, [Validators.required, Validators.minLength(10)]],
      code: [this.code, Validators.required],
      why: [],
      

    }, {

    });


  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    console.log("hii");

    console.log(this.registerForm.value);
    this.user = Object.assign(this.user, this.registerForm.value)
    localStorage.setItem('Users', JSON.stringify(this.user));

    
  }

  viewrecord() {
    this.ps.getallrecord().subscribe((data: any) => {
      this.record = data
    })
  }

  fun() {
    this.submitted = true;
    if(this.registerForm.invalid) {
      alert("kindly fill this form")
    }
    else {



      console.log(this.registerForm.value);

      this.ps.test_addrecord(this.registerForm.value).subscribe((data) => {
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
        console.log(data);


      }, (err: string) => {
        this.error = err
        alert(this.error.error.text)
      });

      localStorage.removeItem('Users')
      
    }
  }

}
