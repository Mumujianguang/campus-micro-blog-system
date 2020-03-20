import React, { Component } from 'react';
import echarts from 'echarts';
import './indexPage.less';

export default class indexPage extends Component {
    componentDidMount () {
        const bar_day = echarts.init(document.getElementById("bar_chart_day"));
        const line_month = echarts.init(document.getElementById("line_chart_month"));

        bar_day.setOption({
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
            }]
        })

        line_month.setOption({
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'line'
            }]
        })
    }
    
    render() {
        return (
            <div className="indexPage">
                <div className="top">
                    <p className="titleText">今日访问量</p>
                    <div id="bar_chart_day"></div>
                </div>
                <div className="bottom">
                    <p className="titleText">本月访问量</p>
                    <div id="line_chart_month"></div>
                </div>
            </div>
        )
    }
}
