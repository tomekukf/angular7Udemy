export class User {

  constructor(public email: string,
              public id : string,
              private _token: string,
              private _tokenExpDate : Date) {

  }
  get token (){

    if (!this._tokenExpDate || this._tokenExpDate < new Date()){
      return null;
    }
    return this._token
  }

}
