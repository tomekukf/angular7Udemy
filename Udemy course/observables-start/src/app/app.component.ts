import {Component, OnInit} from '@angular/core';
import {UsersService} from "./user/users.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements  OnInit{

  constructor(private userService: UsersService) {

  }

  user1Active: boolean= false;

  ngOnInit(){
    this.userService.subject.subscribe(
      (data: number) => {
        if(data===1){
        this.user1Active=true
        }else{
          this.user1Active=false
        }
      }
    )

  }





}
