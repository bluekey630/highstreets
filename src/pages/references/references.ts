import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import xml2js from 'xml2js';
import { LoadingController } from 'ionic-angular';
import * as $ from 'jquery';
import { GlobalData } from '../../utils/global-data';
import { LangProvider } from '../../providers/lang/lang';

@IonicPage()
@Component({
  selector: 'page-references',
  templateUrl: 'references.html',
})
export class ReferencesPage {
  public tickerText: any;
  public contentList: any[];

  public rentData: any[];
  public investmentData: any[];
  public shoppingData: any[];
  public parkingData: any[];
  public researchData: any[];
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public loadingController:LoadingController, 
    private langService: LangProvider) {
    
    this.getAllLangText();
    this.getReferences();
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

  getReferences() {
    if (GlobalData.references.length > 0) {
      this.parseData(GlobalData.references);
      return;
    }
        
    let loading = this.loadingController.create({content : this.getLangText("loading.msg.data-from-server")});
    loading.present();
    let url = "http://www.comfort.de/index.php?id=207&type=667&mode=timestamp";
    if (GlobalData.cur_country == 'ch') {
      url = "http://www.comfort-swiss.ch/index.php?id=231&type=667&mode=timestamp";
    }
    let vm = this;
    $.ajax({
      url: url,
      dataType: 'jsonp',
      jsonp: false,
      jsonpCallback: 'jsonp_callback',
      success: function(data) {        
        $.each(data, function(k,v){
          GlobalData.references.push(v);          
        });       

        vm.parseData(GlobalData.references);
        
        loading.dismiss();
      },
      error: function() {
        
      }
    });
  }
  
  parseData(data) {

    this.rentData = [];
    this.investmentData = [];
    this.shoppingData = [];
    this.parkingData = [];
    this.researchData = [];

    for (let i = 0; i < data.length; i++) {
      if (GlobalData.cur_country == 'de') {
        if (data[i].category.includes('1')) {
          this.rentData.push(data[i]);            
        }

        if (data[i].category.includes('2')) {
          this.investmentData.push(data[i]);
        }

        if (data[i].category.includes('3')) {
          this.shoppingData.push(data[i]);
        }

        if (data[i].category.includes('4')) {
          this.parkingData.push(data[i]);
        }

        if (data[i].category.includes('5')) {
          this.researchData.push(data[i]);
        }
      }
      else {
        if (data[i].category.includes('6')) {
          this.rentData.push(data[i]);            
        }

        if (data[i].category.includes('7')) {
          this.investmentData.push(data[i]);
        }
      }
    }    
  }

  onItemClicked(item) {    

    let data: any;
    if (item == 0) {
      data = {title: this.getLangText('reference.title.1'), data: this.rentData};      
      this.navCtrl.push("RefOverviewPage", data);
    }
    else if (item == 1) {
      data = {title: this.getLangText('reference.title.2'), data: this.investmentData};      
      this.navCtrl.push("RefOverviewPage", data);
    }
    else if (item == 2) {
      data = {title: this.getLangText('reference.title.3'), data: this.shoppingData};      
      this.navCtrl.push("RefOverviewPage", data);
    }
    else if (item == 3) {
      data = {title: this.getLangText('reference.title.4'), data: this.parkingData};      
      this.navCtrl.push("RefOverviewPage", data);
    }
    else if (item == 4) {
      data = {title: this.getLangText('reference.title.5'), data: this.researchData};      
      this.navCtrl.push("RefOverviewPage", data);
    }    
  }
}
