import React, { Component } from 'react';
import './likeHeart.less';
import { Icon } from 'antd';

export default class likeHeart extends Component {
    state = {
        isFollow: this.props.isFollow
    }
    
    changeIsFollow = (e) => {
        e.stopPropagation();
        const { userType } = this.props; 
        if (userType === 'other') return;
        this.setState(prevState => ({
            isFollow: !prevState.isFollow
        }))
    }

    render() {
        return (
            <div className="followIcon" onClick={ this.changeIsFollow }>
                {
                    this.state.isFollow ? 
                        <Icon type="heart" theme="filled" /> : <Icon type="heart" />
                }
            </div>
        )
    }
}
