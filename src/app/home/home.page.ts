import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';



import {test} from '@angular-devkit/core/src/virtual-fs/host';
import {ActivityPage} from '../activity/activity.page';
import {currentSignalGPS} from '../app.module';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})



export class HomePage {
  private currentColorBar = '#FF2D00'; // red : #FF2D00 , green : #3EFF00, orange : #FF9700
  private allSport = ['VTT', 'Running', 'Walk'];
  private allTraining = ['Calories', 'Endurance', 'Bike'];
  private totalDistance = '0';
  private totalAverageSpeed = '0';
  private totalTime = '0';


  constructor(public navCtrl: NavController) {
   // document.getElementById('firstBarHome').style.backgroundColor = this.red;
    this.changeGPSSignal(currentSignalGPS.high);
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

  setTotalDistance(distance: string) {
    this.totalDistance = distance;
  }

  setTotalAverageSpeed(speed: string) {
    this.totalAverageSpeed = speed;
  }

  setTotalTime(time: string) {
    this.totalTime = time;
  }

  onClickQuickLaunch() {
  this.navCtrl.navigateRoot('activity');

  }
}

