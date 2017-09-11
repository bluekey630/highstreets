import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TransformProvider {
  public item: any;
  public flag: any;
  constructor(public http: Http) {
    
  }

  public get() {
    return {data: this.item, flag: this.flag};
  }

  public set(item, flag) {
    this.item = item;
    this.flag = flag;
  }
}
