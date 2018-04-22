import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';

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
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public platform: Platform,
    public geolocation: Geolocation,
  ) {
    this.platform.ready().then(() => { this.initMap() });
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
    this.setMapOnAll(null);
  }

}
