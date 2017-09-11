import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalData } from '../../utils/global-data';


@Injectable()
export class CityProvider {

  constructor(public http: Http) {
    
  }

  getCities() {
    let url = "http://highstreets.de/service/index.php?class=highstreets_APP_Class&function=getCityList&sortby=alpha&countrycode=" + GlobalData.cur_country + "&no_cache=1";
    return new Promise(resolve => {
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    })
  }

}
