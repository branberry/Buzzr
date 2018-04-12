import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController , ToastController} from 'ionic-angular';
import {AngularFireAuth  } from "angularfire2/auth";
/**
 * Generated class for the BuzzerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buzzer',
  templateUrl: 'buzzer.html',
})
export class BuzzerPage {

  constructor(private afauth: AngularFireAuth, private toast: ToastController,public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  popThis() {
    this.navCtrl.pop();
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Checked in',
      subTitle: 'The resturaunt has seen your request, you are checked in!',
      buttons: ['OK']
    });

    alert.present();
  }

  ionViewDidLoad() {
    this.afauth.authState.subscribe(data=> {
      if(data && data.email && data.uid){
        this.toast.create({
          message: 'Welcome to BuzzerApp, ${data.email}',
          duration: 3000
        }).present();
      }else{
        this.toast.create({
          message: 'Sorry, could not find authentication details.',
          duration: 3000
        }).present();
      }
    })
  }

}
