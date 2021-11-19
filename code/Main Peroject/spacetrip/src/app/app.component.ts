import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubmitService } from './services/submit.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  registerForm: any;
  user: any={};
  submitted :boolean = false;
  name: any 
  details:any
  trip:any
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
    constructor(private formBuilder: FormBuilder, public ps: SubmitService) {
      
      
      this.name=localStorage.getItem('Users');
      console.log(this.name)
      if(this.name != null){
        this.details = JSON.parse(this.name)
        this.trip =this.details.trip
        this.firstName =this.details.firstName
        this.lastName=this.details.lastName
        this.dob=this.details.dob
      }
      
     }
     record:any

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            trip: [this.trip, Validators.required],
            sugar: [this.sugar, Validators.required],
            bp: [this.bp, Validators.required],
            heart: [this.heart, Validators.required],
            respiratory: [this.respiratory, Validators.required],
            firstName: [this.firstName, Validators.required],
            lastName: [this.lastName, Validators.required],
            dob: [this.dob, [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
            email: [this.email, [Validators.required, Validators.email]],
            blood:[this.blood,Validators.required],
            phone: [this.phone, [Validators.required, Validators.minLength(10)]],
            code: [this.code, Validators.required],
            acceptTerms: [false, Validators.requiredTrue]
        }, {
            
        });
    }
    
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
      console.log("hii");
      
      console.log(this.registerForm.value);
      this.user=Object.assign(this.user, this.registerForm.value)
      localStorage.setItem('Users',JSON.stringify(this.user));
      
        // this.submitted = true;

        // // stop here if form is invalid
        // if (this.registerForm.invalid) {
        //     return;
        // }

        // // display form values on success
        // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    }

    fun() {
      this.submitted = true

      console.log(this.registerForm.value);
  
      this.ps.addrecord(this.registerForm.value).subscribe((data) => {
        console.log(data);
  
        this.record = data;
      });
      localStorage.removeItem('Users')
    }
}