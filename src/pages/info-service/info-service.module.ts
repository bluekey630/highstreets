import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoServicePage } from './info-service';

@NgModule({
  declarations: [
    InfoServicePage,
  ],
  imports: [
    IonicPageModule.forChild(InfoServicePage),
  ],
  exports: [
    InfoServicePage
  ]
})
export class InfoServicePageModule {}
