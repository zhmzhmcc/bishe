import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { Chart } from '@antv/g2';
import * as G2 from '@antv/g2';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {


  selectDateBtnVal: any = 'today'; // 当前选中时间按钮状态
  data: { genre: string; sold: number; }[];
  chart: Chart;

  constructor() { }

  ngOnInit() {
    this.initChart()
  }

  //点击查看不同数据
  dateClick(date){
    if(date != 'search'){
      this.selectDateBtnVal = date
    }else{
      console.log(this.selectDateBtnVal)

    }
   
  }
   //初始化柱状图
   initChart(){
    const data = [
      { company: '通过', type: '信工学院', value: 30 },
      { company: '不通过', type: '信工学院', value: 35 },
    
      { company: '通过', type: '演艺学院', value: 40 },
      { company: '不通过', type: '演艺学院', value: 65 },
    
      { company: '通过', type: '理学院', value: 23 },
      { company: '不通过', type: '理学院', value: 18 },
    
      { company: '通过', type: '美术学院', value: 35 },
      { company: '不通过', type: '美术学院', value: 30 },

      { company: '通过', type: '医学院', value: 35 },
      { company: '不通过', type: '医学院', value: 30 },
    ];
   
   
    
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: 'auto'
    });
    chart.source(data);
    chart.scale('value', {
      alias: '占比（%）',
      max: 75,
      min: 0,
      tickCount: 4
    });
    chart.axis('type', {
      label: {
        textStyle: {
          fill: '#aaaaaa'
        }
      },
     
    });
    
    chart.axis('value', {
      label: {
        textStyle: {
          fill: '#aaaaaa'
        }
      },
      title: {
        offset: 50
      }
    });
    chart.legend({
      position: 'top-center'
    });
    chart.interval().position('type*value').color('company')
      .opacity(1)
      .adjust([{
        type: 'dodge',
        marginRatio: 1 / 32
      }]);
    chart.render();
    
   }


}
