import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RootsitePage } from './rootsite';
import { SanitizerPipe } from '../../pipes/sanitizer/sanitizer';
import { PdfViewComponentModule } from '../../components/pdf-view/pdf-view.module';

@NgModule({
  declarations: [
    RootsitePage,    
    SanitizerPipe
  ],
  imports: [
    IonicPageModule.forChild(RootsitePage),
    PdfViewComponentModule
  ],
  exports: [
    RootsitePage
  ]
})
export class RootsitePageModule {}
