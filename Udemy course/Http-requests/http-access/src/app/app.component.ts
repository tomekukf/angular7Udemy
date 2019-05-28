import { Component } from '@angular/core';
import {ServerService} from './server.service';
// noinspection JSDeprecatedSymbols
import {Response} from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private serverService: ServerService) {}
// We are receiving observable compoent from service but we are not subcribing to it to detch a data
//   we are usuing asyns pipe it html side and this pipe is susbrining to it and resoliving promise
  asyncData = this.serverService.getDataFromServer();


  servers = [
    {
      name: 'Testserver',
      capacity: 10,
      id: this.generateId()
    },
    {
      name: 'Liveserver',
      capacity: 100,
      id: this.generateId()
    }
  ];
  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this.generateId()
    });
  }




  private generateId() {
    return Math.round(Math.random() * 10000);
  }



  onSave() {
    this.serverService.storeService(this.servers).subscribe(
      (response) => console.log(response),
      (errors) => console.log(errors)
    );

  }


  onGet() {
    // noinspection JSDeprecatedSymbols
    this.serverService.getServers().subscribe(
      (data: any[]) => {
        this.servers = data;
        console.log(data);
      },
      (errors) => console.log(errors)
    );
  }
}
