import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController) {

    // pushing arbitrary values into an array
    for(let i = 0; i < 100; i++) {      
      this.items.push(this.items.length);
    }
    
    
  }

  /**
   * This method takes in as an argument an event so that it may continue to load more information
   * @param infiniteScroll 
   */
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    // this function creates a delay when the event is called so that the items may be loaded before being rendered
    setTimeout(() => {
      // loading additional fictious elements
      for(let i = 0; i < 10; i++) {
        this.items.push(this.items.length);
      }
        console.log('Async operation has ended');
        // terminates the loading sequence and allows for the next event to be read in
        infiniteScroll.complete();
      }, 500);
  }

  /**
   * This function is called when the user opens the page
   */
  viewRestaurant() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Restaurant Information',
      buttons: [
        {
          text: 'Restaurant Queue',
          handler: () => {
            console.log('Displaying Queue');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
    console.log("Page loaded")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantListPage');
  }

}
