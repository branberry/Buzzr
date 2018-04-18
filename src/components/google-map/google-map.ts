import { Component, OnInit } from '@angular/core';

/**
 * Generated class for the GoogleMapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'google-map',
  templateUrl: 'google-map.html',
})
export class GoogleMapComponent implements OnInit {

  text: string;
  lat: number;
  lng: number;

  constructor() {
    console.log('Hello GoogleMapComponent Component');
    this.text = 'Hello World';
  }

  ngOnInit() {

  }

  private getUserLocation() {
    // locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( position =>{
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }
}
