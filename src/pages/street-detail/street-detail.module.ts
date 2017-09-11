import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StreetDetailPage } from './street-detail';
import { ProgressBarComponentModule } from '../../components/progress-bar/progress-bar.module';
@NgModule({
  declarations: [
    StreetDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(StreetDetailPage),
    ProgressBarComponentModule
  ],
  exports: [
    StreetDetailPage
  ]
})
export class StreetDetailPageModule {}
