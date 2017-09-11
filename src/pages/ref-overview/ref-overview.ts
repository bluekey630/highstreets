import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import xml2js from 'xml2js';
import { LangProvider } from '../../providers/lang/lang';
import { GlobalData } from '../../utils/global-data';

@IonicPage()
@Component({
  selector: 'page-ref-overview',
  templateUrl: 'ref-overview.html',
})
export class RefOverviewPage {
  
  public detailInfo: any[];
  public data: any[];
  public title: any;
  public flag: any;
  public totalPage: number;
  public curPage: number;
  public curData: any[];
  
  constructor(public navCtrl: NavController,
     public navParams: NavParams, 
     private langService: LangProvider) {

       this.title = navParams.data.title;
       this.detailInfo = navParams.data.data;       
       this.getAllLangText();
       this.spliteData(this.detailInfo);
       this.curPage = 0;
       this.totalPage = Math.floor(this.data.length / 5);
       this.getCurData(this.data);
  }

  ionViewDidLoad() {
    
  }

  spliteData(data) {
    this.data = [];
    let buf: any;
    for ( let i = 0; i < data.length; i+=2 ) {
      if (i + 1 < data.length) {
        buf = {left: data[i], right: data[i+1]};
        this.data.push(buf);
      }
      else {
        buf = {left: data[i], right: null};
        this.data.push(buf);
      }
    }    
  }

  getCurData(data) {
    let i = 0;
    this.curData = [];
    if (this.curPage * 5 + 5 < this.data.length) {
      for ( i = this.curPage * 5; i < this.curPage * 5 + 5; i++ ) {
        this.curData.push(this.data[i]);
      }
    }
    else {
      for ( i = this.curPage * 5; i < this.data.length; i++ ) {
        this.curData.push(this.data[i]);
      }
    }
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

  onItemClicked(item) {
    let data = { title: this.title, data: item};
    this.navCtrl.push("RefDetailPage", data);
  }

  onBackButtonClick() {
    this.navCtrl.pop();
  }

  ConvChar( str ) {
    str = str.replace(/&amp;/g, "&");
    str = str.replace(/&gt;/g, ">");
    str = str.replace(/&lt;/g, "<");
    str = str.replace(/&quot;/g, '"');
    str = str.replace(/&#039;/g, "'");
    return str;
  }

  onFirstButtonClick(){
    this.curPage = 0;
    this.getCurData(this.data);
  }

  onPrevButtonClick() {
    this.curPage--;
    if (this.curPage <= 0) {
      this.curPage = 0;
    }
    this.getCurData(this.data);
  }

  onNextButtonClick() {
    this.curPage++;
    if (this.curPage >= this.totalPage) {
      this.curPage = this.totalPage;
    }
    this.getCurData(this.data);
  }

  onLastButtonClick() {
    this.curPage = this.totalPage;
    this.getCurData(this.data);
  }

  ConvPageNum(str) {
    str = str.replace(/#PAGE#/g, this.curPage + 1);
    str = str.replace(/#TOTAL#/g, this.totalPage + 1);
    return str;
  }
}
