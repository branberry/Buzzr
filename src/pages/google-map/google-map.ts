import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
import * as firebase from 'firebase';
/**
 * Generated class for the GoogleMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 declare var google: any; 
 let map: any;
 let infoWindow: any;
 let options = {
   enableHighAccuracy: true,
   timeout: 5000,
   maximumAge: 0,
 };

@IonicPage()
@Component({
  selector: 'page-google-map',
  templateUrl: 'google-map.html',
})
export class GoogleMapPage {
  
  // identifying the map div
  @ViewChild('map') mapElement: ElementRef;

  // map markers array 
  markers = [];

  // creates a reference in the firebase database
  ref: any = firebase.database().ref('geolocations/');

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public platform: Platform,
    public geolocation: Geolocation,
    public device: Device) {

    this.platform.ready().then(() => { 
      this.initMap();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoogleMapPage');
  }

  /**
   * Creating the instance of a google map in the app
   */
  initMap() {
    let myLocation: any;
    // making a geolocation call to retrieve the latitude and longitude
    this.geolocation.getCurrentPosition().then((resp) => {
      myLocation = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);


      // generating the map using the google maps api
      map = new google.maps.Map(this.mapElement.nativeElement, {
      center: myLocation,
      zoom: 15,
      });

      let request = {
        location: {lat: resp.coords.latitude, lng: resp.coords.longitude},
        radius: '2000',
        type: ['store']
      };
  
      // generating the request that we will use as an argument for the search
  
      
      //instantiating the infowindow
      infoWindow = new google.maps.InfoWindow();
  
      // creating the search service using our map
      let service = new google.maps.places.PlacesService(map);
  
      // calling the services using the request and the callback method to load the markers
      service.nearbySearch(request,this.loadMarkers)
    });
  }

  /**
   * This method is the callback function that will load the markers onto the map from the 
   * PlaceService request.
   * 
   * @param results the results array that is returned from google maps
   */
  loadMarkers(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        let place = results[i];
          // identifying the coordinates of the location
        let placeLoc = place.geometry.Location;
          // instantiating a marker for the location
        let marker = new google.maps.Marker({
          map: map,
          position: placeLoc
        });

        // allows the marker to be populated with information when clicked
        google.maps.event.addListener(marker, 'click', () => {
          infoWindow.setContent(place.name);
          infoWindow.open(map,this);
        });
      }
    }
  }

  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];

  }

  setMapOnAll(map) {
    for(let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  clearMarkers() {
    // sets all the marker array to null; clearing all markers from the map
    this.setMapOnAll(null);
  }

  /**
   * updates/add gelocation data to the firebase database
   * @param uuid 
   * @param lat 
   * @param lng 
   */
  updateGeolocation(uuid, lat,lng) {
    if(localStorage.getItem('mykey')) {
      firebase.database().ref('geolocations/' + localStorage.getItem('mykey')).set({
        uuid: uuid,
        latitude: lat,
        longitude: lng
      });
    }
  }
}

/**
 * this method takes a snapshot of device position information and saves it into an array
 * @param snapshot the device information
 */
export const snapshotToArray = snapshot => {
  let snapshotArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    snapshotArr.push(item);
  });

  return snapshotArr
}



/**
 * 
 * 
 * CODE GRAVEYARD
 * 
 *     this.geolocation.getCurrentPosition(options).then(resp => {
      let myLocation = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 15,
        center: myLocation
      });
    });
    /**
     * This method creates the generic markers for each location loaded into the map
     * @param place 
     /
    function createMarker(place) {
      let placeLoc = place.geometry.location;
      let marker = new google.maps.Marker({
        map: this.map,
        position: place.geometry.location,
      });

      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.setContent(place.name);
        infoWindow.open(this.map,this);
      });
    }

    let watch = this.geolocation.watchPosition();
    watch.subscribe(data => {
      this.deleteMarkers();

      // update firebase database
      this.updateGeolocation(this.device.uuid,data.coords.latitude,data.coords.longitude);

      let updateLocation = new google.maps.LatLng(data.coords.latitude,data.coords.longitude);

      // creating a new instance of a window to hold a place from google maps
      infoWindow = new google.maps.InfoWindow();

      // creating the service provider object
      let service = new google.maps.places.PlacesService(this.map);

      // defining the search area
      let requestBounds = {
        location: updateLocation,
        radius: 1000,
        type: ['restaurant']
      }
      // running the service
      service.nearbySearch(requestBounds, callback);
      
      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for(let i = 0; i < results.length; i++) {
            let place = results[i];
            createMarker(place);
          }
        }
      }
    });
 */