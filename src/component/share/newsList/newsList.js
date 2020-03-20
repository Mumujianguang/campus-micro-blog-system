import React, { Component } from 'react';
import { Icon } from 'antd';
import './newsList.less';
import { boundActions } from '@/redux/index';

export default class newsList extends Component {

    showGlobalNewPage = () => {
        // 分发action
        boundActions.createShowGlobalNewPage();
    }

    render() {
        const { id, title, releaseTime } = this.props.newsItem;
        return (
            <div className="newsListItem" 
                 data-id={ id }
                 onClick={ this.showGlobalNewPage }>
                <div className="newsTitle">
                    <Icon type="cloud" />
                    <span className="newsTitleText">{ `标题： ${ title }` }</span>
                </div>
                <div className="newsReleaseTime">{ `发布于 ${ releaseTime }` }</div>
            </div>
        )
    }
}
