import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RestaurantListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-restaurant-list',
  templateUrl: 'restaurant-list.html',
})
export class RestaurantListPage {
  items = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    for(let i = 0; i < 100; i++) {

      
      this.items.push(i);
    }
    
    
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      for(let i = 0; i < 10; i++) {

      
        this.items.push(i);
      }
        console.log('Async operation has ended');
        infiniteScroll.complete();
      }, 500);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantListPage');
  }

}
