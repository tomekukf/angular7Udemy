import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {reject} from 'q';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData' : new FormGroup({
        'username': new FormControl(null, Validators.required),
        'email': new FormControl(null, [ Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'gender': new FormControl('male'),
      'hobbies' : new FormArray([])
    });


    // We have to observalbes binded with FormGroup. We can monitor value and status changes on form element
    this.signupForm.valueChanges.subscribe(
      (value) => {
        console.log(this.signupForm)
        console.log(value);
      }
    );
    this.signupForm.statusChanges.subscribe(
      (value) => {
        console.log(value);
      }
    );
    // We need to pass copy of our form objetc represenattion
    this.signupForm.setValue({
      'userData' : {
        'username' : 'tomek',
        'email': 'tomek@domek.pl'
      },
      'gender' : 'male',
      'hobbies' : []
    });

    this.signupForm.patchValue({
      'userData' : {
        'username' : 'marlenka'
      }
    });
  }

  onSubmit() {
    console.log(this.signupForm.value.email);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve, reject) =>{
       setTimeout(() => {
  if (control.value === 'test@test.com'){
    // if form is invalid we need to return true binded with error message to wihch we can reffer later i html or somewhere in the code
    resolve({'AlleadyUsed': true});
  } else {
    resolve(null);
  }
       }, 2000);
    });

    return promise;
  }

}
