import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoCityPage } from './info-city';

@NgModule({
  declarations: [
    InfoCityPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoCityPage),
  ],
  exports: [
    InfoCityPage
  ]
})
export class InfoCityPageModule {}
