import React, { Component } from 'react';
import './likeHeart.less';
import { Icon } from 'antd';

export default class likeHeart extends Component {
    
    changeIsFollow = (e) => {
        e.stopPropagation();
        const { userType } = this.props; 
        if (userType === 'other') return;
        const { isFollow, changeFollowStatus } = this.props;
        changeFollowStatus(!isFollow);
    }

    render() {
        return (
            <div className="followIcon" onClick={ this.changeIsFollow }>
                {
                    this.props.isFollow ? 
                        <Icon type="heart" theme="filled" /> : <Icon type="heart" />
                }
            </div>
        )
    }
}
