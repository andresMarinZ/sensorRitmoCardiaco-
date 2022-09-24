import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ServiceFirebaseService } from '../../service-firebase.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  urlRitmoCardiaco:string = 'ritmoCardiaco'
  ritmoCardiaco:any = '';
  arraySensor:any[]=[];
  arraySensorLabel:any[]=[];
  urlRitmoCardiacoBoolean:boolean = false;

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data:this.arraySensor,
        label: 'Ritmo cardiaco',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: this.arraySensorLabel
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    animation:{
      
    }
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(private serviceFirebase:ServiceFirebaseService){
    
    this.getLuz();
  }

  ngOnInit(): void {
  }


  generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  getLuz(){
    this.serviceFirebase.getValueFirebase(this.urlRitmoCardiaco)
    .subscribe((resp) => {
      this.urlRitmoCardiacoBoolean = !this.urlRitmoCardiacoBoolean;
      this.ritmoCardiaco = resp;
      this.arraySensor.push(resp);
      this.arraySensorLabel.push(this.dateActual());
      this.chart?.update();
    })
  }

  dateActual(){
    let fecha = new Date; 
    let desdeStr = `${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;
    return desdeStr;
  }

}
