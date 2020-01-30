import React, { Component } from 'react';
import { Icon } from 'antd';
import FollowList from '@/component/share/followList/followList';
import './userBaseList.less';

export default class userFollow extends Component {
    render() {
        const { type, userData } = this.props;
        return (
            <div className="userFollow">
                <p className="pageTitle">
                    <Icon type="team" />
                    <span>{ type === "follow" ? "关注" : "粉丝" }</span>
                </p>
                <div className="userFollowBox">
                    {
                        userData.map((ele, index) => (
                            <FollowList userFollowDataItem={ ele } key={ index } />
                        ))
                    }
                </div>
            </div>
        )
    }
}
