import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapPage } from './map';
import { PdfViewComponentModule } from '../../components/pdf-view/pdf-view.module';
import { ImgViewComponentModule } from '../../components/img-view/img-view.module';

@NgModule({
  declarations: [
    MapPage,    
  ],
  imports: [
    IonicPageModule.forChild(MapPage),  
    ImgViewComponentModule, 
    PdfViewComponentModule 
  ],
  exports: [
    MapPage
  ]
})
export class MapPageModule {}
