import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RefDetailPage } from './ref-detail';

@NgModule({
  declarations: [
    RefDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(RefDetailPage)
  ],
  exports: [
    RefDetailPage
  ]
})
export class RefDetailPageModule {}
