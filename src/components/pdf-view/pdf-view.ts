import { Component, Input } from '@angular/core';

@Component({
  selector: 'pdf-view',
  templateUrl: 'pdf-view.html'
})
export class PdfViewComponent {

  _link: any;
  public scale: any;
  public rotate: any;
  
  @Input()
  set link(val: any) {
    this._link = val;    
  }

  get link() {
    return this._link;
  }

  constructor() {    
    this.scale = 1.0;
    this.rotate = 0;
    
  }

  callBackFn(pdf: PDFDocumentProxy) {
      console.log("LOADED PDF!!!!");
      let body = document.getElementById('pdf-view');
      let plus_button = document.getElementById('plus');
      let minus_button = document.getElementById('minus');
      let rotate_r = document.getElementById('rotate-r');
      let rotate_l = document.getElementById('rotate-l');
      let spiner = document.getElementById('spiner');
      if( body != null && body.classList != null )
      {
        body.style.display='block';        
        plus_button.style.display='block';        
        minus_button.style.display='block';
        rotate_r.style.display='block';        
        rotate_l.style.display='block';
        spiner.style.display='none';
      }
  }

  plusButtonClicked() {
    if ( this.scale > 0.25 ) {
      this.scale = this.scale * 0.8;
    }    
  }

  minusButtonClicked() {
    if (this.scale < 2 ) {
      this.scale = this.scale / 0.8;
    }    
  }

  rotateRClicked() {
    this.rotate += 90;
    if (this.rotate >= 360) {
      this.rotate = 0;
    }
  }

  rotateLClicked() {
    if (this.rotate == 0) {
      this.rotate = 270;
    }
    else if (this.rotate == 270) {
      this.rotate = 180;
    }
    else if (this.rotate == 180) {
      this.rotate = 90;
    }
    else if (this.rotate == 90) {
      this.rotate = 0;
    }
  }
}
