import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { DataService } from '../data.service';
import { Chart, ChartConfiguration } from 'chart.js';
import * as moment from 'moment';

@Component({
  selector: 'app-pull-requests',
  templateUrl: './pullRequests.component.html',
  styleUrls: ['./pullRequests.component.scss']
})
export class PullRequestsComponent implements OnInit {
  @ViewChild('canvas', { read: ElementRef, static: false }) canvas: ElementRef;

  chart: Chart;
  config: ChartConfiguration;
  chartData: any;
  openedPRs = 0;
  pullRequests: Object;
  closedPRs = 0;
  rejectedPRs = 0;
  searchText: string;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getPullRequests().subscribe(data => {
      this.pullRequests = data;
      if (Object.keys(data).length > 0 )      
        this.loadChart();
    });
    this.data.getPullRequestDataChart().subscribe(data => {
      this.chartData = data;
      if (Object.keys(data).length > 0 )
        this.loadChart();
    });
  }

  loadChart() {

    const timeFormat = 'DD/MM/YYYY HH:mm';

    function newDate(days: moment.DurationInputArg1) {
      return newDateString(moment().add(days, 'd').toDate());
    }
    function newDateString(days) {
      return moment().add(days, 'd').format(timeFormat);
    }

    let PRs = 0;
    let labels = [];
    let rejected = 0;

    if (this.chartData != undefined)
    {
      PRs = this.chartData[0]['y'];
      for (let i = 0; i < this.chartData.length; i++)
        labels.push(newDate(i));
    }

    if (this.pullRequests != undefined) {
      for (let i = 0; i < Object.keys(this.pullRequests).length; i++)
      {
        if (this.pullRequests[i]['reviewers'] != undefined) {
          for (let j = 0; j < Object.keys(this.pullRequests[i]['reviewers']).length; j++) {
            if (this.pullRequests[i]['reviewers'][j]['vote'] == -10) {
              rejected++;
              j = Object.keys(this.pullRequests[i]['reviewers']).length;
            }
          }
        }
      }

      Promise.resolve(null).then(() => this.openedPRs = PRs);
      Promise.resolve(null).then(() => this.rejectedPRs = rejected);
      Promise.resolve(null).then(() => this.closedPRs = Object.keys(this.pullRequests).length - this.openedPRs - rejected);

    }

    this.config = {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'PRs Abertos',
          backgroundColor: 'rgb(0, 173, 210)',
          borderColor: 'rgb(0, 140, 175)',
          borderWidth: 3,
          pointRadius: 2,
          pointHoverRadius: 4,
          pointHitRadius: 2,
          fill: false,
          data: this.chartData,
        }]
      },
      options: {
        title: {
          text: 'Histórico de Pull Requests Abertos',
          display: true,
          fontSize: 25,
          fontFamily: 'Montserrat',
          fontColor: 'black',
          fontStyle: 'normal',
          padding: 40,
        },
        legend: {
          display: false
        },
        tooltips: {
          backgroundColor: 'rgb(0, 173, 210, 0.3)',
          displayColors: false,
          bodyFontFamily: 'Montserrat',
          titleFontFamily: 'Montserrat',
          bodyFontColor: 'rgb(9, 24, 39)',
          titleFontColor: 'rgb(9, 24, 39)',
        },
        scales: {
          xAxes: [{
            type: 'time',
            gridLines: {
              display: false,
            },
            time: {
              parser: timeFormat,
              tooltipFormat: 'DD MMM YYYY'
            },
            scaleLabel: {
              display: false,
              labelString: 'Date'
            }
          }],
          yAxes: [{
            gridLines: {
              display: false,
            },
            scaleLabel: {
              display: false,
              labelString: 'value'
            }
          }]
        },
      }
    };

    this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), this.config);
  }
}
