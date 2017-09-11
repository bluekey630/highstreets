import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalData } from '../../utils/global-data';
import { Statistics } from '../../model/statistics';
import xml2js from 'xml2js';
import { TransformProvider } from '../../providers/transform/transform';
import { ContactDetail } from '../../model/contact-detail';
import { LangProvider } from '../../providers/lang/lang';

declare var accounting:any;
@IonicPage()
@Component({
  selector: 'page-street-detail',
  templateUrl: 'street-detail.html',
})
export class StreetDetailPage {
  public detailInfo: any;
  public streetName: any;
  public streetInfo: any;
  public value0: any;
  public value1: any;
  public value2: any;
  public buf0: any;
  public buf1: any;
  public buf2: any;
  public arrow_icon0: any;
  public arrow_icon1: any;
  public arrow_icon2: any;
  public contentList: any[];
  public CONTACT_DETAILS = new Array('de', 'ch');
  public deviceLang: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private langService: LangProvider,
    private transformService: TransformProvider) {

    if (GlobalData.device_lang.substring(0,2)=='de') {
      this.deviceLang = 'de';
    }
    else {
      this.deviceLang = 'en';
    }
    
    this.getAllLangText();
    this.detailInfo = navParams.data.parent;
    this.streetName = navParams.data.data;
    this.getCurrentStreet();
    this.getValue();

    this.CONTACT_DETAILS['de'] = new Array<any>(
      new ContactDetail('COMFORT Berlin GmbH', 'Berlin', 'Joachimstaler Straße 34', '10719 Berlin', '+49 30 780961-0', '+49 30 7845015', 'berlin@comfort.de', 'www.comfort.de', 'ber', '52.5025738', '13.3313725'),
      new ContactDetail('COMFORT Düsseldorf GmbH', 'Düsseldorf', 'Neuer Zollhof 1', '40221 Düsseldorf', '+49 211 9550-0', '+49 211 9550-150', 'duesseldorf@comfort.de', 'www.comfort.de', 'dus', '51.2143698', '6.7521668'),
      new ContactDetail('COMFORT Hamburg GmbH', 'Hamburg', 'Mönckebergstraße 13', '20095 Hamburg', '+49 40 300858-0', '+49 40 300858-5', 'hamburg@comfort.de', 'www.comfort.de', 'ham', '53.5507539', '9.9999179'),
      new ContactDetail('COMFORT Leipzig GmbH', 'Leipzig', 'Goethestraße 1', '04109 Leipzig', '+49 341 339681-0', '+49 341 339681-10', 'leipzig@comfort.de', 'www.comfort.de', 'lep', '51.3399102', '12.3800138'),
      new ContactDetail('COMFORT München GmbH', 'München', 'Rindermarkt 6', '80331 München', '+49 89 219988-0', '+49 89 296948', 'muenchen@comfort.de', 'www.comfort.de', 'mun', '48.1360208', '11.574461'),
      new ContactDetail('COMFORT Center Consulting GmbH', 'Center Consulting', 'Neuer Zollhof 1', '40221 Düsseldorf', '+49 211 540063-0', '+49 211 540063-20', 'ccc@comfort.de', 'www.comfort.de', 'consult', '51.2154593', '6.7561355'),
      // new ContactDetail('COMFORT Parking Experts', 'Parking Experts', 'Neuer Zollhof 1', '40221 Düsseldorf', '+49 211 540063-0', '+49 211 540063-20', 'parking@comfort.de', 'www.comfort.de', 'park', '51.2154593', '6.7561355'),
      new ContactDetail('COMFORT Center Management GmbH', 'Center Mgmt', 'Neuer Zollhof 1', '40221 Düsseldorf', '+49 211 540063-0', '+49 211 540063-20', 'ccc@comfort.de', 'www.comfort.de', 'consult', '51.2154593', '6.7561355'),
      new ContactDetail('COMFORT Research & Consulting GmbH', 'R&D Consulting',  'Mönckebergstraße 13', '20095 Hamburg', '+49 40 300858-0', '+49 40 300858-5', 'hamburg@comfort.de', 'www.comfort.de', 'ham', '53.5507539', '9.9999179')
    );

    this.CONTACT_DETAILS['ch'] = new Array<any>(
      new ContactDetail('COMFORT High Streets Swiss AG', 'Zürich',  'Schifflände 16', 'CH-8001 Zürich', '+41 44 252 26 26', '+41 44 252 26 28', 'zuerich@comfort-swiss.ch', 'www.comfort-swiss.ch', '', '47.369156', '8.544087')
    );

    if (GlobalData.cur_country == 'de') {
      this.contentList = this.CONTACT_DETAILS['de'];
    }
    else if (GlobalData.cur_country == 'ch') {
      this.contentList = this.CONTACT_DETAILS['ch'];
    }
  }

  ionViewDidLoad() {

  }

  ionViewDidEnter() {
    if (this.detailInfo.bandbreite_kaufpreisfaktor) {
      this.progressBarAnimation(this.buf0.data.width, this.buf1.data.width, this.buf2.data.width);
    }
    else {
      this.progressBarAnimation(null, this.buf1.data.width, this.buf2.data.width);
    }
  }

  progressBarAnimation(width0, width1, width2) {
    let vm = this;
    if (width0) {
      if (width0 < 15.0) {
        width0 = 15.0;
        var pos0 = 0;
        var id0 = setInterval(frame0, 10);
      }
    }    

    if (width1 < 15.0) {
      width1 = 15.0;
    }

    if (width2 < 15.0) {
      width2 = 15.0;
    }    
    
    let pos1 = 0;
    let pos2 = 0;
    
    let id1 = setInterval(frame1, 10);
    let id2 = setInterval(frame2, 10);

    function frame0() {
      if (pos0 >= width0) {
        clearInterval(id0);
      } else {
        pos0+=0.4;
        
        if (vm.value0 != undefined && vm.value0 != null ){
          vm.value0.data.width = pos0;
        }
        
      }      
    }

    function frame1() {
      if (pos1 >= width1) {
        clearInterval(id1);
      } else {
        pos1+=0.4;
        
        if (vm.value1 != undefined && vm.value1 != null ){
          vm.value1.data.width = pos1;
        }
      }
    }

    function frame2() {
      if (pos2 >= width2) {
        clearInterval(id2);
      } else {
        pos2+=0.4;
        
        if (vm.value2 != undefined && vm.value2 != null ){
          vm.value2.data.width = pos2;
        }
        
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

  getCurrentStreet() {
    for (let i = 0; i < GlobalData.cities.length; i++) {
      let obj = GlobalData.cities[i];
      if (this.detailInfo.uid == obj.parent_id && this.streetName == obj.strasse) {
        this.streetInfo = obj;
        break;
      }
    }
  }

  public getValue() {
    if (this.detailInfo.bandbreite_kaufpreisfaktor) {
      let buf = this.ConvChar(this.detailInfo.bandbreite_kaufpreisfaktor).split('-');
      let val0 = this.calculateStatistics(+(buf[0]), +(buf[1]));
      let temp0 = {width: val0.width, percentage: val0.percentage, direction: val0.direction};
      temp0.width = 0.0;temp0.percentage="";
      this.value0 = {data: temp0, value: +(buf[1])};
      this.buf0 = {data: val0, value: +(buf[1])};
      switch (this.detailInfo.kaufpreisentwicklung) {
      case 'stark fallend':
        this.arrow_icon0 = "arrow-down.png";
        break;
      case 'konstant':
        this.arrow_icon0 = "arrow-constant.png";
        break;
      case 'leicht steigend':
        this.arrow_icon0 = "arrow-up.png";
        break;
      case 'leicht fallend':
        this.arrow_icon0 = "arrow-down.png";
        break;
      default:
        this.arrow_icon0 = "unknown";
        break;
      }
    }
    
    let val1 = this.calculateStatistics(this.streetInfo.qm_80_120_alt, this.streetInfo.qm_80_120);
		let val2 = this.calculateStatistics(this.streetInfo.qm_300_500_alt, this.streetInfo.qm_300_500);
    
    if (parseInt(this.streetInfo.qm_300_500_min) > 0) {
      val1.width = val1.width/12;
      val2.width = val2.width/12;
    }
    
    let temp1 = {width: val1.width, percentage: val1.percentage, direction: val1.direction};
    let temp2 = {width: val2.width, percentage: val2.percentage, direction: val2.direction};
    
    temp1.width = 0.0;
    temp2.width = 0.0;
    
    this.value1 = {data: temp1, value: this.streetInfo.qm_80_120};
    this.value2 = {data: temp2, value: this.streetInfo.qm_300_500};
    
    this.buf1 = {data: val1, value: this.streetInfo.qm_80_120};
    this.buf2 = {data: val2, value: this.streetInfo.m_300_500};

    switch (val1.direction) {
    case 'decrease':
      this.arrow_icon1 = "arrow-down.png";
      break;
    case 'nochange':
      this.arrow_icon1 = "arrow-constant.png";
      break;
    case 'increase':
      this.arrow_icon1 = "arrow-up.png";
      break;
    default:
      break;
    }

    switch (val2.direction) {
    case 'decrease':
      this.arrow_icon2 = "arrow-down.png";
      break;
    case 'nochange':
      this.arrow_icon2 = "arrow-constant.png";
      break;
    case 'increase':
      this.arrow_icon2 = "arrow-up.png";
      break;
    default:
      break;
    }
  }

  public calculateStatistics(oldValue, newValue) {
    // Convert to integer (values come in with a Euro symbol)
    oldValue = parseInt(oldValue);
    newValue = parseInt(newValue);

    if (isNaN(oldValue) || isNaN(newValue)) return new Statistics(0, 0, '');

    // Percentage increase or decrease
    let percent;
    let direction;
    if ((oldValue == newValue) || (oldValue == 0)) {
      percent = 0;
      direction = 'nochange';
    }
    else if (oldValue > newValue) {
      // percent = ((oldValue - newValue) / oldValue) * 100;
      percent = ((newValue * 100) / oldValue) -100 ;
      direction = 'decrease';
    }
    else if (newValue > oldValue) {
      percent = ((newValue - oldValue) / oldValue) * 100;
      direction = 'increase';
    }

    percent = this.formatDecimal(percent);
    // Width for statistics display (max value is 500)
    let width = (newValue / 500) * 100;
    return new Statistics(width, percent, direction);
  }

  formatNumber = function(value) {
    let sep = '.';
    //if (window.lang == 'en')
    sep = ',';
    return accounting.formatNumber(value, 0, sep);
  };

  // Formats a decimal number to 2 places and returns it
  formatDecimal = function(value) {
    let sep1 = '.', sep2 = ',', places = 2;
    //if (window.lang == 'en') {
      sep1 = ',';
      sep2 = '.';
    //}
    //if (window.countryCode == 'ch') places = 1;
    return accounting.formatNumber(value, places, sep1, sep2);
  }

  public onMapButtonClicked() {
    GlobalData.ALL_STREET_FLAG = 2;
    this.navCtrl.push('MapPage', this.streetInfo);
  }

  onRetailStockButtonClicked() {
    GlobalData.ALL_STREET_FLAG = 2;
    this.navCtrl.push('MapPage', this.streetInfo);
  }

  onContactButtonClicked() {
    for (let i = 0; i < this.contentList.length; i++) {
      if (this.detailInfo.gesellschaft == this.contentList[i].shortname) {
        this.transformService.set(this.contentList[i], true);
        this.navCtrl.push('DetailContactPage', this.contentList[i]); 
        break;
      }
    }
  }

  ConvChar( str ) {
    str = str.replace(/&amp;/g, "&");
    str = str.replace(/&gt;/g, ">");
    str = str.replace(/&lt;/g, "<");
    str = str.replace(/&quot;/g, '"');
    str = str.replace(/&#039;/g, "'");
    str = str.replace(/,/g, ".");
    return str;
  }

  onTitleButtonClick() {

  }

  onBackButtonClick() {
    this.navCtrl.pop();
  }
}
