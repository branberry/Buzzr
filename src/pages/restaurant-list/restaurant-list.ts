import { Component, ElementRef, ViewChild } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  NavParams, 
  ActionSheetController, 
  AlertController, 
  MenuController
 } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service'; 
import { GoogleMapPage } from '../google-map/google-map';
/**
 * Generated class for the RestaurantListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google: any; 

@IonicPage()
@Component({
  selector: 'page-restaurant-list',
  templateUrl: 'restaurant-list.html',
})
export class RestaurantListPage {
  // this identifies the html tag that has the id 'list'
  @ViewChild('list') listElement: ElementRef;

  items: any  = [];
  postList: any = [];
  lat: any;
  lng: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public actionSheetCtrl: ActionSheetController, 
    public alertCtrl: AlertController,
    public geo: Geolocation,
    public menuCtrl: MenuController,
    private remoteService: RemoteServiceProvider,
    ) {
    // calling this method to retrieve all of the local restaruants
    this.getRestaurants();

    // calling the getPosts method to fill postList array with post information
    this.getPosts();

    // retrieving the place photo url
    this.getPlacePhoto(1);

    // pushing arbitrary values into an array to display for the list
    for(let i = 0; i < 10; i++) {      
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
    
    this.menuCtrl.open();
    console.log("Page loaded");
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

  /**
   * Retrieves post from the remote service provider and fills the postList array
   */
  getPosts() {
    this.remoteService.getPosts().subscribe((data) => {
      this.postList = data;
    });
  }

  getPlacePhoto(placeId) {
    this.remoteService.getPlacePhoto(placeId).subscribe((data) => {
      console.log(data);
    });
  }
  
  /**
   * Retrieves the restaurants within a given radius
   * 
   */
  getRestaurants() {
    this.geo.getCurrentPosition().then(resp => {
    // generating the request that we will use as an argument for the search
    console.log(resp.coords.latitude)
    let request = {
      location: {lat: resp.coords.latitude, lng: resp.coords.longitude},
      radius: '2000',
      type: ['restaurant']
      };

    // the function that will be used for the callback function for the nearby search
    function callback(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for(let i = 0; i < results.length; i++) {
          let place = results[i];
          console.log(results[i]);
        }
      }
    }
      let service = new google.maps.places.PlacesService(this.listElement.nativeElement);
      service.nearbySearch(request,callback);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantListPage');
  }

}
