import React, { Component } from 'react';
import UserAvatar from '../userAvatar/userAvatar';
import CommentList from '../commentList/commentList';
import CookieController from 'js-cookie';
import tools from '@/tools/index';
import NineImg from '../nineImg/nineImg';
import BigImg from '../bigImg/bigImg';
import { store, boundActions } from '@/redux';
import api from '@/api/index';
import uuid from 'uuid';
import './dynamicList.less';
import { message, Popconfirm } from 'antd';

export default class dynamicList extends Component {
    state = { 
        isComment: false, // 控制回复框的显示/隐藏
        commentUserNick: "", // 回复框用户昵称
        commentUserImage: "", // 回复框用户头像
        commentContent: "", // 回复框内容
        ...this.props.dynamicItem
    }
    // 显示回复框
    showCommentBox =  () => {
        // 如果没有登录则不能评论
        const userPhone = CookieController.get("userPhone");
        if (!userPhone) {
            message.info("登录后才能评论嗷");
        }
        const { userNick, userImage } = store.getState().userInfo;
        this.setState({
            isComment: true,
            commentUserNick: userNick,
            commentUserImage: userImage
        })
    }
    // 隐藏评论框
    hideCommentBox = () => {
        this.setState({
            isComment: false
        })
    }
    // 更新评论框的值
    updateCommentContent = (e) => {
        this.setState({
            commentContent: e.target.value
        })
    }
    // 提交评论
    commentSubmit = () => {
        const { id: dynamicId, commentContent, commentUserNick, commentUserImage, commentList } = this.state;
        if (commentContent === "") {
            message.info("请先输入评论！");
            return;
        }
        const commentUserPhone = CookieController.get("userPhone");
        const commentTime = tools.getCurTime();
        const paramsData = {
            id: uuid(),
            dynamicId,
            commentUserPhone,
            commentContent,
            commentTime
        }
        api.pushComment(paramsData).then(result => {
            const { msg } = result.data;
            if (msg !== "ok") {
                message.error("评论失败！")
            }
            message.success("评论成功！")
            // 更新评论信息
            commentList.push({
                ...paramsData,
                userNick: commentUserNick,
                userImage: commentUserImage
            })
            this.setState({
                commentContent: "",
                commentList
            })
            this.hideCommentBox();
        })
        
    }

    // 删除评论
    deleteComment = (id) => {
        const { commentList } = this.state;
        const targetIndex = commentList.findIndex(item => item.id === id);

        if (targetIndex === -1) return;
        commentList.splice(targetIndex, 1);

        this.setState({
            commentList
        })
    }

    // 转发动态
    confirmRef = () => {
        const { userPhone: dynamicUserPhone } = this.state;
        const userPhone = CookieController.get("userPhone");
        if (dynamicUserPhone === userPhone) {
            message.info("不能转发自己的动态蛤！");
            return;
        }
        
        const {type, topic, userNick, releaseTime, content, forward_num, refFrom } = this.state;

        const newDynamicUuid = uuid();
        const paramsData = {
            topic,
	        id: newDynamicUuid,
	        type,
	        phone: userPhone,
	        push_date: tools.getCurTime(),
	        content: content.text,
	        read_num: 0,
	        like_num: 0,
	        forward_num,
	        from_user: refFrom.userNick ? refFrom.userNick : userNick,
	        from_releasetime: refFrom.releaseTime ? refFrom.releaseTime : releaseTime
        }
        api.refDynamic(paramsData).then(result => {
            if (result.data.msg !== 'ok') {
                message.error("转发遇到错误啦~");
                return;
            }
            // 转发成功后图片信息
            if (type === 'bigImg') {
                api.saveBigImage({
                    id: newDynamicUuid,
                    src: content.imgSrc
                })
            }
            if (type === 'nineImg') {
                api.saveNineImg({
                    id: newDynamicUuid,
                    srcArr: content.imgSrcArr
                })
            }
            message.success("转发成功！");
            boundActions.createUpdateUserDynamicNum();
        })
    }

    // 点赞
    likeTimer = null;
    likeStatus = false;
    like = () => {
        let { id, likeNum } = this.state;
        if (this.likeStatus) {
            message.warning("您已经点过赞啦！");
            return;
        }
        api.addLike({ id, likeNum: ++likeNum })
            .then(result => {
                console.log(result);
                const { msg } = result.data;
                if (msg === 'ok') {
                    this.likeStatus = true;
                    this.setState({
                        likeNum: likeNum
                    })
                }
            })
    }

    // 检查图片路径类型
    checkImagePath = (filePath) => {
        if (filePath.indexOf("resource\\img") === -1) return filePath;
        return `${api.apiPath}/getPic?path=${filePath}`;
    }

    // 根据type值确定组件
    getComponent = () => {
        const { type, content } = this.props.dynamicItem;
        switch (type) {
            case 'init':
                return null;
            case 'bigImg':
                return <BigImg imgSrc={ content.imgSrc } />;
            case 'nineImg':
                return <NineImg imgSrcArr={ content.imgSrcArr } />
            default:
                return null;
        }
    }
    
    render() {
        const { 
            isComment, 
            commentContent, 
            commentUserNick, 
            commentUserImage, 
            topic, 
            imgSrc, 
            userNick, 
            userPhone,
            releaseTime, 
            content, 
            readNum, 
            likeNum, 
            commentList, 
            refFrom 
        } = this.state;
        return (
            <div className="dynamicItem">
                {/* 动态的顶部信息 */}
                <div className="dynamicFrom">
                    <UserAvatar imgSrc={ this.checkImagePath(imgSrc) } size={ 40 } userPhone={ userPhone }  />
                    <div className="user">
                        <span className="userNick">{ userNick }</span>
                        <span className="releaseTime">{ `发布于${ releaseTime }` }</span>
                    </div>
                    <div className="fromTopic">
                        <span className="fromTopicText">From</span>
                        <span className="topic">{ `#${ topic }#` }</span>
                    </div>
                </div>
                {/* 是否转发 */}
                {
                    refFrom.userNick ? 
                        <div className="isRef">
                            <span className="refText">转发自</span>
                            <span className="userNick">{ refFrom.userNick }</span>
                            <span className="releaseTime">{ `发布于${ refFrom.releaseTime }` }</span>
                        </div> : null
                }
                
                {/* 动态的内容 */}
                <div className="dynamicContent">
                    <div className="text">
                        <div className="textContent">{ content.text }</div>
                        {
                            this.getComponent()
                        }
                    </div>
                    
                    <div className="dynamicBottom">
                        <button className="dynamicBtn">
                            <Popconfirm
                                title="确定要转发这条动态吗?"
                                onConfirm={ this.confirmRef }
                                okText="确定"
                                cancelText="取消">
                                <span>转发</span>
                            </Popconfirm>
                        </button>
                        <button className="dynamicBtn" onClick={ this.showCommentBox }>留言</button>
                        <button className="dynamicBtn">{ `阅读 ${ readNum }` }</button>
                        <button className="dynamicBtn" onClick={ this.like } >{ `点赞 ${ likeNum }` }</button>
                    </div>
                    {
                        isComment ?
                        <div className="commentInput">
                            <div className="commentator">
                                <UserAvatar imgSrc={ this.checkImagePath(commentUserImage) } size={ 30 } />
                                <div className="userNick">{ commentUserNick }</div>
                            </div>
                            <textarea className="commentText" 
                                      value={ commentContent }
                                      onChange={ this.updateCommentContent }></textarea>
                            <div className="commentBox">
                                <button className="commentSubmit commentBtn" onClick={ this.commentSubmit }>确定</button>
                                <button className="commentCancel commentBtn" onClick={ this.hideCommentBox }>取消</button>
                            </div>
                        </div> : null
                    }
                    
                </div>
                {/* 留言区内容 */}
                <div className="dynamicComment">
                    {
                        commentList.map((item, index) => (
                            <CommentList 
                                commentList={ item } 
                                key={ index } 
                                dynamicUser={ userPhone } 
                                deleteComment={ this.deleteComment } />
                        ))
                    }
                </div>
            </div>
        )
    }
}
