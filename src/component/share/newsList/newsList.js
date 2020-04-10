import React, { Component } from 'react';
import { Icon, message } from 'antd';
import './newsList.less';
import { boundActions } from '@/redux/index';
import api from '../../../api';

export default class newsList extends Component {
    state = {
        ...this.props.newsItem
    }

    showGlobalNewPage = () => {
        const {id, title, newsFrom, releaseTime  } = this.state;
        
        // 获取新闻详情
        api.getNewsItem(id).then(result => {
            console.log(result);
            if (result.data.msg !== 'ok') {
                message.error("出错啦！");
                return;
            }
            const newsData = {
                newsTitle: title,
                newsFrom,
                newsTime: releaseTime,
                eventPointList: result.data.data
            }
            boundActions.createUpdatePreviewData(newsData);
            // 分发action
            // 显示新闻面板
            boundActions.createShowGlobalNewPage();
        })
        
    }

    render() {
        const { title, newsFrom, releaseTime } = this.state;
        return (
            <div className="newsListItem" 
                 onClick={ this.showGlobalNewPage }>
                <div className="newsTitle">
                    <Icon type="cloud" />
                    <span className="newsTitleText">{ `标题： ${ title }` }</span>
                </div>
                <div className="newsReleaseTime">{ `${newsFrom} 发布于 ${ releaseTime }` }</div>
            </div>
        )
    }
}
