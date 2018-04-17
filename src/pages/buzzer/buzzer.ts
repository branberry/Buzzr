import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";


@IonicPage()
@Component({
  selector: 'page-buzzer',
  templateUrl: 'buzzer.html',
})
export class BuzzerPage {

  constructor(private afauth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {

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

  }
}
