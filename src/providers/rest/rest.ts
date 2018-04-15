import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from '@firebase/util';
//import * as secret from './secretKey.json';
/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  restaurants: any = [];
  res: any
  url: string = 'https://api.github.com/users/wowbob396'
  constructor(public http: HttpClient) {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*')
    this.res = http.get(this.url)
    this.res.subscribe(data => {
      console.log(data)
    })
    console.log(this.res);
  }

}
