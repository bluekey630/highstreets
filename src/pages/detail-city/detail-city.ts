import { Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import xml2js from 'xml2js';
import { GlobalData } from '../../utils/global-data';
import { ContactDetail } from '../../model/contact-detail';
import { TransformProvider } from '../../providers/transform/transform';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Platform } from 'ionic-angular';
import { LangProvider } from '../../providers/lang/lang';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { EmailComposer } from '@ionic-native/email-composer';
import 'rxjs/add/operator/map';

declare var ol: any;
declare var google;
declare var window;

@IonicPage({
  segment: 'contacts/detail-contact'
})
@Component({
  selector: 'page-detail-city',
  templateUrl: 'detail-city.html',
})
export class DetailCityPage {

  public detailInfo: any; 
  public purchasing_price:any;
  public CONTACT_DETAILS = new Array('de', 'ch');
  public contentList: any[];
  public favorFlag: any;
  public deviceName: any;
  public deviceType: any;
  public width1: any;
  public width2: any;
  public spliteFlag: any;
  public retail_color: any;
  public street_color: any;
  public contact_color: any;
  public term_color: any;
  public lang: any;
  public state: any;
  public contactInfo: any;
  public contentItem: any;
  public contentItemText: any;
  public mapID: any;
  public link: any;
  public panorama: any;  

  @ViewChild('map') 
  mapElement: ElementRef;
  map: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor (public navCtrl: NavController, 
        public navParams: NavParams, 
        private transformService: TransformProvider, 
        private iab: InAppBrowser, 
        private langService: LangProvider,
        private screen: ScreenOrientation,
        private emailComposer: EmailComposer,
        private plt: Platform) {

    this.detailInfo = navParams.data;    
    this.getPurchasingPrice(this.detailInfo.kaufpreisentwicklung);

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
    this.width1 = "100%";
    this.width2 = "0%";
    this.spliteFlag = false;

    this.retail_color = "#9da8b7";
    this.street_color = "#9da8b7";
    this.contact_color = "#9da8b7";
    this.term_color = "#9da8b7";

    this.state = "map";
    this.mapID = 'pdf';
    
    
    if (this.detailInfo.pdf_file == null || this.detailInfo.pdf_file == "") {
      this.mapID = "google";
    } else if (this.detailInfo.pdf_file.includes('.png')) {
      this.mapID = 'png';
    }      
    
    this.initMap(this.mapID);
    
    if ((this.deviceName=="ipad" || this.deviceName=="tablet") && this.deviceType.includes('landscape')) {
      this.width1 = "30%";
      this.width2 = "70%";
      this.spliteFlag = true;
      this.retail_color = "#0a284c";
      this.street_color = "#9da8b7";
      this.contact_color = "#9da8b7";
      this.term_color = "#9da8b7";
    }
    this.screen.onChange().subscribe(
        () => {          
          this.deviceType = this.screen.type;          
          if ((this.deviceName=="ipad" || this.deviceName=="tablet") && this.deviceType.includes('landscape')) {
            this.width1 = "30%";
            this.width2 = "70%";
            this.spliteFlag = true;
            
            if (this.state == 'map') {
              this.retail_color = "#0a284c";
              this.street_color = "#9da8b7";
              this.contact_color = "#9da8b7";
              this.term_color = "#9da8b7";
            }
            else if (this.state == 'street') {
              this.retail_color = "#9da8b7";
              this.street_color = "#0a284c";
              this.contact_color = "#9da8b7";
              this.term_color = "#9da8b7";
            }
            else if (this.state == 'contact') {
              this.retail_color = "#9da8b7";
              this.street_color = "#9da8b7";
              this.contact_color = "#0a284c";
              this.term_color = "#9da8b7";
            }
            else if (this.state == 'term') {
              this.retail_color = "#9da8b7";
              this.street_color = "#9da8b7";
              this.contact_color = "#9da8b7";
              this.term_color = "#0a284c";
            }
          }
          else {
            this.width1 = "100%";
            this.width2 = "0%";
            this.spliteFlag = false;
            this.retail_color = "#9da8b7";
            this.street_color = "#9da8b7";
            this.contact_color = "#9da8b7";
            this.term_color = "#9da8b7";
          }
        }
    );    
  }

  ionViewDidLoad() {
    this.favorFlag = false;
    let favCity = window.localStorage.getItem(this.detailInfo.uid);
    if (favCity != undefined && favCity != null && favCity == this.detailInfo.stadt) {      
      this.favorFlag = true;
    }    
  }

  ionViewWillEnter() {
    if (GlobalData.device_lang.substring(0,2)=='de') {
      this.lang = 'de';
    }
    else {
      this.lang = 'en';
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

  getPurchasingPrice(value) {
    switch (value) {
		case 'konstant':
			this.purchasing_price = 'constant';
			break;
		case 'leicht steigend':
			this.purchasing_price = 'light-rise';
			break;
		case 'leicht fallend':
			this.purchasing_price = 'light-fall';
			break;
		case 'stark fallend':
			this.purchasing_price = 'sharp-fall';
			break;
		default:
			this.purchasing_price = 'unknown';
			break;
	  }
  }

  onMapButtonClicked() {
    GlobalData.ALL_STREET_FLAG = 0;
    this.state = "map";
    if (this.spliteFlag) {      
      this.retail_color = "#0a284c";
      this.street_color = "#9da8b7";
      this.contact_color = "#9da8b7";
      this.term_color = "#9da8b7";
      this.initMap(this.mapID);
    }
    else {
      this.navCtrl.push('MapPage', this.detailInfo);
    }    
  }

  initMap(mapID) {    
    const that = this;
    setTimeout( function() {
      that.link = 'http://highstreets.de/uploads/karten/'+that.detailInfo.pdf_file;//http://highstreets.de/uploads/karten/
      if (that.link.includes('.png')) {
        that.mapID = 'png';
      }
      that.addMarkersToMap(that.mapID)
      
    }, 500 );
  }

  addMarkersToMap(mapID) {
    if (mapID == 'google') {
      let zoom = 8;
      let position: any;
      let dogwalkMarker: any; 
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: zoom,
        center: {lat: parseFloat(this.detailInfo.lat), lng: parseFloat(this.detailInfo.lon)}
      });
      this.directionsDisplay.setMap(this.map);

      position = new google.maps.LatLng(parseFloat(this.detailInfo.lat), parseFloat(this.detailInfo.lon));
      dogwalkMarker = new google.maps.Marker({position: position, title: this.detailInfo.stadt});
      dogwalkMarker.setMap(this.map);
      
    }
    else if (mapID == 'OSM') {

      let zoom = 8;
      this.map = new ol.Map({ 
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        target: 'map',
        view: new ol.View({
          center: ol.proj.fromLonLat([parseFloat(this.detailInfo.lon), parseFloat(this.detailInfo.lat)]),
          zoom: zoom
        })
      });

      let features = [];
      let lon = parseFloat(this.detailInfo.lon);
      let lat = parseFloat(this.detailInfo.lat);
      let iconFeature = new ol.Feature ({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat]))
      });

      let iconStyle = new ol.style.Style ({
        image: new ol.style.Icon(({
          anchor: [0.5, 49],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          opacity: 1,
          src: './assets/img/pin.png'
        }))
      });
      
      iconFeature.setStyle(iconStyle);
      features.push(iconFeature);

      let vectorSource = new ol.source.Vector({
        features: features
      });

      let vectorLayer = new ol.layer.Vector({
        source: vectorSource
      })

      this.map.addLayer(vectorLayer);            
    }
    else if (mapID == 'street') {      
      this.panorama = new google.maps.StreetViewPanorama (
        document.getElementById('street-view'),
        {
          position: {lat: parseFloat(this.detailInfo.lat), lng: parseFloat(this.detailInfo.lon)},
          pov: {heading: 165, pitch: 0},
          zoom:1
        }
      )            
    } 
  }

  selectMap(mapID) {    
    if (mapID == 'pdf' || mapID == 'png') {
      if (this.detailInfo.pdf_file == null || this.detailInfo.pdf_file == "") {
        this.mapID = "google";
      }
      else {
        this.mapID = mapID;
        if (this.detailInfo.pdf_file.includes('png')) {
          this.mapID = 'png';
        }
      }
    }
    else {
      this.mapID = mapID;      
      const that = this;
      setTimeout( function() {
        that.addMarkersToMap(that.mapID)
      }, 500 );
      this.addMarkersToMap(mapID);
    }  
  }

  onStreetButtonClicked() {
    this.state = "street";
    if (this.spliteFlag) {
      this.retail_color = "#9da8b7";
      this.street_color = "#0a284c";
      this.contact_color = "#9da8b7";
      this.term_color = "#9da8b7";
      this.getContentItem();
    }
    else {
      this.navCtrl.push('StreetPage', this.detailInfo);
    }
    
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
      // this.plt.ready().then(() => {
      //   this.iab.create('http://www.highstreets.de/uploads/karten/'+this.detailInfo.pdf_file); 
      // });
      let data1 = {title: this.getLangText('title.overview'), id: 'pdf', url: 'http://highstreets.de/uploads/karten/'+this.detailInfo.pdf_file};//http://highstreets.de/uploads/karten/
      this.navCtrl.push('RootsitePage', data1);
      break;
    default:
      let data = {parent: this.detailInfo, data: item};      
      this.navCtrl.push('StreetDetailPage', data);
      break;
    }
  }

  onContactButtonClicked() {
    this.state = "contact";
    for (let i = 0; i < this.contentList.length; i++) {
      if (this.detailInfo.gesellschaft == this.contentList[i].shortname) {     
        this.transformService.set(this.contentList[i], true);    
        if (this.spliteFlag) {
          this.retail_color = "#9da8b7";
          this.street_color = "#9da8b7";
          this.contact_color = "#0a284c";
          this.term_color = "#9da8b7";
          this.contactInfo = this.contentList[i];  
        }
        else {
          this.navCtrl.push('DetailContactPage', this.transformService.get().data);
        }                 
        break;
      }
    }
  }

  onCityInformationButtonClicked() {
    if (GlobalData.device_lang.substring(0,2)=='de') {
      this.lang = 'de';
    }
    else {
      this.lang = 'en';
    }
    
    let wikiLink = 'http://' + this.lang + '.m.wikipedia.org/wiki/' + encodeURIComponent(this.detailInfo.stadt);
    let data = {title: this.getLangText('city.label.cityinfo'), id: 'web', url: wikiLink};
    
    // this.plt.ready().then(() => {      
    //     this.iab.create(wikiLink, "_system", 'location=yes');             
    // });
    if (this.plt.is('ios')) {
      this.iab.create(wikiLink, "_system", 'location=yes');      
    }
    else {
      this.navCtrl.push('RootsitePage', data);
    }
  }

  onTermDefinitionsButtonClicked() { 
    this.state = "term";
    if (this.spliteFlag) {
      this.retail_color = "#9da8b7";
      this.street_color = "#9da8b7";
      this.contact_color = "#9da8b7";
      this.term_color = "#0a284c";
    }
    else {
      this.navCtrl.push('InfoCityPage', this.detailInfo);
    }      
  }

  callIT() {
    this.plt.ready().then(() => {
      let passedNumber = encodeURIComponent(this.contactInfo.telephone);
      window.location = "tel:"+passedNumber;  
    });
  }

  sendEmail() {
    this.plt.ready().then(() => {
      this.emailComposer.isAvailable().then((available: boolean) =>{
        if(available) {
          //Now we know we can send
        }
      });

      let email = {
        to: this.contactInfo.email,
        cc: '',
        bcc: [],
        attachments: [],
        subject: '',
        body: '',
        isHtml: true
      };

      this.emailComposer.open(email);
    });    
  }

  goWebsite() {
    // this.plt.ready().then(() => {
    //   this.iab.create('http://'+this.contactInfo.website, "_system", 'location=yes'); 
    // });
    let data = {title: this.contactInfo.name, id: 'web', url: 'http://'+this.contactInfo.website};
    this.navCtrl.push('RootsitePage', data);
  }

  goMapPage() {
    GlobalData.ALL_STREET_FLAG = 3;
    this.navCtrl.push("MapPage", this.contactInfo);
  }

  onFavoritButtonClick() {    
    if (this.favorFlag) {
      window.localStorage.setItem(this.detailInfo.uid, null);
      this.favorFlag = false;
    }
    else {
      window.localStorage.setItem(this.detailInfo.uid, this.detailInfo.stadt);
      this.favorFlag = true;
    }
  }

  onBackButtonClick() {
    this.navCtrl.pop();
  }
}
