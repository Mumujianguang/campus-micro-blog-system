import React, { Component } from 'react';
import { Icon } from 'antd';
import './userNewItem.less';

export default class userNewItem extends Component {
    render() {
        const { userNewInfo } = this.props;
        return (
            <div className="userNewItemStyle">
                <div className="newImg">
                    <img src={ userNewInfo.img } alt="" className="img" />
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
                            <img src={ userNewInfo.user.avatarImg } alt="" className="userAvatar" />
                            <span className="nick">{ userNewInfo.user.nick }</span>
                            <span className="pushTime">{ userNewInfo.pushTime }</span>
                        </div>
                        {/* news信息 */}
                        <div className="newInfo">                           
                            <span className="reprint newInfoItem" title="转发">
                                <Icon type="cloud-upload" className="newInfoIcon" />
                                { userNewInfo.info.reprint }
                            </span>
                            <span className="comment newInfoItem" title="评论">
                                <Icon type="message" className="newInfoIcon" />
                                { userNewInfo.info.comment }
                            </span>
                            <span className="read newInfoItem" title="点赞">
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
