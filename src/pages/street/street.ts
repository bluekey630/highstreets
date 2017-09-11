import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalData } from '../../utils/global-data';
import xml2js from 'xml2js';
import { LangProvider } from '../../providers/lang/lang';

@IonicPage()
@Component({
  selector: 'page-street',
  templateUrl: 'street.html',
})
export class StreetPage {

  public detailInfo: any;
  public tickerText:any;
  public contentItem: any[];
  public contentItemText: any[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,     
    private langService: LangProvider) {   

    this.getAllLangText();  
    this.detailInfo = navParams.data;    
    this.getContentItem();
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

  getContentItem() {
    this.contentItem = [];
    for (let i = 0; i < GlobalData.cities.length; i++) {
      if (this.detailInfo.uid == GlobalData.cities[i].parent_id) {
        this.contentItem.push(GlobalData.cities[i]);
      }
    }
    this.getContentItemText();
  }

  getContentItemText() {

    this.contentItemText = [];
    if (this.contentItem.length > 0) {
      this.contentItemText.push(this.getLangText('listitem.map'));
      // if (this.detailInfo.pdf_file) {
      //   this.contentItemText.push(this.getLangText('title.overview'));
      // }
      for (let i = 0; i < this.contentItem.length; i++) {
        this.contentItemText.push(this.contentItem[i].strasse);
      }
    }
  }

  onItemClicked(item) {
    switch (item) {
    case this.getLangText('listitem.map'):
      GlobalData.ALL_STREET_FLAG = 1;
      this.navCtrl.push('MapPage', this.detailInfo);
      break;
    case this.getLangText('title.overview'):
      let data1 = {title: this.getLangText('title.overview'), id: 'pdf', url: 'http://highstreets.de/uploads/karten/'+this.detailInfo.pdf_file};//http://highstreets.de/uploads/karten/
      this.navCtrl.push('RootsitePage', data1);
      break;
    default:
      let data = {parent: this.detailInfo, data: item};
      this.navCtrl.push('StreetDetailPage', data);
      break;
    }
  }

  onFavoritButtonClick() {

  }

  onBackButtonClick() {
    this.navCtrl.pop();
  }
}
