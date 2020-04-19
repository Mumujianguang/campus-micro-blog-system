import React, { Component } from 'react';
import echarts from 'echarts';
import './indexPage.less';
import api from '@/api';
import { message } from 'antd';

export default class indexPage extends Component {

    state = {
        barDayOption: {
            xAxis: {
                type: 'category',
                name: '时',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                name: '用户登录数',
                type: 'value'
            },
            series: [{
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
            }]
        },
        lineMonthOption: {
            xAxis: {
                type: 'category',
                name: '星期',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                name: '用户登录数',
                type: 'value'
            },
            series: [{
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'line'
            }]
        }

    }

    // 各时段统计
    hourCount = (data) => {
        const countObj = {};
        const dateArr = data.map(item => item.loginDate);
        dateArr.forEach(item => {
            const curDate = new Date(item);
            const curDate_hour = curDate.getHours();
            if (!countObj[curDate_hour]) {
                countObj[curDate_hour] = 1;
                return;
            }
            countObj[curDate_hour] ++;
        })
        return countObj;
    }

    covertWeek = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    weekCount = (data) => {
        const countObj = {};
        const dateArr = data.map(item => item.loginDate);
        dateArr.forEach(item => {
            const curDate = new Date(item);
            let curDate_week = curDate.getDay();
            if (curDate_week === 0) {
                curDate_week = 7;
            }
            const curDate_week_zh = this.covertWeek[curDate_week - 1];
            if (!countObj[curDate_week_zh]) {
                countObj[curDate_week_zh] = {
                    key: curDate_week,
                    key_zh: curDate_week_zh,
                    value: 1
                };
                return;
            }
            countObj[curDate_week_zh].value ++;
        })
        return countObj;
    }

    componentDidMount () {
        const bar_day = echarts.init(document.getElementById("bar_chart_day"));
        const line_month = echarts.init(document.getElementById("line_chart_month"));

        const { barDayOption, lineMonthOption } = this.state;

        // 获取用户登录信息
        api.getLoginDate().then(result => {
            console.log(result);
            if (result.data.msg !== 'ok') {
                message.info("服务端出错啦！")
                return;
            }
            const { data } = result.data;

            // 各时段统计
            const countObj_hour = this.hourCount(data);

            // 每周各天统计
            const countObj_week = this.weekCount(data);

            console.log(countObj_week);
            const xAxisData_hour = Object.keys(countObj_hour);
            const seriesData_hour = Object.values(countObj_hour);
            barDayOption.xAxis.data = xAxisData_hour;
            barDayOption.series[0].data = seriesData_hour;
            bar_day.setOption(barDayOption);

            
            let seriesData_week_base = Object.values(countObj_week);
            seriesData_week_base.sort((a, b) => a.key - b.key);
            const seriesData_week = seriesData_week_base.map(item => item.value);
            const xAxisData_week = seriesData_week_base.map(item => item.key_zh);
            lineMonthOption.xAxis.data = xAxisData_week;
            lineMonthOption.series[0].data = seriesData_week;
            line_month.setOption(lineMonthOption);
        })
    }
    
    render() {
        return (
            <div className="indexPage">
                <div className="top">
                    <p className="titleText">累计各时段访问量</p>
                    <div id="bar_chart_day"></div>
                </div>
                <div className="bottom">
                    <p className="titleText">累计每周各天访问量</p>
                    <div id="line_chart_month"></div>
                </div>
            </div>
        )
    }
}
