import { Component } from '@angular/core';
import {ServerService} from './server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private serverService: ServerService) {}
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
}
