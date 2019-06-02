import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService, IAuthResponse} from './auth.service';
import {Observable} from 'rxjs';

interface ILogin {
  email: string,
  password: string
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  isAuthenticated=true;
  authForm: FormGroup;
   message: string;
  isloading = false;

  authObservable : Observable<IAuthResponse>;


  private returnUrl: '../';

  model: ILogin = { email: "admin", password: "admin123" };
  error = null;


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private authService: AuthService
  ) { }



  ngOnInit() {
    this.initForm()
  }

  swtichMOde() {
    this.isAuthenticated= !this.isAuthenticated;
  }
  get f() { return this.authForm.controls; }


  onSubmit() {

    this.isloading=true;
    let email = this.f.email.value;
    let password = this.f.password.value;


    if (this.authForm.invalid) {
      return;
    }else {

      if (this.isAuthenticated) {
        console.log('logging ...')
        this.authObservable = this.authService.login(email, password)
      } else {
        console.log('signing up ...')
        this.authObservable = this.authService.signUp(email, password)
      }
    }
      this.authObservable.subscribe(
        (res) =>{
          this.router.navigate(['../recipes'])
          console.log(res)
          this.isloading=false;

        },
        error1 => {
          console.log(error1)

          this.error = error1.error.error.message
          this.isloading=false;

        }
      );
      this.authForm.reset()

    }

      // if(this.f.email.value == this.model.email && this.f.password.value == this.model.password){
      //   console.log("Login successful");
      //   //this.authService.authLogin(this.model);
      //   this.message = "Login successful";
      //   // this.router.navigateByUrl(this.returnUrl)
      //   console.log(this.f.email.value + this.f.email.password )
      //
      //   // localStorage.setItem('isLoggedIn', "true");
      //   // localStorage.setItem('token', this.f.email.value);
      // }
      // else{
      //   this.message = "Please check your userid and password";
      // }}
      //
    



  private initForm() {
    let email = '';
    let password = '';

    this.authForm = new FormGroup({
      'email': new FormControl('',Validators.required),
      'password' : new FormControl('',Validators.required)
    })
  }

}
