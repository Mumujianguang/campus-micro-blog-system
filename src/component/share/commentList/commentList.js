import React, { Component } from 'react';
import UserAvatar from '../userAvatar/userAvatar';
import './commentList.less';

export default class commentList extends Component {
    render() {
        /**
         * imgSrc: 图片路径
         * userNick: 用户昵称
         * comment: 评论内容
         * commentTime: 评论时间
         */
        const { imgSrc, userNick, commentTime, comment } = this.props.commentList;
        return (
            <div className="commentItem">
                <div className="commentatorInfo">
                    <UserAvatar imgSrc={ imgSrc } size={ 25 } />
                    <div className="userNick">{ userNick }</div>
                    <div className="commentTime">{ `回复于 ${ commentTime }` }</div>
                </div>
                <div className="commentContent">{ comment }</div>
            </div>
        )
    }
}
