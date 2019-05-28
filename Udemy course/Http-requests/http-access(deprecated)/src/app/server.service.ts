import { Injectable } from '@angular/core';
// noinspection JSDeprecatedSymbols
import {Http} from '@angular/http';

@Injectable(
)
// {  // providedIn: 'root'
// }
export class ServerService {

  constructor(private http: Http) { }

  servers = [];


  storeService(services: any[]) {
    return this.http.post('https://angualr-http-test.firebaseio.com/data.json', services);
  }

}
