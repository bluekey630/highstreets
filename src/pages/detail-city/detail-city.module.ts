import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailCityPage } from './detail-city';
import { PdfViewComponentModule } from '../../components/pdf-view/pdf-view.module';
import { ImgViewComponentModule } from '../../components/img-view/img-view.module';

@NgModule({
  declarations: [
    DetailCityPage,    
  ],
  imports: [
    IonicPageModule.forChild(DetailCityPage),
    ImgViewComponentModule,
    PdfViewComponentModule
  ],
  exports: [
    DetailCityPage
  ]
})
export class DetailCityPageModule {}
