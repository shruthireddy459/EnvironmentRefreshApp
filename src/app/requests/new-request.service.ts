import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RefreshRequest } from './refresh-request'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class NewRequestService {
constructor(
    private http: Http
  ) { }

  addRequest(model: RefreshRequest) {
    // console.log(model);
    return this.http.post('/api/refreshrequest/', model)
      .toPromise()
      .then(response => response)
  }
}
