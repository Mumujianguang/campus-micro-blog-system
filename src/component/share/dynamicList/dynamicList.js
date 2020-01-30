import React, { Component } from 'react';
import UserAvatar from '../userAvatar/userAvatar';
import CommentList from '../commentList/commentList';
import NineImg from '../nineImg/nineImg';
import BigImg from '../bigImg/bigImg';
import './dynamicList.less';

export default class dynamicList extends Component {
    state = { 
        isComment: false, // 控制回复框的显示/隐藏
        commentContent: "" // 回复框内容
    }
    // 显示回复框
    showCommentBox =  () => {
        this.setState({
            isComment: true
        })
    }
    // 隐藏回复框
    hideCommentBox = () => {
        this.setState({
            isComment: false
        })
    }
    // 更新回复框的值
    updateCommentContent = (e) => {
        this.setState({
            commentContent: e.target.value
        })
    }
    // 提交回复
    commentSubmit = () => {
        console.log(this.state.commentContent);
        this.hideCommentBox();
    }

    // 根据type值确定组件
    getComponent = () => {
        const { type, content } = this.props.dynamicItem;
        switch (type) {
            case 'text':
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
        const { isComment, commentContent } = this.state;
        const { imgSrc, userNick, releaseTime, content, readNum, likeNum, commentList } = this.props.dynamicItem;
        return (
            <div className="dynamicItem">
                {/* 动态的顶部信息 */}
                <div className="dynamicFrom">
                    <UserAvatar imgSrc={ imgSrc } size={ 40 }  />
                    <div className="user">
                        <span className="userNick">{ userNick }</span>
                        <span className="releaseTime">{ `发布于${ releaseTime }` }</span>
                    </div>
                </div>
                {/* 是否转发 */}
                <div className="isRef">
                    <span className="refText">转发自</span>
                    <span className="userNick">{ userNick }</span>
                    <span className="releaseTime">{ `发布于${ releaseTime }` }</span>
                </div>
                {/* 动态的内容 */}
                <div className="dynamicContent">
                    <div className="text">
                        <div className="textContent">{ content.text }</div>
                        {
                            this.getComponent()
                        }
                    </div>
                    
                    <div className="dynamicBottom">
                        <button className="dynamicBtn">转发</button>
                        <button className="dynamicBtn" onClick={ this.showCommentBox }>留言</button>
                        <button className="dynamicBtn">{ `阅读 ${ readNum }` }</button>
                        <button className="dynamicBtn">{ `点赞 ${ likeNum }` }</button>
                    </div>
                    {
                        isComment ?
                        <div className="commentInput">
                            <div className="commentator">
                                <UserAvatar imgSrc={ imgSrc } size={ 30 } />
                                <div className="userNick">{ userNick }</div>
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
                            <CommentList commentList={ item } key={ index } />
                        ))
                    }
                </div>
            </div>
        )
    }
}
