import React, { Component } from 'react';
import UserAvatar from '../userAvatar/userAvatar';
import CookieController from 'js-cookie';
import api from '@/api/index';
import './commentList.less';
import { Icon, message, Popconfirm } from 'antd';

export default class commentList extends Component {
    state = {
        isShowDelCommentBtn: false,
        dynamicUser: this.props.dynamicUser
    }
    // 检查图片路径类型
    checkImagePath = (filePath) => {
        if (filePath.indexOf("resource\\img") === -1) return filePath;
        return `${api.apiPath}/getPic?path=${filePath}`;
    }

    showDelCommentBtn = () => {
        this.setState({
            isShowDelCommentBtn: true
        })
    }

    hideDelCommentBtn = () => {
        this.setState({
            isShowDelCommentBtn: false
        })
    }

    delComment = () => {
        const targetIndex = this.props.commentList.id;
        this.props.deleteComment(targetIndex);

        api.delComment({
            id: targetIndex
        }).then(result => {
            if (result.data.msg !== "ok") {
                message.error("删除评论异常")
                return;
            }
            message.success("删除成功！")
        })
    }

    render() {
        /**
         * imgSrc: 图片路径
         * userNick: 用户昵称
         * comment: 评论内容
         * commentTime: 评论时间
         */
        const { userImage, userNick, commentTime, commentContent, commentUserPhone } = this.props.commentList;
        const { isShowDelCommentBtn, dynamicUser } = this.state;
        const userPhone = CookieController.get("userPhone");
        // 此条评论是否是当前用户所发
        const isUserComment = userPhone === commentUserPhone;
        // 此条动态的作者是否是当前用户
        const isDynamicUser = userPhone === dynamicUser;
        return (
            <div className="commentItem"
                 onMouseEnter={ this.showDelCommentBtn }
                 onMouseLeave={ this.hideDelCommentBtn }>
                <div className="commentatorInfo">
                    <div className="commentatorUser">
                        <UserAvatar imgSrc={ this.checkImagePath(userImage) } size={ 25 } />
                        <div className="userNick">{ userNick }</div>
                        <div className="commentTime">{ `回复于 ${ commentTime }` }</div>
                    </div>
                    {
                        (isUserComment || isDynamicUser) && isShowDelCommentBtn ? 
                        <div className="delCommentBtn">
                            <Popconfirm
                                title="确定要删除这条评论吗?"
                                onConfirm={ this.delComment }
                                okText="确定"
                                cancelText="取消">
                                <Icon type="close-circle" />
                            </Popconfirm>
                        </div> : null
                    }
                    
                </div>
                <div className="commentContent">
                    <span>{ commentContent }</span> 
                </div>
            </div>
        )
    }
}
