import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { GlobalData } from '../../utils/global-data';
import { Globalization } from '@ionic-native/globalization';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public main_lang: any;
  public top_lang: any;
  public bottom_lang: any;
  public back_img: any;
  
  constructor(public modalCtrl: ModalController, 
    public navCtrl: NavController,
    public globalization: Globalization, 
    private screen: ScreenOrientation,
    private plt: Platform,
    public navParams: NavParams) {

      this.screen.lock(this.screen.ORIENTATIONS.PORTRAIT);
      this.main_lang = "DeutschlaND";
      this.main_lang = this.main_lang.toUpperCase();
      
      this.top_lang = "Österreich";
      this.top_lang = this.top_lang.toUpperCase();

      this.bottom_lang = "Schweiz";
      this.bottom_lang = this.bottom_lang.toUpperCase();      

      this.plt.ready().then(() => {

        this.globalization.getPreferredLanguage()
        .then(res => GlobalData.device_lang = res.value)
        .catch(e => console.log(e));
        
        this.screen.unlock();

        if(this.screen.type.includes('landscape')) {
          // this.back_img = "url(./assets/img/home_bg_land.png)";
          let body = document.getElementById('home-content');          
          body.style.background = "url(./assets/img/home_bg_land.png)";
         
        }
        else {
          // this.back_img = "url(./assets/img/home_bg.png)";
          let body = document.getElementById('home-content');
          body.style.background = "url(./assets/img/home_bg.png)";
        }  

        this.screen.onChange().subscribe(
          () => {             
            if(this.screen.type.includes('landscape')) { 
              let body = document.getElementById('home-content');
              body.style.background = "url(./assets/img/home_bg_land.png)";
            }
            else {   
              let body = document.getElementById('home-content');   
              body.style.background = "url(./assets/img/home_bg.png)";
            }
          }
        );
      });
  }

  ionViewDidLoad() {
    
  }

  public onLangBtnClick(lang) {    
    GlobalData.cur_country = lang;
    
    this.navCtrl.setRoot('MainMenuPage');
  }  
}
