import { Http ,Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable'

/*
  Generated class for the RemoteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RemoteServiceProvider {
  getApiUrl: string = "https://jsonplaceholder.typicode.com/posts";
  constructor(public http: Http) {
    console.log('Hello RemoteServiceProvider Provider');
  }

  /**
   * This method uses the specified url and retrieves the data in JSON format
   */
  getPosts() {
    return this.http.get(this.getApiUrl)
    .do((res: Response) => console.log(res.json()))
    .map((res: Response ) => res.json())
    .catch((error: any) => {
      return Observable.throw(error);
    });
  }
}
