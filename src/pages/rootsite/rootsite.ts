import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Navbar } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-rootsite',
  templateUrl: 'rootsite.html',
})
export class RootsitePage {

  public link: any;
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.link = this.navParams.data;
    if (this.link.id == "pdf") {
      let url = this.link.url;
      this.link.url = null;
      const that = this;   
      setTimeout( function() {
        that.link.url = url; 
        
      }, 500 ); 
    }     
  }

  ionViewDidLoad() {    
    this.setBackButtonAction()
  }

  setBackButtonAction(){
    this.navBar.backButtonClick = () => {
    //Write here wherever you wanna do
       this.navCtrl.pop()
    }
 }
}
