import {promise} from 'selenium-webdriver';

export class AuthService {

  logged = false;

  isAuthenticated() {
    const promise = new Promise (
      (resolve, reject) => {
        setTimeout(
          () => {
            resolve(this.logged);
          }, 200 );
          }
        );
    return promise;
      }

  login() {
    this.logged = true;
  }

  logout() {
    this.logged = false;
  }

}
