import React, { Component } from 'react';
import { Icon } from 'antd';
import './newsList.less';

export default class newsList extends Component {
    render() {
        const { id, title, releaseTime } = this.props.newsItem;
        return (
            <div className="newsListItem" data-id={ id }>
                <div className="newsTitle">
                    <Icon type="cloud" />
                    <span className="newsTitleText">{ `标题： ${ title }` }</span>
                </div>
                <div className="newsReleaseTime">{ `发布于 ${ releaseTime }` }</div>
            </div>
        )
    }
}
