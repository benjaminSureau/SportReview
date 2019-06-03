import { Component } from '@angular/core';
import {test} from '@angular-devkit/core/src/virtual-fs/host';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})



export class HomePage {
  private currentColorBar = '#FF2D00'; // red : #FF2D00 , green : #3EFF00, orange : #FF9700
  private allSport = ['VTT', 'Running', 'Walk'];


  constructor() {
   // document.getElementById('firstBarHome').style.backgroundColor = this.red;
    this.changeGPSSignal(currentSignalGPS.high);
  }

  changeGPSSignal(signal: currentSignalGPS) {
    switch (signal) {
      case currentSignalGPS.low:
        this.currentColorBar  = '#FF9700';
        case currentSignalGPS.medium:
          this.currentColorBar = '#FF9700';
          case currentSignalGPS.high:
            this.currentColorBar = '#3EFF00';


    }
  }

  SelectClicked(detail){
    console.log('SelectClicked' + detail);
  }
}

enum currentSignalGPS {
  low = 2,
  medium = 3,
  high = 4
}
