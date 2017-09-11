import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { ReferencesProvider } from '../../providers/references/references';
import { GlobalData } from '../../utils/global-data';
import xml2js from 'xml2js';
import { LangProvider } from '../../providers/lang/lang';

@IonicPage()
@Component({
  selector: 'page-ref-detail',
  templateUrl: 'ref-detail.html',
})
export class RefDetailPage {
  
  public detailInfo: any;
  public title: any;
  

  constructor(public navCtrl: NavController,
     public navParams: NavParams, 
     private langService: LangProvider) {

       this.getAllLangText();
       this.detailInfo = navParams.data.data;
       this.title = navParams.data.title;
       this.detailInfo.description = decodeURIComponent(this.detailInfo.description);
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
}


  