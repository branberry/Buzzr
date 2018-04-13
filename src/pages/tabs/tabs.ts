import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { BuzzerPage } from '../buzzer/buzzer';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavController} from 'ionic-angular';
import * as firebase from 'firebase/app';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = BuzzerPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  title: String;
  titles = ["Buzzer","About","Contact"];

  constructor(private afauth: AngularFireAuth,public navCtrl: NavController) {
    this.title = this.titles[0];
  }

  signout(){
    this.afauth.auth.signOut();
    this.navCtrl.setRoot(HomePage);
  }

  tabChanged(tab){
    this.title = this.titles[tab];
  }
  
}
