import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
   servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService,
private router: Router,
  private activeRoute: ActivatedRoute) { }

  ngOnInit() {

    this.servers = this.serversService.getServers();
    // this.servers = this.activeRoute
  }


  // relativePath
  // loadUsers() {
  //   this.router.navigate(['users'], {relativeTo : this.activeRoute});
  // }

  // absolutePath
  loadUsers() {
    this.router.navigate(['/users'], {relativeTo : this.activeRoute});
  }

}
