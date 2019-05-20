import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';


  // We can fetch query param by using ActivatedRoute

  constructor(private serversService: ServersService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);



    // this.server = this.serversService.getServer( +this.route.snapshot.params['id']);
    // console.log(this.route.snapshot.params['id']);
    const id = this.route.params['id'];
    console.log(id);
    this.server = this.serversService.getServer(1);

    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }
// ngOnInit() {
//   this.server = this.serversService.getServer(+this.activeRoute.snapshot.params['id']);
//   // this.server = this.serversService.getServer(1);
//   this.activeRoute.params.subscribe(
//     (param: Params) => { this.server = this.serversService.getServer(+param['id']);
//     }
//   );
// }


  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
