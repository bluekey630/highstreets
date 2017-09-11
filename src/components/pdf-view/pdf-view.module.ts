import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PdfViewComponent } from './pdf-view';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    PdfViewComponent,
    PdfViewerComponent
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    PdfViewComponent
  ]
})
export class PdfViewComponentModule {}
