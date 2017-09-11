import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import xml2js from 'xml2js';
import { GlobalData } from '../../utils/global-data';
import { LangProvider } from '../../providers/lang/lang';

@IonicPage()
@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html',
})
export class SetupPage {

  public tickerText:any;
  public cur_lang: any;
  public lang: any;
  public flag: any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private langService: LangProvider) {
    
    this.getAllLangText();
    this.cur_lang = GlobalData.cur_country;
    if (GlobalData.device_lang.substring(0,2)=='de') {
      this.lang = "de-" + GlobalData.cur_country;
    }
    else {
      this.lang = "en-" + GlobalData.cur_country;
    }
    
    this.flag = false;
  }

  ionViewDidLoad() {
    
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
           if (this.flag) {
             this.navCtrl.setRoot("MainMenuPage");
           }                  
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

  onBackButtonClick() {
    this.navCtrl.pop();
  }

  onLangSetup(lang) {    
    switch (lang) {
    case 'DE':
      if (this.cur_lang == "de") {

      }
      else {
        this.cur_lang = 'de';
        GlobalData.cur_country = 'de';
        GlobalData.cities = [];
        GlobalData.references = [];
        GlobalData.lang_data = [];
        this.getAllLangText();
        this.flag = true;        
      }
      break;
    case 'CH':
      if (this.cur_lang == 'ch') {

      }
      else {
        this.cur_lang = 'ch';
        GlobalData.cur_country = 'ch';
        GlobalData.cities = [];
        GlobalData.references = [];
        GlobalData.lang_data = [];
        this.getAllLangText();
        this.flag = true;        
      }
      break;
    default:
      break;
    }
  }
}
