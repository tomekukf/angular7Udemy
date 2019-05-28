import { Injectable } from '@angular/core';
// noinspection JSDeprecatedSymbols
import {Http, Headers, Response} from '@angular/http';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable(
)
// {  // providedIn: 'root'
// }
export class ServerService {

  constructor(private http: Http) {
  }

  servers = [];


  storeService(services: any[]) {
    // noinspection JSDeprecatedSymbols
    const headers = new Headers({
      'Contenet-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'

    });

    return this.http.put('https://angualr-http-test.firebaseio.com/data.json', services, {headers: headers});
  }

  getDataFromServer() {
    return this.http.get('https://angualr-http-test.firebaseio.com/tomek.json').pipe(
      map(
        (response: Response) => {
          const data = response.json();
          console.log(data);

          return data;
        }
      )
    );

  }


  getServers() {
    const headers = new Headers({
      'Contenet-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'

    });
    return this.http.get('https://angualr-http-test.firebaseio.com/data', {headers: headers}).pipe(
      map(
        (response: Response) => {
          const data = response.json();
          for (const i of data) {
            i.name = 'tomek ' + i.name;
          }
          return data;
        }
      ), catchError(
        (error => {
          return throwError('somethin went wrong');
        })
      )
    );


  }
}
