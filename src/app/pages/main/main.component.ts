import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ServiceFirebaseService } from '../../service-firebase.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  urlLuz:string = 'Luz'
  luz:any = '';
  arraySensor:any[]=[];
  arraySensorLabel:any[]=[];

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data:this.arraySensor,
        label: 'Series A',
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
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
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
    console.log('Entro')
    this.serviceFirebase.getValueFirebase(this.urlLuz)
    .subscribe((resp) => {
      console.log(typeof resp)
      this.arraySensor.push(resp)
      this.arraySensorLabel.push(this.dateActual())
      console.log(this.arraySensorLabel);
      this.chart?.update()
    })
  }

  dateActual(){
    let fecha = new Date;
    // let desdeStr = `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}T${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;
    let desdeStr = `${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;
    return desdeStr;
  }

}
