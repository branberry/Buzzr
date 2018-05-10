import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SECRETS } from './secrets.config';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { BuzzerPage } from '../pages/buzzer/buzzer';
import { RegisterPage } from '../pages/register/register';
import { RestaurantListPage } from '../pages/restaurant-list/restaurant-list';
import { Facebook } from '@ionic-native/facebook';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { GoogleMapPage } from '../pages/google-map/google-map';
import { RemoteServiceProvider } from '../providers/remote-service/remote-service';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    BuzzerPage,
    RegisterPage,
    RestaurantListPage,
    GoogleMapPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),

    AngularFireDatabaseModule,
    HttpClientModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    BuzzerPage,
    RegisterPage,
    RestaurantListPage,
    GoogleMapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    Facebook,
    HttpClient,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Device,
    RemoteServiceProvider,

  ]
})
export class AppModule {}
