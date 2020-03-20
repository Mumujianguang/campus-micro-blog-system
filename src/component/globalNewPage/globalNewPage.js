import React, { Component } from 'react';
import './globalNewPage.less';
import { store, boundActions } from '@/redux/index';
import EventPoint from './eventPoint/eventPoint'

export default class globalNewPage extends Component {
    state = {
        newsTitle: '',
        newsFrom: '',
        newsTime: '',
        eventPointList: [
            {
                content: '黄色预警：预测PM2.5浓度>115微克每立方米将持续48小时及以上，且短时出现重度污染；预测AQI（除PM2.5以外的其他污染物）日均值>200将持续48小时及以上，未达到高级别预警条件。',
                image: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1068470755,4190615142&fm=26&gp=0.jpg'
            },
            {
                content: '黄色预警：预测PM2.5浓度>115微克每立方米将持续48小时及以上，且短时出现重度污染；预测AQI（除PM2.5以外的其他污染物）日均值>200将持续48小时及以上，未达到高级别预警条件。'
            },
            {
                content: '黄色预警：预测PM2.5浓度>115微克每立方米将持续48小时及以上，且短时出现重度污染；预测AQI（除PM2.5以外的其他污染物）日均值>200将持续48小时及以上，未达到高级别预警条件。',
                image: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1068470755,4190615142&fm=26&gp=0.jpg'
            }
        ]
    }

    componentDidMount () {
        const { newsTitle, newsFrom, newsTime, eventPointList } = store.getState().previewNewsData
        console.log(store.getState().previewNewsData);
        this.setState({
            newsTitle,
            newsFrom,
            newsTime,
            eventPointList
        })
    }

    // 点击隐藏新闻页
    hideGlobalNewPage = () => {
        // 分发action
        boundActions.createHideGlobalNewPage()
    }
    render() {
        const { newsTitle, newsFrom, newsTime, eventPointList } = this.state
        return (
            <div className="globalNewPage">
                <div className="globalNewPageMask" onClick = { this.hideGlobalNewPage }></div>
                <div className="newPageBox">
                    {/** top */}
                    <div className="newTopBox">
                        <div className="newTitle">{ newsTitle }</div>
                        <div className="newInfo">
                            <div className="newTime">{ `发布日期：${newsTime}` }</div>
                            <div className="newFrom">{ `来源： ${newsFrom}` }</div>
                        </div>
                        <div className="eventPointBox">
                            {
                                eventPointList.map((item, index) => (
                                    <EventPoint eventPointItem = { item } key={ index } />
                                ))
                            }
                        </div>                        
                    </div>
                </div>
            </div>
        )
    }
}