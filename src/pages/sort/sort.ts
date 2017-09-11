import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalData } from '../../utils/global-data';
import xml2js from 'xml2js';
import { LangProvider } from '../../providers/lang/lang';

@IonicPage()
@Component({
  selector: 'page-sort',
  templateUrl: 'sort.html',
})
export class SortPage {

  public alphabetical: any = true;
  public population: any = false;
  public population_dev: any = false;
  public social_ins: any = false;
  public unemployment_rate: any = false;
  public purchasing_power: any = false;
  public centrality_param: any = false;
  public highest_rent: any = false;
  public city_ranking: any = false;

  constructor(public navCtrl: NavController,
    private langService: LangProvider,
    public navParams: NavParams) {
      this.getAllLangText();

  }

  ionViewDidLoad() {
    
  }

  ionViewWillEnter() {
    this.alphabetical = GlobalData.sort_alphabetical;
    this.population = GlobalData.sort_population;
    this.population_dev = GlobalData.sort_population_dev;
    this.social_ins = GlobalData.sort_social_ins;
    this.unemployment_rate = GlobalData.sort_unemployment_rate;
    this.purchasing_power = GlobalData.sort_purchasing_power;
    this.centrality_param = GlobalData.sort_centrality_param;
    this.highest_rent = GlobalData.sort_highest_rent;
    this.city_ranking = GlobalData.sort_city_ranking;
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
  
  public onItemClicked(value) {
    switch (value) {
    case '1':
      GlobalData.alphaFlag = GlobalData.sort_alphabetical = this.alphabetical = true;
      GlobalData.sort_population = this.population = false;
      GlobalData.sort_population_dev = this.population_dev = false;
      GlobalData.sort_social_ins = this.social_ins = false;
      GlobalData.sort_unemployment_rate = this.unemployment_rate = false;
      GlobalData.sort_purchasing_power = this.purchasing_power = false;
      GlobalData.sort_centrality_param = this.centrality_param = false;
      GlobalData.sort_highest_rent = this.highest_rent = false;
      GlobalData.sort_city_ranking = this.city_ranking = false;
      break;
    case '2':
      GlobalData.alphaFlag = GlobalData.sort_alphabetical = this.alphabetical = false;
      GlobalData.sort_population = this.population = true;
      GlobalData.sort_population_dev = this.population_dev = false;
      GlobalData.sort_social_ins = this.social_ins = false;
      GlobalData.sort_unemployment_rate = this.unemployment_rate = false;
      GlobalData.sort_purchasing_power = this.purchasing_power = false;
      GlobalData.sort_centrality_param = this.centrality_param = false;
      GlobalData.sort_highest_rent = this.highest_rent = false;
      GlobalData.sort_city_ranking = this.city_ranking = false;
      break;
    case '3':
      GlobalData.alphaFlag = GlobalData.sort_alphabetical = this.alphabetical = false;
      GlobalData.sort_population = this.population = false;
      GlobalData.sort_population_dev = this.population_dev = true;
      GlobalData.sort_social_ins = this.social_ins = false;
      GlobalData.sort_unemployment_rate = this.unemployment_rate = false;
      GlobalData.sort_purchasing_power = this.purchasing_power = false;
      GlobalData.sort_centrality_param = this.centrality_param = false;
      GlobalData.sort_highest_rent = this.highest_rent = false;
      GlobalData.sort_city_ranking = this.city_ranking = false;
      break;
    case '4':
      GlobalData.alphaFlag = GlobalData.sort_alphabetical = this.alphabetical = false;
      GlobalData.sort_population = this.population = false;
      GlobalData.sort_population_dev = this.population_dev = false;
      GlobalData.sort_social_ins = this.social_ins = true;
      GlobalData.sort_unemployment_rate = this.unemployment_rate = false;
      GlobalData.sort_purchasing_power = this.purchasing_power = false;
      GlobalData.sort_centrality_param = this.centrality_param = false;
      GlobalData.sort_highest_rent = this.highest_rent = false;
      GlobalData.sort_city_ranking = this.city_ranking = false;
      break;
    case '5':
      GlobalData.alphaFlag = GlobalData.sort_alphabetical = this.alphabetical = false;
      GlobalData.sort_population = this.population = false;
      GlobalData.sort_population_dev = this.population_dev = false;
      GlobalData.sort_social_ins = this.social_ins = false;
      GlobalData.sort_unemployment_rate = this.unemployment_rate = true;
      GlobalData.sort_purchasing_power =this.purchasing_power = false;
      GlobalData.sort_centrality_param = this.centrality_param = false;
      GlobalData.sort_highest_rent = this.highest_rent = false;
      GlobalData.sort_city_ranking = this.city_ranking = false;
      break;
    case '6':
      GlobalData.alphaFlag = GlobalData.sort_alphabetical = this.alphabetical = false;
      GlobalData.sort_population = this.population = false;
      GlobalData.sort_population_dev = this.population_dev = false;
      GlobalData.sort_social_ins = this.social_ins = false;
      GlobalData.sort_unemployment_rate = this.unemployment_rate = false;
      GlobalData.sort_purchasing_power = this.purchasing_power = true
      GlobalData.sort_centrality_param = this.centrality_param = false;
      GlobalData.sort_highest_rent = this.highest_rent = false;
      GlobalData.sort_city_ranking = this.city_ranking = false;
      break;
    case '7':
      GlobalData.alphaFlag = GlobalData.sort_alphabetical = this.alphabetical = false;
      GlobalData.sort_population = this.population = false;
      GlobalData.sort_population_dev = this.population_dev = false;
      GlobalData.sort_social_ins = this.social_ins = false;
      GlobalData.sort_unemployment_rate = this.unemployment_rate = false;
      GlobalData.sort_purchasing_power = this.purchasing_power = false;
      GlobalData.sort_centrality_param = this.centrality_param = true;
      GlobalData.sort_highest_rent = this.highest_rent = false;
      GlobalData.sort_city_ranking = this.city_ranking = false;
      break;
    case '8':
      GlobalData.alphaFlag = GlobalData.sort_alphabetical = this.alphabetical = false;
      GlobalData.sort_population = this.population = false;
      GlobalData.sort_population_dev = this.population_dev = false;
      GlobalData.sort_social_ins = this.social_ins = false;
      GlobalData.sort_unemployment_rate = this.unemployment_rate = false;
      GlobalData.sort_purchasing_power = this.purchasing_power = false;
      GlobalData.sort_centrality_param = this.centrality_param = false;
      GlobalData.sort_highest_rent = this.highest_rent = true;
      GlobalData.sort_city_ranking = this.city_ranking = false;
      break;
    case '9':
      GlobalData.alphaFlag = GlobalData.sort_alphabetical = this.alphabetical = false;
      GlobalData.sort_population = this.population = false;
      GlobalData.sort_population_dev = this.population_dev = false;
      GlobalData.sort_social_ins = this.social_ins = false;
      GlobalData.sort_unemployment_rate = this.unemployment_rate = false;
      GlobalData.sort_purchasing_power = this.purchasing_power = false;
      GlobalData.sort_centrality_param = this.centrality_param = false;
      GlobalData.sort_highest_rent = this.highest_rent = false;
      GlobalData.sort_city_ranking = this.city_ranking = true;
      break;
    default:
      break;
    }
  }

  onBackButtonClick() {
    this.navCtrl.pop();
  }
}
