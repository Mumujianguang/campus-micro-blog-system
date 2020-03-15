import React, { Component } from 'react'
import { boundActions } from '@/redux';
import './userAvatar.less';

export default class userAvatar extends Component {
    state = {
        userPhone: this.props.userPhone || ""
    }

    // 点击头像显示全局用户页面
    showGlobalUserPage = () => {
        const { userPhone } = this.state;
        // 分发action 
        boundActions.createShowGlobalUserPage();
        boundActions.createUpdateGlobalUserPhone(userPhone)
    }

    render() {
        const { imgSrc, size } = this.props;
        return (
            <div style={{ width: `${size}px`, height: `${size}px` }} 
                 className="avatarBox"
                 onClick={ this.showGlobalUserPage } >
                <img src={ imgSrc } alt="" className="avatar" />
            </div>
        )
    }
}
