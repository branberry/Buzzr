import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BuzzerPage } from '../buzzer/buzzer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('username') uname;
  @ViewChild('password') password;

  constructor(public navCtrl: NavController) {

  }

  signIn() {
    console.log(this.uname.value, this.password.value);
  }

}
