import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import xml2js from 'xml2js';
import { GlobalData } from '../../utils/global-data';
import { LangProvider } from '../../providers/lang/lang';

@IonicPage()
@Component({
  selector: 'page-service',
  templateUrl: 'service.html',
})
export class ServicePage {
  
  constructor(public navCtrl: NavController,
     public navParams: NavParams, 
     private langService:LangProvider) {

    this.getAllLangText();
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

  onItemClcked(item) { 
    let data: any;   
    if (item == 0) {
      data = {item: this.getLangText('services.linktext.1'), id:item};
      this.navCtrl.push("InfoServicePage", data);
    }
    else if (item == 1) {
      data = {item: this.getLangText('services.linktext.2'), id:item};
      this.navCtrl.push("InfoServicePage", data);
    }
    else if (item == 2) {
      data = {item: this.getLangText('services.linktext.3'), id:item};
      this.navCtrl.push("InfoServicePage", data);
    }
    else if (item == 3) {
      data = {item: this.getLangText('services.linktext.4'), id:item};
      this.navCtrl.push("InfoServicePage", data);
    }
    else if (item == 4) {
      data = {item: this.getLangText('services.linktext.5'), id:item};
      this.navCtrl.push("InfoServicePage", data);
    }
    else if (item == 5) {
      data = {item: this.getLangText('services.linktext.6'), id:item};
      this.navCtrl.push("InfoServicePage", data);
    }       
  }

  onBackButtonClick() {
    this.navCtrl.pop();
  }
}
