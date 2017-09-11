import { Component, Input } from '@angular/core';

@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBarComponent {

  _progress: any;
  
  @Input()
  set progress(val: any) {
    this._progress = val;    
  }

  get progress() {
    return this._progress;
  }

  constructor() {
    
  }  
}
