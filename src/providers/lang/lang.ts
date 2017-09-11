import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalData } from '../../utils/global-data';


@Injectable()
export class LangProvider {

  constructor(public http: Http) {
    
  }

  getAllLangText() {

    let url = '';
    console.log("LANG: ", GlobalData.device_lang);
    console.log("LANG: ", GlobalData.device_lang.substring(0,2));
    if (GlobalData.device_lang.substring(0,2)=='de') {
      url = "./assets/lang/lang-de.xml";      
    }
    else  { //if (GlobalData.device_lang.includes('en'))
      url = "./assets/lang/lang-en.xml";     
    }
        
    return new Promise(resolve => {
      this.http.get(url)
        .map(res => res.text())
        .subscribe(data => {
          resolve(data);
        });
    })
  }

}
