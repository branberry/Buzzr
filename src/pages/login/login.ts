import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
<<<<<<< HEAD
import { User } from '../../models/user';
import { AngularFireAuth } from "angularfire2/auth";
import { BuzzerPage } from '../buzzer/buzzer';

=======
import { RegisterPage } from '../register/register';
import { User } from '../../models/user';
>>>>>>> 0d8d3c70a6d748d8d0452419d41ac48c30aed18d
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;
<<<<<<< HEAD
 
  constructor(private afAuth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
=======
  constructor(public navCtrl: NavController, public navParams: NavParams) {
>>>>>>> 0d8d3c70a6d748d8d0452419d41ac48c30aed18d
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
<<<<<<< HEAD
  async login(user: User) {
    try {
      const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result){
        this.navCtrl.setRoot(BuzzerPage);
      }
    } catch (e) {
      console.error(e);
    }
=======

  signInUser() {
  }

  register() {
    this.navCtrl.push(RegisterPage);
>>>>>>> 0d8d3c70a6d748d8d0452419d41ac48c30aed18d
  }

}
