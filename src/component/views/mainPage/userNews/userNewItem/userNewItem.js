import React, { Component } from 'react';
import { Icon } from 'antd';
import * as defaultData from '@/asset/defaultData';
import api from '@/api';
import './userNewItem.less';

export default class userNewItem extends Component {

    // 检查图片路径类型
    checkImagePath = (imagePath) => {
        imagePath = imagePath ? imagePath : defaultData.userImg
        if (imagePath.indexOf("resource\\img") === -1) return imagePath;
        return `${api.apiPath}/getPic?path=${imagePath}`;
    }

    render() {
        const { userNewInfo } = this.props;
        return (
            <div className="userNewItemStyle">
                <div className="newImg">
                    <img src={ this.checkImagePath(userNewInfo.img) } alt="" className="img" />
                </div>
                <div className="newContentBox">
                    {
                        userNewInfo.type !== "" ? <div className="newTitle">{ `#${userNewInfo.type}#` }</div> : ""
                    }
                    <div className="newContent">
                        { userNewInfo.content }
                    </div>
                    <div className="infoContent">
                        {/* 用户信息 */}
                        <div className="userInfo">
                            <img src={ this.checkImagePath(userNewInfo.user.avatarImg) } alt="" className="userAvatar" />
                            <span className="nick">{ userNewInfo.user.nick }</span>
                            <span className="pushTime">{ userNewInfo.pushTime }</span>
                        </div>
                        {/* news信息 */}
                        <div className="newInfo">                           
                            <span className="reprint newInfoItem" title="转发">
                                <Icon type="cloud-upload" className="newInfoIcon" />
                                { userNewInfo.info.reprint }
                            </span>
                            <span className="comment newInfoItem" title="点赞">
                                <Icon type="message" className="newInfoIcon" />
                                { userNewInfo.info.like }
                            </span>
                            <span className="read newInfoItem" title="阅读">
                                <Icon type="like" className="newInfoIcon" />
                                { userNewInfo.info.read }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
