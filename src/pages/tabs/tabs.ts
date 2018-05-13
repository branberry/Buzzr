import { Component } from '@angular/core';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavController} from 'ionic-angular';
import { RestaurantListPage } from '../restaurant-list/restaurant-list';
import { GoogleMapPage } from '../google-map/google-map';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = RestaurantListPage;
  tab2Root = GoogleMapPage;
  tab3Root = ContactPage;

  title: String;
  titles = ["Restaurants", "Map","Contact"];

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
