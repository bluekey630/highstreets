import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ImgViewComponent } from './img-view';

@NgModule({
  declarations: [
    ImgViewComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    ImgViewComponent
  ]
})
export class ImgViewComponentModule {}
