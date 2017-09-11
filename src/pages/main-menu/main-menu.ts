import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Nav } from 'ionic-angular';
import { LangProvider } from '../../providers/lang/lang';
import xml2js from 'xml2js';
import { GlobalData } from '../../utils/global-data';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-main-menu',
  templateUrl: 'main-menu.html',
})
export class MainMenuPage {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = 'CityPage';
  public pages: any[];
  public lang: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private langService: LangProvider, 
    private iab: InAppBrowser,
    private plt:Platform) {

    if (GlobalData.device_lang.substring(0,2)=='de') {
      this.lang = 'de';
    }
    else {
      this.lang = 'en';
    }

    this.getAllLangText();
    this.pages = [
      {title: 'info-centre.linktext.6', component: 'SetupPage'},
      {title: 'nav.cities', component: 'CityPage'},       
      {title: 'button.favoerites', component: 'FavoritePage'}, 
      {title: 'info-centre.linktext.2', component: 'UberCOMFORT'},
      {title: 'title.services', component: 'ServicePage'},      
      {title: 'nav.references', component: 'ReferencesPage'}, 
      {title: 'info-centre.linktext.3', component: 'Karrie'},
      {title: 'title.news', component: 'NewsPage'},
      {title: 'XING', component: 'XingPage'},
      {title: 'LinkedIn', component: 'LinkedInPage'},
      {title: 'Twitter', component: 'TwitterPage'},
      {title: 'nav.contact', component: 'ContactPage'}, 
      {title: 'title.impressum', component: 'ImprintPage'}      
    ];
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
                   
         });
    })    
  }

  getLangText(index) {
    if (GlobalData.lang_data.length <= 0) {
      return index;
    }
    let text = "";
    for (let i = 0; i < GlobalData.lang_data.length; i++ ) {
      if (GlobalData.lang_data[i].$.index == index) {
        text = GlobalData.lang_data[i]._;
        break;
      }
    }
    
    if (text == "") {
      text = index;
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

  openPage(page) {
    if (page.component == "XingPage") {
      this.plt.ready().then(() => {
        this.iab.create('https://www.xing.com/companies/comfort-gruppe', "_system", 'location=yes'); 
      });      
    }
    else if (page.component == "LinkedInPage") {
      this.plt.ready().then(() => {
        this.iab.create('https://www.linkedin.com/company/comfort---gruppe?trk=company_logo', "_system", 'location=yes'); 
      });
    }
    else if (page.component == "TwitterPage") {      
      this.plt.ready().then(() => {
        this.iab.create('https://twitter.com/Comfort_Presse', "_system", 'location=yes'); 
      });
    }
    else if (page.component == "UberCOMFORT") {            
      let data = {title: this.getLangText(page.title), id: 'web', url: 'http://www.comfort.de/' + this.lang + '/company/'};
      this.nav.setRoot('RootsitePage', data);
      
    }
    else if (page.component == "NewsPage") {
      let data = {title: this.getLangText(page.title), id: 'web', url: 'http://www.comfort.de/' + this.lang + '/media-center/presse/'};
      this.nav.setRoot('RootsitePage', data);
    }
    else if (page.component == "Karrie") {
      let data = {title: this.getLangText(page.title), id: 'web', url: 'http://www.comfort.de/' + this.lang + '/unternehmen/karriere'};
      this.nav.setRoot('RootsitePage', data);
    }    
    else {      
      this.nav.setRoot(page.component);
    }
  }
}
