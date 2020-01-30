import React, { Component } from 'react';
import UserAvatar from '@/component/share/userAvatar/userAvatar';
import './followList.less';
import LikeHeart from '../likeHeart/likeHeart';
import { boundActions } from '@/redux/index';

export default class followList extends Component {
    // 点击单条用户信息时显示该用户主页
    showGlobalUserPage = () => {
        // 分发action
        boundActions.createShowGlobalUserPage();
    }
    render() {
        const { avatarImg, userNick, userSay, isFollow } = this.props.userFollowDataItem;
        return (
            
            <div className="followListBox" onClick={ this.showGlobalUserPage }>
                <UserAvatar size={ 60 } imgSrc={ avatarImg } />
                <div className="info">
                    <p className="userNick">{ userNick }</p>
                    <span className="userSay">{ `个人简介：${ userSay }` }</span>
                </div>
                <LikeHeart isFollow={ isFollow  } />
            </div>
        )
    }
}
