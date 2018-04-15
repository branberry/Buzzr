import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Geolocation } from '@ionic-native/geolocation';
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
  lat: any;
  lng: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public actionSheetCtrl: ActionSheetController, 
    public alertCtrl: AlertController,
    public geo: Geolocation,
    public rest: RestProvider
    ) {

    // pushing arbitrary values into an array to display for the list
    for(let i = 0; i < 100; i++) {      
      this.items.push(this.items.length);
    }   
  }

  /**
   * This method takes in as an argument an event so that it may continue to load more information
   * @param infiniteScroll the scroll event that is passed in from the html
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
   * @param restaurantNum the value of the restaurant (placeholder param)
   */
  viewRestaurant(restaurantNum: number) {
    let actionSheet = this.actionSheetCtrl.create({
      // title of the individual restaurant
      title: 'Restaurant ' + restaurantNum.toString() + ' Information',
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

  /**
   * This function checks the user into the given restaurant
   * Prompts the user to input check in information
   * @param restaurantNum the value of the restaurant (placeholder param)
   */
  enqueue(restaurantNum: number) {
    let alert = this.alertCtrl.create({
      title: 'Check in',
      inputs: [
        {
          name: 'Party name',
          placeholder: 'e.g., Brandon\'s party',
        },
        {
          name: 'Number of seats',
          placeholder: 'enter number of guests',
        },
      ],
      buttons: [
        {
          text: 'Check in',
          handler: () => {
            console.log('User checked in');
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    this.geo.getCurrentPosition().then( pos => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
      console.log(this.lat);
      console.log(this.lng);
    }).catch(e => console.error(e));
    console.log('ionViewDidLoad RestaurantListPage');
  }

}
