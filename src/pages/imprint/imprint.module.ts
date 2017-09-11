import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImprintPage } from './imprint';

@NgModule({
  declarations: [
    ImprintPage,
  ],
  imports: [
    IonicPageModule.forChild(ImprintPage),
  ],
  exports: [
    ImprintPage
  ]
})
export class ImprintPageModule {}
