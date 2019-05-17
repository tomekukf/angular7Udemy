import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    // We will have access only to this comoponent which we defined in appmoduleRoutes
    this.user = {
      id: this.activeRoute.snapshot.params['id'],
      name: this.activeRoute.snapshot.params['name']
    };


    // If we are 100% that our component wont change we can use snapschot options
    // We are using subscribe when we are not sure if our component wont change during being on this component site


    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
    );
  }



}
