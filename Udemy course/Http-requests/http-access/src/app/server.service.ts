import { Injectable } from '@angular/core';
// noinspection JSDeprecatedSymbols
import {Http,Headers} from '@angular/http';

@Injectable(
)
// {  // providedIn: 'root'
// }
export class ServerService {

  constructor(private http: Http) { }

  servers = [];



  storeService(services: any[]) {
    // noinspection JSDeprecatedSymbols
    const headers = new Headers({
      'Contenet-Type':'application/json'
    });

    return this.http.post('https://angualr-http-test.firebaseio.com/data.json', services,{headers: headers});
  }


  getServers(){
    return this.http.get('https://angualr-http-test.firebaseio.com/data.json',null);
  }

}
