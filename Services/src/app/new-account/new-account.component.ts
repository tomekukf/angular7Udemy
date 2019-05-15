import { Component, EventEmitter, Output } from '@angular/core';
import {LoggingService} from '../services/loggin.service';
import {AccountService} from '../services/accounts.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: [LoggingService]
})
export class NewAccountComponent {
  @Output() accountAdded = new EventEmitter<{name: string, status: string}>();


  constructor(private loggingService: LoggingService
  , private accountService: AccountService) {

  }

    onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.addAccount(accountName, accountStatus );
    // this.accountAdded.emit({
    //   name: accountName,
    //   status: accountStatus
    // });
    this.loggingService.logStatusChanged(accountStatus);

    // console.log('A server status changed, new status: ' + accountStatus);
  }
}
