import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactDetail } from '../../model/contact-detail';
import { TransformProvider } from '../../providers/transform/transform';
import xml2js from 'xml2js';
import { GlobalData } from '../../utils/global-data';
import { LangProvider } from '../../providers/lang/lang';
@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  
  public CONTACT_DETAILS = new Array('de', 'ch');
  public contentList: any[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private transformService: TransformProvider,
    private langService: LangProvider) {
    this.getAllLangText();
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

  ionViewWillEnter() {
    if (this.transformService.get().flag) {
      this.navCtrl.push('DetailContactPage', this.transformService.get().data);
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

  onClickContactItem(item) {
    this.navCtrl.push('DetailContactPage', item);
  }
}
