import { Component , ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import xml2js from 'xml2js';
import { GlobalData } from '../../utils/global-data';
import { LangProvider } from '../../providers/lang/lang';
import 'rxjs/add/operator/map';

declare var ol: any;
declare var google;
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  public detailInfo: any;
  public tickerText:any;
  public markers: any[];
  public title: any;
  public mapID: any;
  public link: any;
  public panorama: any;
  public newWidth: any;

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private langService: LangProvider) {
    
    this.getAllLangText();
    this.detailInfo = navParams.data;
    if (GlobalData.ALL_STREET_FLAG == 3) {
      this.title = this.detailInfo.name;
    }
    else if (GlobalData.ALL_STREET_FLAG != 2) {
      this.title = this.detailInfo.stadt;
    }
    else {
      this.title = this.detailInfo.strasse;
    }   

    this.newWidth = 100;
  }

  ionViewDidLoad() {
    this.mapID = "pdf";    
    if (this.detailInfo.pdf_file == null || this.detailInfo.pdf_file == "") {
      this.mapID = "google";
    } else if (this.detailInfo.pdf_file.includes('.png')) {
      this.mapID = 'png';
    }
    this.initMap(this.mapID);
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

  initMap(mapID) {
    const that = this;    
    setTimeout( function() {      
      that.link = 'http://highstreets.de/uploads/karten/' + that.detailInfo.pdf_file;//'http://highstreets.de/uploads/karten/'
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

      if (GlobalData.ALL_STREET_FLAG == 0 ) {
        zoom = 8;
      }
      else if (GlobalData.ALL_STREET_FLAG == 2 ){
        zoom = 14;
      }
      else {
        zoom = 12;
      }

      if (GlobalData.ALL_STREET_FLAG == 1) {
        if (this.detailInfo.lat != "") {
          this.map = new google.maps.Map(this.mapElement.nativeElement, {
            zoom: zoom,
            center: {lat: parseFloat(this.detailInfo.lat), lng: parseFloat(this.detailInfo.lon)}
          });
          this.directionsDisplay.setMap(this.map); 
        }
            
        let flag = true;
        for (let i = 0; i < GlobalData.cities.length; i++) {
          if (this.detailInfo.uid == GlobalData.cities[i].parent_id) {
            if (this.detailInfo.lat == "") {
              if (flag) {
                this.map = new google.maps.Map(this.mapElement.nativeElement, {
                  zoom: zoom,
                  center: {lat: parseFloat(GlobalData.cities[i].lat), lng: parseFloat(GlobalData.cities[i].lon)}
                });
                this.directionsDisplay.setMap(this.map);
              }
              flag = false;
            }
            let city = GlobalData.cities[i];            
            position = new google.maps.LatLng(parseFloat(city.lat), parseFloat(city.lon));
            dogwalkMarker = new google.maps.Marker({position: position, title: city.stadt});
            dogwalkMarker.setMap(this.map);
          }
        }        
      }
      else if (GlobalData.ALL_STREET_FLAG == 3){
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
          zoom: zoom,
          center: {lat: parseFloat(this.detailInfo.lat), lng: parseFloat(this.detailInfo.lng)}
        });
        this.directionsDisplay.setMap(this.map);

        position = new google.maps.LatLng(parseFloat(this.detailInfo.lat), parseFloat(this.detailInfo.lng));
        dogwalkMarker = new google.maps.Marker({position: position, title: this.detailInfo.shortname});
        dogwalkMarker.setMap(this.map);
      }
      else {
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
          zoom: zoom,
          center: {lat: parseFloat(this.detailInfo.lat), lng: parseFloat(this.detailInfo.lon)}
        });
        this.directionsDisplay.setMap(this.map);

        position = new google.maps.LatLng(parseFloat(this.detailInfo.lat), parseFloat(this.detailInfo.lon));
        dogwalkMarker = new google.maps.Marker({position: position, title: this.detailInfo.stadt});
        dogwalkMarker.setMap(this.map);
      }
    }
    else if (mapID == 'OSM') {

      let zoom = 8;
      if (GlobalData.ALL_STREET_FLAG == 0) {
        zoom = 8;
      }
      else if (GlobalData.ALL_STREET_FLAG == 2 ){
        zoom = 14;
      }
      else {
        zoom = 12;
      }

      if (GlobalData.ALL_STREET_FLAG == 1) {
        if (this.detailInfo.lat != "") {
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
        }

        let flag = true;
        let features = [];
        for (let i = 0; i < GlobalData.cities.length; i++) {
          if (this.detailInfo.uid == GlobalData.cities[i].parent_id) {
            if (this.detailInfo.lat == "") {
              if (flag) {                
                this.map = new ol.Map({
                  layers: [
                    new ol.layer.Tile({
                      source: new ol.source.OSM()
                    })
                  ],
                  target: 'map',
                  view: new ol.View({
                    defaults: {zoomControl: true},
                    center: ol.proj.fromLonLat([parseFloat(GlobalData.cities[i].lon), parseFloat(GlobalData.cities[i].lat)]),
                    zoom: zoom
                  })
                });
              }
              flag = false;
            }
            
            let lon = parseFloat(GlobalData.cities[i].lon);
            let lat = parseFloat(GlobalData.cities[i].lat);
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
          }
        }  
        
        let vectorSource = new ol.source.Vector({
          features: features
        });

        let vectorLayer = new ol.layer.Vector({
          source: vectorSource
        })

        this.map.addLayer(vectorLayer);
      }
      else if (GlobalData.ALL_STREET_FLAG == 3) {
        this.map = new ol.Map({
          layers: [
            new ol.layer.Tile({
              source: new ol.source.OSM()
            })
          ],
          target: 'map',
          view: new ol.View({
            center: ol.proj.fromLonLat([parseFloat(this.detailInfo.lng), parseFloat(this.detailInfo.lat)]),
            zoom: zoom
          })
        });

        let features = [];        
        let lon = parseFloat(this.detailInfo.lng);
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
      else {
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
    }
    else if (mapID == 'street') {

      if (GlobalData.ALL_STREET_FLAG == 1) {
      }
      else if (GlobalData.ALL_STREET_FLAG == 3) {       
        this.panorama = new google.maps.StreetViewPanorama (
          document.getElementById('street-view'),
          {
            position: {lat: parseFloat(this.detailInfo.lat), lng: parseFloat(this.detailInfo.lng)},
            pov: {heading: 165, pitch: 0},
            zoom:1
          }
        )        
      }
      else {        
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
  }

  selectMap(mapID) {
    
    if (mapID == 'pdf' || mapID == 'png') {
      if (this.detailInfo.pdf_file == null || this.detailInfo.pdf_file == "") {
        // this.mapID = "google";
      }
      else {
        this.mapID = mapID;
        if (this.detailInfo.pdf_file.includes('.png')) {
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
    }    
  }
  
  onBackButtonClick() {
    this.navCtrl.pop();
  }  

  pinchEvent(e) {

    console.log(e);
  }
}
