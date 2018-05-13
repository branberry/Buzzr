import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-buzzer',
  templateUrl: 'buzzer.html',
})
export class BuzzerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {

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
