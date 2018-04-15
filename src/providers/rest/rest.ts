import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from '@firebase/util';
import * as secret from './secretKey.json';
/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  restaurants: any = [];
  res: any
  constructor(public http: HttpClient) {
    this.res = http.get('https://api.yelp.com/v3/autocomplete?text=del&latitude=37.786882&longitude=-122.399972')
    this.res.subscribe(data => {
      console.log(data)
    })
    console.log(this.res);
  }

}
