import { Component, Input } from '@angular/core';

@Component({
  selector: 'img-view',
  templateUrl: 'img-view.html'
})
export class ImgViewComponent {

  _link: any;
  public width: any;
  public width_str: any;
  @Input()
  set link(val: any) {
    this._link = val;    
  }

  get link() {
    return this._link;
  }

  constructor() {
    this.width = 100; 
    this.width_str = this.width + "%";   
  } 

  plusButtonClicked() {
    this.width += 50;
    if (this.width >= 1000) {
      this.width = 1000;
    }   
    this.width_str = this.width + "%";
    console.log(this.width_str);
  }

  minusButtonClicked() {
    this.width -= 50;
    if (this.width <= 50) {
      this.width = 50;
    }   
    this.width_str = this.width + "%";
  }
}
