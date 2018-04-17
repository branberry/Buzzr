import { Component } from '@angular/core';

/**
 * Generated class for the GoogleMapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'google-map',
  templateUrl: 'google-map.html'
})
export class GoogleMapComponent {

  text: string;

  constructor() {
    console.log('Hello GoogleMapComponent Component');
    this.text = 'Hello World';
  }

}
