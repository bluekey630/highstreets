import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReferencesPage } from './references';

@NgModule({
  declarations: [
    ReferencesPage,
  ],
  imports: [
    IonicPageModule.forChild(ReferencesPage),
  ],
  exports: [
    ReferencesPage
  ]
})
export class ReferencesPageModule {}
