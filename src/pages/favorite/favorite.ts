import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { Platform } from 'ionic-angular';
import { LangProvider } from '../../providers/lang/lang';
import xml2js from 'xml2js';
import { GlobalData } from '../../utils/global-data';

declare var window;
@IonicPage()
@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class FavoritePage {
  
  public favCities: any[];  
  
  constructor(public navCtrl: NavController,
    private langService: LangProvider, 
    private plt:Platform,
    private emailComposer: EmailComposer,    
    public navParams: NavParams) {
    this.getAllLangText();    
  }

  ionViewDidLoad() {
    
  }

  ionViewWillEnter() {

    const that = this;
    setTimeout( function() {
      that.getFavCities();
    }, 500 );  
    
  }

  getAllLangText() {
    if (GlobalData.lang_data.length > 0) {
      return;
    }
    this.langService.getAllLangText().then(res => {      
      this.parseXML(res)
         .then((data)=>
         {           
           GlobalData.lang_data = data['label'];                    
         });
    })    
  }

  getLangText(index) {
    if (GlobalData.lang_data.length <= 0) {
      return 'None';
    }
    let text = "";
    for (let i = 0; i < GlobalData.lang_data.length; i++ ) {
      if (GlobalData.lang_data[i].$.index == index) {
        text = GlobalData.lang_data[i]._;
        break;
      }
    }
    
    if (text == "") {
      text = "None";
    }
    return text;       
  }

  parseXML(data)
  {
    return new Promise(resolve =>
    {
      let parser = new xml2js.Parser(
          {
            trim: true,
            explicitArray: true
          });
        parser.parseString(data, function (err, result)
        {
          resolve(result.lang);
        });
    });
  }

  getFavCities() {
    this.favCities = [];
    if (GlobalData.cities.length > 0) {
      this.favCities = [];
      for (let i = 0; i<GlobalData.cities.length; i++) {
        if (GlobalData.cities[i]["parent_id"] == "0") {

          let favCity = window.localStorage.getItem(GlobalData.cities[i].uid);
   
          if (favCity != undefined && favCity != null && favCity == GlobalData.cities[i].stadt) {
            this.favCities.push(GlobalData.cities[i]); 
          }
                 
        }
      }      
    }
  }  

  onFilterButtonClick() {
    if (this.favCities.length == 0) {
      return;
    }

    this.plt.ready().then(() => {
      this.emailComposer.isAvailable().then((available: boolean) =>{
        if(available) {
          //Now we know we can send
        }
      });

      let str = "Meine favorisierten Städte, gesendet über die 'HighStreets'-App von COMFORT:";
      let body = '';
      for (let i = 0; i < this.favCities.length; i++) {
        let temp = i + 1;
        body = body + temp + ". " + this.favCities[i].stadt + "<br />"; 
      }    
      
      body += "<br />Kontakt:<br />COMFORT Holding GmbH<br />Kaistraße 8A<br />40221 Düsseldorf<br />Fon:+49 211 9550-0<br />Fax:+49 211 9550-150<br />duesseldorf@comfort.de<br />www.comfort.de<br />";
      
      let email = {
        to: '',
        cc: '',
        bcc: [],
        attachments: [],
        subject: str,
        body: body,
        isHtml: true
      };

      this.emailComposer.open(email);
    });    
  }
  
  onCityButtonClick(city) {
    this.navCtrl.push('DetailCityPage', city);
  }

  onStarIconClick(city) {
    window.localStorage.setItem(city.uid, null);
    const that = this;
    setTimeout( function() {
      that.getFavCities();
    }, 500 );  
  }
}
