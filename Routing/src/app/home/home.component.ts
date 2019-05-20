import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
              private activeRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  loadServers() {
  this.router.navigate(['/servers']);
  }


  loadMax() {

  }

  loadServer(id: number) {
    this.router.navigate(['/servers', id , 'edit' ], { queryParams: { alowEdit: 1 }, fragment : 'loading'});
  }
}
