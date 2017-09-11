import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CityProvider } from '../../providers/city/city';
import { LangProvider } from '../../providers/lang/lang';
import xml2js from 'xml2js';
import { LoadingController } from 'ionic-angular';
import { GlobalData } from '../../utils/global-data';
import { Platform } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
// import { StatusBar } from '@ionic-native/status-bar';

declare var window;
@IonicPage()
@Component({
  selector: 'page-city',
  templateUrl: 'city.html',
})
export class CityPage {  

  public cities: any[];  
  public groupedContacts: any[];
  public myInput: any;
  public alphaFlag:boolean;
  public searchedCities: any[];
  public filterFlag: any;
  public filteredCities: any[];
  public sortButtonTitle: any;
  public sortFlag: any;
  public sortedCities: any[];
  public deviceName: any;
  public deviceType: any;
  public device_width:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private cityService: CityProvider, 
    private langService: LangProvider,
    private plt: Platform,
    private screen: ScreenOrientation,
    // private statusBar: StatusBar,
    public loadingController:LoadingController) {  

    this.screen.unlock();

    this.deviceName = '';
    if (this.plt.is('ios')) {
      this.deviceName = 'ios';      
    }
    else if (this.plt.is('android')) {
      this.deviceName = 'android';      
    }
    
    if (this.plt.is('ipad')) {
      this.deviceName = 'ipad';      
    }
    else if (this.plt.is('tablet')) {
      this.deviceName = 'tablet';      
    }
    
    this.deviceType = this.screen.type;
    this.screen.onChange().subscribe(
        () => {          
          this.deviceType = this.screen.type;          
        }
    );

    this.getAllLangText();
    this.alphaFlag = true;
    this.filterFlag = false;
    this.sortFlag = false;  
    this.device_width = this.plt.width();      
  }  

  ionViewDidLoad() {
    
  }

  ionViewWillEnter() {    
    this.getCities();
    this.alphaFlag = GlobalData.alphaFlag;
    this.filterFlag = GlobalData.filterFlag;
    this.sortFlag = false;
    this.sortButtonTitle = this.getLangText('button.sort');
    if (this.filterFlag) {
      this.getFilteredCities();
      this.sortButtonTitle = this.getLangText('button.reset-filter');
      this.sortFlag = false;
      GlobalData.sort_alphabetical = true;
      GlobalData.sort_population = false;
      GlobalData.sort_population_dev = false;
      GlobalData.sort_social_ins = false;
      GlobalData.sort_unemployment_rate = false;
      GlobalData.sort_purchasing_power = false;
      GlobalData.sort_centrality_param = false;
      GlobalData.sort_highest_rent = false;
      GlobalData.sort_city_ranking = false;
    }
    else if (!GlobalData.sort_alphabetical) {
      this.sortFlag = true;
      this.getSortedCities();
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

  getCities() {
    if (GlobalData.cities.length > 0) {
      this.cities = [];
      for (let i = 0; i<GlobalData.cities.length; i++) {
        if (GlobalData.cities[i]["parent_id"] == "0") {
          this.cities.push(GlobalData.cities[i]);   
          let favCity = window.localStorage.getItem(GlobalData.cities[i].uid);
          if (favCity != undefined && favCity != null && favCity == GlobalData.cities[i].stadt) {            
            GlobalData.cities[i].favFlag = true;
          }
          else {
            GlobalData.cities[i].favFlag = false;
          }     
        }
      }
      this.groupContacts(this.cities);
      return;
    }

    this.cities = [];    
    let loading = this.loadingController.create({content : this.getLangText("loading.msg.data-from-server")});
    loading.present();
    this.cityService.getCities().then(res => {
      loading.dismiss(); 
      let obj = res["data"];      
      this.cities = [];
      for (let i = 0; i<parseInt(res["num"]); i++) {
        GlobalData.cities.push(obj[i]);
        if (obj[i]["parent_id"] == "0") {
          let favCity = window.localStorage.getItem(obj[i].uid);          
          if (favCity != undefined && favCity != null && favCity == obj[i].stadt) {           
            obj[i].favFlag = true;
          }
          else {
            obj[i].favFlag = false;
          }
          this.cities.push(obj[i]);        
        }
      }

      this.groupContacts(this.cities);
           
    })
  }

  groupContacts(contacts){ 
    let sortedContacts = contacts;//.sort();
    let currentLetter = false;
    let currentContacts = [];
    this.groupedContacts = [];

    sortedContacts.forEach((value, index) => {
        if(value.stadt.charAt(0) != currentLetter){
            currentLetter = value.stadt.charAt(0);
            let newGroup = {
                letter: currentLetter,
                contacts: []
            };
            currentContacts = newGroup.contacts;
            this.groupedContacts.push(newGroup);
        } 
        currentContacts.push(value);
    }); 
   }  

   public onCitiesItemClick(item) {    
     this.navCtrl.push('DetailCityPage', item);
   }

   public onFilterButtonClick() {
    this.navCtrl.push('FilterPage');
   }

   onFavIconClicked(item) {
     if (item.favFlag) {
      window.localStorage.setItem(item.uid, null);
      item.favFlag = false;
     }
     else {
      window.localStorage.setItem(item.uid, item.stadt);
      item.favFlag = true;
     }
   }

   public onSortButtonClick() {
    if (this.filterFlag) { 
      this.alphaFlag = true;
      this.filterFlag = false;
      GlobalData.alphaFlag = true;
      GlobalData.filterFlag = false;
      GlobalData.population = { lower: 10000, upper: 3500000 };
      GlobalData.population_dev = { lower: -10, upper: 10 };
      GlobalData.social_insurance = { lower: 5000, upper: 2000000 };
      GlobalData.unemployment_rate = { lower: 2, upper: 30 };
      GlobalData.purchasing_power = { lower: 40, upper: 150 };
      GlobalData.certrality_param = { lower: 50, upper: 300 };
      GlobalData.city_ranking = { lower: 0, upper: 7 };
      this.sortButtonTitle = this.getLangText('button.sort');
    }
    else {
      this.navCtrl.push('SortPage');
    }
   }

   onInput() {    
    if (this.myInput == undefined || this.myInput.length == 0) {
      GlobalData.alphaFlag = true;
      this.alphaFlag = true;
    }
    else {
      GlobalData.alphaFlag = false;
      this.alphaFlag = false;
      this.getSearchedCityes();
    }    
  }   

  getSearchedCityes() {
    this.searchedCities = [];
    for (let i = 0; i < this.cities.length; i++ ) {
      if ( this.cities[i].stadt.toLowerCase().indexOf(this.myInput.toLowerCase()) !== -1 ) {
        this.searchedCities.push(this.cities[i]);
      }
    }
  }

  getFilteredCities() {
    this.filteredCities = [];
    for (let i = 0; i < this.cities.length; i++ ) {      
      if (+(this.cities[i].einwohner) >= +(GlobalData.population.lower) && +(this.cities[i].einwohner) <= +(GlobalData.population.upper) && 
      +(this.cities[i].demographie) >= +(GlobalData.population_dev.lower) && +(this.cities[i].demographie) <= +(GlobalData.population_dev.upper) && 
      +(this.cities[i].sozialversicherungspfl) >= +(GlobalData.social_insurance.lower) && +(this.cities[i].sozialversicherungspfl) <= +(GlobalData.social_insurance.upper) &&
      +(this.cities[i].arbeitslosenquote) >= +(GlobalData.unemployment_rate.lower) && +(this.cities[i].arbeitslosenquote) <= +(GlobalData.unemployment_rate.upper) && 
      +(this.cities[i].kaufkraft) >= +(GlobalData.purchasing_power.lower) && +(this.cities[i].kaufkraft) <= +(GlobalData.purchasing_power.upper) &&
      +(this.cities[i].zentralitaet) >= +(GlobalData.certrality_param.lower) && +(this.cities[i].zentralitaet) <= +(GlobalData.certrality_param.upper) &&
      +(this.cities[i].rate_index) >= +(GlobalData.city_ranking.lower) && +(this.cities[i].rate_index) <= +(GlobalData.city_ranking.upper)) 
      {
        this.filteredCities.push(this.cities[i]);
      }      
    }    
  }

  getSortedCities() {
    this.sortedCities = this.cities;   
    let i = 0, j = 0; 
    let temp: any;
    if (GlobalData.sort_population) {
      for ( i = 0; i < this.sortedCities.length - 1; i++ ) {
        for ( j = i + 1; j < this.sortedCities.length; j++) {
          if (+(this.sortedCities[i].einwohner) < +(this.sortedCities[j].einwohner)) {
            temp = this.sortedCities[i];
            this.sortedCities[i] = this.sortedCities[j];
            this.sortedCities[j] = temp;
          }
        }
      }
    }
    else if (GlobalData.sort_population_dev) {
      for ( i = 0; i < this.sortedCities.length - 1; i++ ) {
        for ( j = i + 1; j < this.sortedCities.length; j++) {
          if (+(this.sortedCities[i].demographie) < +(this.sortedCities[j].demographie)) {
            temp = this.sortedCities[i];
            this.sortedCities[i] = this.sortedCities[j];
            this.sortedCities[j] = temp;
          }
        }
      }
    } 
    else if (GlobalData.sort_social_ins) {
      for ( i = 0; i < this.sortedCities.length - 1; i++ ) {
        for ( j = i + 1; j < this.sortedCities.length; j++) {
          if (+(this.sortedCities[i].sozialversicherungspfl) < +(this.sortedCities[j].sozialversicherungspfl)) {
            temp = this.sortedCities[i];
            this.sortedCities[i] = this.sortedCities[j];
            this.sortedCities[j] = temp;
          }
        }
      }
    } 
    else if (GlobalData.sort_unemployment_rate) {
      for ( i = 0; i < this.sortedCities.length - 1; i++ ) {
        for ( j = i + 1; j < this.sortedCities.length; j++) {
          if (+(this.sortedCities[i].arbeitslosenquote) < +(this.sortedCities[j].arbeitslosenquote)) {
            temp = this.sortedCities[i];
            this.sortedCities[i] = this.sortedCities[j];
            this.sortedCities[j] = temp;
          }
        }
      }
    } 
    else if (GlobalData.sort_purchasing_power) {
      for ( i = 0; i < this.sortedCities.length - 1; i++ ) {
        for ( j = i + 1; j < this.sortedCities.length; j++) {
          if (+(this.sortedCities[i].kaufkraft) < +(this.sortedCities[j].kaufkraft)) {
            temp = this.sortedCities[i];
            this.sortedCities[i] = this.sortedCities[j];
            this.sortedCities[j] = temp;
          }
        }
      }
    } 
    else if (GlobalData.sort_centrality_param) {
      for ( i = 0; i < this.sortedCities.length - 1; i++ ) {
        for ( j = i + 1; j < this.sortedCities.length; j++) {
          if (+(this.sortedCities[i].zentralitaet) < +(this.sortedCities[j].zentralitaet)) {
            temp = this.sortedCities[i];
            this.sortedCities[i] = this.sortedCities[j];
            this.sortedCities[j] = temp;
          }
        }
      }
    } 
    else if (GlobalData.sort_highest_rent) {
      for ( i = 0; i < this.sortedCities.length - 1; i++ ) {
        for ( j = i + 1; j < this.sortedCities.length; j++) {
          if (+(this.sortedCities[i].rent) < +(this.sortedCities[j].rent)) {
            temp = this.sortedCities[i];
            this.sortedCities[i] = this.sortedCities[j];
            this.sortedCities[j] = temp;
          }
        }
      }
    }   
    else if (GlobalData.sort_city_ranking) {
      for ( i = 0; i < this.sortedCities.length - 1; i++ ) {
        for ( j = i + 1; j < this.sortedCities.length; j++) {
          if (+(this.sortedCities[i].rate_index) < +(this.sortedCities[j].rate_index)) {
            temp = this.sortedCities[i];
            this.sortedCities[i] = this.sortedCities[j];
            this.sortedCities[j] = temp;
          }
        }
      }
    }   
  }
}
