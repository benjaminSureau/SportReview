import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {currentSignalGPS} from '../app.module';
import leaflet from 'leaflet';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import { Chart } from 'chart.js';
import {withLatestFrom} from 'rxjs/operators';





@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss', '../home/home.page.scss'],
})
export class ActivityPage implements OnInit {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  private currentColorBar = '#FF2D00'; // red : #FF2D00 , green : #3EFF00, orange : #FF9700

  private currentSession = '';
  private totalSecond = 0;
  private secondTime = 0;
  private minuteTime = 0;
  private hourTime = 0;
  private stringtime = '00:00:00';

  private arrayOfElevation = [];
  private arrayOfValueElevation = [];

  private totalDistance = '0';
  private averageSpeed = '0';
  private currentSpeed = '0';
  private statusMap = false;
  private statusElevation = true;
  private statusSegment = true;
  private colorButtonMap = 'medium';
  private colorButtonElevation = 'primary';
  private colorButtonSegment = 'primary';
  private markerGroup;
  private myIcon;
  private marker = null;

  lineChart: Chart;
  @ViewChild('lineCanvas') lineCanvas;



  constructor() {
    this.setCurrentSession('test');
    this.changeGPSSignal(currentSignalGPS.medium);
    this.setupChronometer();
    this.markerGroup = leaflet.featureGroup();
    this.myIcon = leaflet.icon({
      iconUrl: 'https://image.flaticon.com/icons/svg/149/149049.svg',
      iconSize: [38, 95],
    });

  }

  ngOnInit() {
    this.setupElevationGraph();
  }

  public setupElevationGraph() {

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      data: {
        labels: this.arrayOfElevation,
        datasets: [
          {
            label: 'Elevation : ',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.arrayOfValueElevation,
            spanGaps: false,
          }
        ]
      }
    });
  }

  changeGPSSignal(signal: currentSignalGPS) {
    switch (signal) {
      case currentSignalGPS.low:
        this.currentColorBar  = '#FF9700';
        break;
      case currentSignalGPS.medium:
        this.currentColorBar = '#FF9700';
        break;
      case currentSignalGPS.high:
        this.currentColorBar = '#3EFF00';
        break;


    }
  }

  ionViewDidEnter() {
   this.loadmap();
  }

  appendElevation(elevation: number) {
    this.arrayOfValueElevation.push(elevation);
    this.arrayOfElevation.push(this.arrayOfValueElevation.length);
    this.setupElevationGraph();
  }

  loadmap() {
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 20,
      watch: true,
      enableHighAccuracy: true
    }).on("locationfound", e => {
      console.log('Location found: ' + e.latlng);
      if (!this.marker) {
        this.marker = leaflet.marker(e.latlng, {icon: this.myIcon}).addTo(this.map);
      } else {
        this.marker.setLatLng(e.latlng);
      }
    }).on("locationerror", error => {
      console.log('Location error:');
      console.log(error);
      if (this.marker) {
        this.map.removeLayer(this.marker);
        this.marker = null;
      }
    });

  }

  // OnClick button

  onClickEnd() {
    // a faire
    this.appendElevation(9);
  }

  onClickPause() {
    // a faire
  }

  onClickMap() {
    this.colorButtonMap = 'medium';
    this.colorButtonElevation = 'primary';
    this.colorButtonSegment = 'primary';
    this.statusMap = false;
    this.statusElevation = true;
    this.statusSegment = true;
  }

  onClickElevation() {
    this.colorButtonMap = 'primary';
    this.colorButtonElevation = 'medium';
    this.colorButtonSegment = 'primary';
    this.statusMap = true;
    this.statusElevation = false;
    this.statusSegment = true;
  }

  onClickSegment() {
    this.colorButtonMap = 'primary';
    this.colorButtonElevation = 'primary';
    this.colorButtonSegment = 'medium';
    this.statusMap = true;
    this.statusElevation = true;
    this.statusSegment = false;
  }

  // Setter
  setCurrentSession(session: string) {
    this.currentSession = session;
  }

  setTotalDistance(distance: string) {
    this.totalDistance = distance;
  }

  setAverageSpeed(speed: string) {
    this.averageSpeed = speed;
  }

  setCurrentSpeed(speed: string) {
    this.currentSpeed = speed;
  }

  // chronometer to display
  setupChronometer() {
    const timer = setInterval(() => {
      this.totalSecond += 1;
     // this.hourTime = Math.floor(this.totalSecond / 3600);
     // this.minuteTime = Math.floor(this.totalSecond / 60);
      this.secondTime += 1;
      if (this.secondTime === 60) {
        this.secondTime = 0;
        this.minuteTime += 1;
      }
      if (this.minuteTime === 60) {
        this.minuteTime = 0;
        this.hourTime += 1;
      }
      if (this.hourTime < 10) {
        this.stringtime = '0' + this.hourTime.toString() + ':';
      } else {
        this.stringtime = this.hourTime.toString() + ':';
      }
      if (this.minuteTime < 10) {
        this.stringtime += '0' + this.minuteTime.toString() + ':';
      } else {
        this.stringtime += this.minuteTime.toString() + ':';
      }
      if (this.secondTime < 10) {
        this.stringtime += '0' + this.secondTime.toString();
      } else {
        this.stringtime += this.secondTime;
      }
    }, 1000);
  }
}
