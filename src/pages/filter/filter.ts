import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalData } from '../../utils/global-data';
import xml2js from 'xml2js';
import { LangProvider } from '../../providers/lang/lang';

@IonicPage()
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {

  population: any = { lower: 10000, upper: 3500000 };
  population_dev: any = { lower: -10, upper: 10 };
  social_insurance: any = { lower: 5000, upper: 2000000 };
  unemployment_rate: any = { lower: 2, upper: 30 };
  purchasing_power: any = { lower: 40, upper: 150 };
  certrality_param: any = { lower: 50, upper: 300 };
  city_ranking: any = { lower: 0, upper: 7 };

  constructor(public navCtrl: NavController, 
    private langService:LangProvider,
    public navParams: NavParams) {
      this.getAllLangText();
  }

  ionViewDidLoad() {
    
  }  

  ionViewWillEnter() {
    this.population = GlobalData.population;
    this.population_dev = GlobalData.population_dev;
    this.social_insurance = GlobalData.social_insurance;
    this.unemployment_rate = GlobalData.unemployment_rate;
    this.purchasing_power = GlobalData.purchasing_power;
    this.certrality_param = GlobalData.certrality_param;
    this.city_ranking = GlobalData.city_ranking;
  }

  ionViewWillLeave() {    
    GlobalData.population = this.population;
    GlobalData.population_dev = this.population_dev;
    GlobalData.social_insurance = this.social_insurance;
    GlobalData.unemployment_rate = this.unemployment_rate;
    GlobalData.purchasing_power = this.purchasing_power;
    GlobalData.certrality_param = this.certrality_param;
    GlobalData.city_ranking = this.city_ranking;

    if (this.checkUpdate()) {
      GlobalData.filterFlag = true;
      GlobalData.alphaFlag = false;
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
  
  onResetButtonClick() {    
    this.population = { lower: 10000, upper: 3500000 };
    this.population_dev = { lower: -10, upper: 10 };
    this.social_insurance = { lower: 5000, upper: 2000000 };
    this.unemployment_rate = { lower: 2, upper: 30 };
    this.purchasing_power = { lower: 40, upper: 150 };
    this.certrality_param = { lower: 50, upper: 300 };
    this.city_ranking = { lower: 0, upper: 7};

    GlobalData.population = { lower: 10000, upper: 3500000 };
    GlobalData.population_dev = { lower: -10, upper: 10 };
    GlobalData.social_insurance = { lower: 5000, upper: 2000000 };
    GlobalData.unemployment_rate = { lower: 2, upper: 30 };
    GlobalData.purchasing_power = { lower: 40, upper: 150 };
    GlobalData.certrality_param = { lower: 50, upper: 300 };
    GlobalData.city_ranking = { lower: 0, upper: 7};

    GlobalData.filterFlag = false;
    GlobalData.alphaFlag = true;
  }

  onBackButtonClick() {    
    this.navCtrl.pop();
  }

  checkUpdate() {
    if (this.population.lower != 10000 || this.population.upper != 3500000) { return true;}
    if (this.population_dev.lower != -10 || this.population_dev.upper != 10) { return true;}
    if (this.social_insurance.lower != 5000 || this.social_insurance.upper != 2000000) { return true;}
    if (this.unemployment_rate.lower != 2 || this.unemployment_rate.upper != 30) { return true;}
    if (this.purchasing_power.lower != 40 || this.purchasing_power.upper != 150) { return true;}
    if (this.certrality_param.lower != 50 || this.certrality_param.upper != 300) { return true;}
    if (this.city_ranking.lower != 0 || this.city_ranking.upper != 7) { return true;}
    return false;
  }
}
