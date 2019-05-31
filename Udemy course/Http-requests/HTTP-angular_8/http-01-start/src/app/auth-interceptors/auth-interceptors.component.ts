import { Component, OnInit } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-auth-interceptors',
  templateUrl: './auth-interceptors.component.html',
  styleUrls: ['./auth-interceptors.component.css']
})
export class AuthInterceptorsComponent implements OnInit, HttpInterceptor {

  constructor() { }

  ngOnInit() {
  }
  // via this method we intercept request just before it will leave
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('intercepted');
    // we can control wich request we want to inrecept by comapring url ob reaquest boject
    if(req.url === 'https://angualr-http-test.firebaseio.com/post/post.json') {
      console.log('intercepted method with https://angualr-http-test.firebaseio.com/post/post.json url');
    }
    const modifiedRequest = req.clone({headers: req.headers.append('Auth-token', 'tomek-token')})


    // we need to return request via next method to let him continue its journey to real desitination.
    // return next.handle(req);
    return next.handle(modifiedRequest);
  }

}
