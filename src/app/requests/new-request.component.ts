import { Component, OnInit, Input } from '@angular/core';
import { inject } from '@angular/core/testing';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { RefreshRequest, DatabaseLog, LogEntry } from './refresh-request';
import { NewRequestService } from './new-request.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-newrequest',
  templateUrl: './new-request.component.html',
  providers: [NewRequestService],
})
export class NewRequestComponent implements OnInit {
 refreshRequest: RefreshRequest = <RefreshRequest>{};
  databaseLog: DatabaseLog = <DatabaseLog>{};

  // TODO: These are Temp Lookups but in real time I will take all the lookups from the web api services
  tempLookupEnvironments = [
    { label: 'MAIN', value: 'MAIN' },
    { label: 'QA', value: 'QA' },
    { label: 'TEST', value: 'TEST' },
  ];

  tempLookupDatabases = [
    { label: 'Orders', value: 'Orders' },
    { label: 'Customers', value: 'Customers' },
    { label: 'Orders,Customers', value: 'Orders,Customers' }
  ];

  tempLookupStatus = [
    { label: 'Preparing', value: 'Preparing' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Restoring', value: 'Restoring' },
    { label: 'PostRefresh', value: 'PostRefresh' }
  ];

  tempLookupRequestUsers = [
    { label: 'Domain/User1', value: 'User1' },
    { label: 'Domain/User2', value: 'User2' }
  ];
  // End of temp lookups

  constructor(private newRequestService: NewRequestService, private router: Router) { }

  ngOnInit() {
  }

  backToResults() {
    this.router.navigate(['/requests']);
  }

  saveRequest() {
    if (this.refreshRequest.environment != ''
      && this.refreshRequest.status != ''
      && this.refreshRequest.requestor != ''
      && this.refreshRequest.scheduleDate != null
      && this.databaseLog.databaseName != ''
      && this.refreshRequest.completionDate != null) {
      console.log('Save request started...');
      this.refreshRequest.databases = []; // Currently working with single database object
      this.refreshRequest.databases.push(this.databaseLog);
      this.newRequestService.addRequest(this.refreshRequest).then(
        (success) => {
          if (success.status === 200) {
            alert('Record added successfully');
            this.router.navigate(['/requests']);
          } else {
            alert('Error Occured: Some thing went wrong');
          }
        }).catch(
        (error) => {
          console.log(error);
          alert('Error Occured: Some thing went wrong');
        })
    }
    else {
      alert('Please enter all required fileds');
    }
  }

}
