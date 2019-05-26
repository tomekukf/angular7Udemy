import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {element} from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('f')formRef: NgForm;
  defaultValue =  'pet';
  questionAnswear: any;


  genders: string[] = ['male', 'female'];
  hint = false;
  formSubmitted = false;
   user: any = {
    username: '',
    email: '',
    secret: '',
    answear: '',
    gender: ''

  };

  suggestUserName() {
    const   suggestedName = 'superman';
    // This approach will override other values if we allready have something in from. Not really good approach maybe for filling with example data at beggining
    // this.formRef.setValue({
    //   gender: '',
    //   questionAnswer: '',
    //   secret: '',
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   }
    //
    // })


    // Better apprach is to use pach on form element

    this.formRef.form.patchValue({
     userData: {
       username: suggestedName
     }
    });
    }

  // onSubmit(data: NgForm) {
  //   console.log('work');
  //   console.log(data);
  //   const s = data.value.username ;
  //   console.log('d' + s);
  //
  // }


  onSubmit(){
    this.formSubmitted = true;
    this.user.username = this.formRef.value.userData.username
    this.user.secret = this.formRef.value.secret
    this.user.gender = this.formRef.value.gender
    this.user.answear = this.formRef.value.anwear
    this.user.email = this.formRef.value.userData.email
    console.log(this.formRef)
    console.log(this.formRef.value);

    this.formRef.reset();
  }

  showHint() {
    this.hint = !this.hint;
  }
}
