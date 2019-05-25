import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,

              private activeRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activeRoute.data.subscribe(
      (data: Data ) => {
        this.server = data['server'];
      }
    );



    this.server = this.serversService.getServer(+this.activeRoute.snapshot.params['id']);
    // this.server = this.serversService.getServer(1);
    this.activeRoute.params.subscribe(
      (param: Params) => { this.server = this.serversService.getServer(+param['id']);
      }
    );
  }

  OnEditMethod() {
  this.router.navigate(['edit'], { relativeTo: this.activeRoute, queryParamsHandling: 'preserve'});

    // this.router.navigate(['/users'], {relativeTo : this.activeRoute});

  }
}

