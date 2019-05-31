import {Injectable} from '@angular/core';
import {HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoggingInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler)
  {
    return next.handle(req).pipe(
      tap(
      event => {
        if (event.type === HttpEventType.Response){
          console.log('Logging response event');
          console.log(event.body);
        }
      }
    ));
  }
}
