import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { BuzzerPage } from '../buzzer/buzzer';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';
import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';

import * as firebase from 'firebase/app';
import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user = {} as User;
  loader: any;

  constructor(private afauth: AngularFireAuth, private fb: Facebook, private platform: Platform, public navCtrl: NavController, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  
  }
  
  async login(user: User) {
    try {
      this.presentLoading();
      const result = this.afauth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result){
        this.navCtrl.setRoot(TabsPage);
        this.loader.dismiss();
      }
    } catch (e) {
      console.error(e);
      this.loader.dismiss();
    }
  }

  signInWithFacebook() {
    this.presentLoading();
    if (this.platform.is('cordova')) {
      return this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        this.loader.dismiss();
        this.navCtrl.setRoot(TabsPage);
        return firebase.auth().signInWithCredential(facebookCredential);

      })
    }else {
      this.afauth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then((res) => {
          this.navCtrl.setRoot(TabsPage);
          this.loader.dismiss();
        });
    }
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Logging In...",
    });
    this.loader.present();
  }
}
