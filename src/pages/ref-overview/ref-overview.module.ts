import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RefOverviewPage } from './ref-overview';

@NgModule({
  declarations: [
    RefOverviewPage,
  ],
  imports: [
    IonicPageModule.forChild(RefOverviewPage),
  ],
  exports: [
    RefOverviewPage
  ]
})
export class RefOverviewPageModule {}
