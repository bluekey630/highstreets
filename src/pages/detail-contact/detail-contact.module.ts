import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailContactPage } from './detail-contact';

@NgModule({
  declarations: [
    DetailContactPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailContactPage),
  ],
  exports: [
    DetailContactPage
  ]
})
export class DetailContactPageModule {}
