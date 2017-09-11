import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {  HttpModule, JsonpModule } from '@angular/http';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { CityProvider } from '../providers/city/city';
import { EmailComposer } from '@ionic-native/email-composer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { TransformProvider } from '../providers/transform/transform';
import { LangProvider } from '../providers/lang/lang';
import { Globalization } from '@ionic-native/globalization';
import { ScreenOrientation } from '@ionic-native/screen-orientation';


@NgModule({
  declarations: [
    MyApp,
       
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,    
    IonicModule.forRoot(MyApp , {
      backButtonText: '',
      iconMode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'ios-transition'
    }),
    IonicStorageModule.forRoot()    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CityProvider,    
    EmailComposer,
    InAppBrowser,    
    TransformProvider,    
    LangProvider,    
    ScreenOrientation,
    Globalization
  ]
})
export class AppModule {}
