import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
<<<<<<< HEAD
=======

>>>>>>> 0d8d3c70a6d748d8d0452419d41ac48c30aed18d
import { User } from '../../models/user';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [AngularFireAuth]
})
export class RegisterPage {
  user = {} as User;
<<<<<<< HEAD
  constructor(private afauth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
=======

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
>>>>>>> 0d8d3c70a6d748d8d0452419d41ac48c30aed18d
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

<<<<<<< HEAD
  async register(user: User) {
    try {
      const result = await this.afauth.auth.createUserAndRetrieveDataWithEmailAndPassword(user.email, user.password);
      console.log(result);
    } catch (e) {
=======
  async registerUser(user: User) {
    try {
      const result = await this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(user.email,user.password);
      console.log(result);
    }
    catch (e) {
>>>>>>> 0d8d3c70a6d748d8d0452419d41ac48c30aed18d
      console.error(e);
    }
  }

}
