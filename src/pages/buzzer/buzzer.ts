import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
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
    console.log('ionViewDidLoad BuzzerPage');
  }

}
