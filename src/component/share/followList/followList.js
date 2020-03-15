import React, { Component } from 'react';
import UserAvatar from '@/component/share/userAvatar/userAvatar';
import './followList.less';
import LikeHeart from '../likeHeart/likeHeart';
import { boundActions } from '@/redux/index';
import uuid from 'uuid';
import api from '@/api';
import { message } from 'antd';

export default class followList extends Component {
    state = {
        type: this.props.type,
        ...this.props.userFollowDataItem
    }
    // 点击单条用户信息时显示该用户主页
    showGlobalUserPage = () => {
        // 分发action
        const { userType, type } = this.props;
        if (userType === "other") return;
        const targetUser = type === "follow" ? this.state.concernUserPhone : this.state.fansPhone;
        boundActions.createShowGlobalUserPage();
        boundActions.createUpdateGlobalUserPhone(targetUser);
    }

    // 检查图片路径类型
    checkImagePath = (filePath) => {
        if (filePath.indexOf("resource\\img") === -1) return filePath;
        return `${api.apiPath}/getPic?path=${filePath}`;
    }

    // 改变关注标识的状态 -- 同步关注/取关
    changeFollowStatus = (status) => {
        const { type, userPhone } = this.state;
        let targetUser = type === "follow" ? this.state.concernUserPhone : this.state.fansPhone;
        let promiseTask = null;
        let messageInfo = "";
        if (status) {
            promiseTask = api.concernUser({
                id: uuid(),
                userPhone,
                concernUserPhone: targetUser
            })
            messageInfo = "关注成功！"
            boundActions.createUpdateUserConcernNum(1);
        } else {
            promiseTask = api.cancelConcern({
                userPhone,
                concernUserPhone: targetUser
            })
            messageInfo = "取关成功！"
            boundActions.createUpdateUserConcernNum(-1);
        }
        promiseTask.then(result => {
            if (result.data.msg !== "ok") {
                message.error("服务器出错啦~")
                return;
            }
            api.getUserConcernList(userPhone).then(result => {
                const { concernList } = result.data;
                // 存入store
                boundActions.createUpdateUserConcernList(concernList);
            })
            message.success(messageInfo);
        })

        this.setState({
            isFollow: status
        })
    }

    render() {
        const { userType} = this.props;  
        const { userImage, userNick, userSign, isFollow } = this.state;
        
        return (
            
            <div className="followListBox" onClick={ this.showGlobalUserPage }>
                <UserAvatar size={ 60 } imgSrc={ this.checkImagePath(userImage) } />
                <div className="info">
                    <p className="userNick">{ userNick }</p>
                    <span className="userSay">{ `个人简介：${ userSign }` }</span>
                </div>
                <LikeHeart isFollow={ isFollow }
                           userType={ userType }
                           changeFollowStatus={ this.changeFollowStatus } />
            </div>
        )
    }
}
