import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { Platform } from 'ionic-angular';
import { TransformProvider } from '../../providers/transform/transform';
import xml2js from 'xml2js';
// import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GlobalData } from '../../utils/global-data';
import { LangProvider } from '../../providers/lang/lang';

declare var window;
@IonicPage()
@Component({
  selector: 'page-detail-contact',
  templateUrl: 'detail-contact.html',
})
export class DetailContactPage {
  
  public detailInfo: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private emailComposer: EmailComposer, 
    public plt: Platform, 
    // private iab: InAppBrowser, 
    private langService: LangProvider,
    private transformService: TransformProvider) {

    this.detailInfo = navParams.data;       
  }

  ionViewDidLoad() {
    
  }

  ionViewWillEnter() {
    this.transformService.set(null, false);
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

  callIT() {
    this.plt.ready().then(() => {
      let passedNumber = encodeURIComponent(this.detailInfo.telephone);
      window.location = "tel:"+passedNumber;  
    });
    
  }

  sendEmail() {
    this.plt.ready().then(() => {
      this.emailComposer.isAvailable().then((available: boolean) =>{
        if(available) {
          //Now we know we can send
        }
      });

      let email = {
        to: this.detailInfo.email,
        cc: '',
        bcc: [],
        attachments: [],
        subject: '',
        body: '',
        isHtml: true
      };

      this.emailComposer.open(email);
    });    
    
  }

  goWebsite() {
    console.log("site:" , 'http://'+this.detailInfo.website);
    // this.plt.ready().then(() => {
    //   this.iab.create('http://'+this.detailInfo.website, "_system", 'location=yes'); 
    // });
    let data = {title: this.detailInfo.name, id: 'web', url: 'http://'+this.detailInfo.website};
    this.navCtrl.push('RootsitePage', data);
  }

  goMapPage() {
    GlobalData.ALL_STREET_FLAG = 3;
    this.navCtrl.push("MapPage", this.detailInfo);
  }
  
  onBackButtonClick() {
    this.navCtrl.pop();
  }
}
