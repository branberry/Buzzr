import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuzzerPage } from './buzzer';

@NgModule({
  declarations: [
    BuzzerPage,
  ],
  imports: [
    IonicPageModule.forChild(BuzzerPage),
  ],
})
export class BuzzerPageModule {}
