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

@IonicPage()
@Component({
  selector: 'page-google-map',
  templateUrl: 'google-map.html',
})
export class GoogleMapPage {
  @ViewChild('map') mapElement: ElementRef;
  markers = [];
  map: any;
  // creates a reference in the firebase database
  ref = firebase.database().ref('geolocations/');

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public platform: Platform,
    public geolocation: Geolocation,
    public device: Device) {

    this.platform.ready().then(() => { 
      this.initMap();
    });

    this.ref.on('value', resp =>{
      this.deleteMarkers();

      snapshotToArray(resp).forEach(data => {
        if(data.uuid !== this.device.uuid) {
          let image = 'assets/imgs/marker.png';
          let updatelocation = new google.maps.LatLng(data.latitude,data.longitude);
          this.addMarker(updatelocation,image);
          this.setMapOnAll(this.map);
        } else {
          let image = 'assets/imgs/marker.png';
          let updatelocation = new google.maps.LatLng(data.latitude,data.longitude);
          this.addMarker(updatelocation,image);
          this.setMapOnAll(this.map);
        }    
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoogleMapPage');
  }

  initMap() {
    this.geolocation.getCurrentPosition({maximumAge: 3000, timeout: 5000, enableHighAccuracy: true}).then(resp => {
      let myLocation = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 15,
        center: myLocation
      });
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe(data => {
      this.deleteMarkers();

      // update firebase database
      this.updateGeolocation(this.device.uuid,data.coords.latitude,data.coords.longitude);

      let updateLocation = new google.maps.LatLng(data.coords.latitude,data.coords.longitude);
      let image = 'assets/imgs/marker.png';
      this.addMarker(updateLocation,image);
      this.setMapOnAll(this.map);
    });
  }

  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];

  }

  addMarker(location, image) {
    let marker =  new google.maps.Marker({
      position: location,
      maps: this.map,
      icon: image,
    });
    this.markers.push(marker);
  }

  setMapOnAll(map) {
    for(let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  clearMarkers() {
    // sets all the marker array to null
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