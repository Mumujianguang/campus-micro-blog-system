import React, { Component } from 'react';
import './hotPointItem.less';

export default class hotPointItem extends Component {
    
    render() {
        const { title, img, text } = this.props.hotPointItemInfo;
        return (
            <div className="hotPointItemStyle">
                <div className="itemImgBox">
                    <img src={ img } alt="" className="itemImg"/>
                </div>
                <div className="itemText">
                    <p className="itemTitle">{ `#${ title }#` }</p>
                    <div className="itemInfo">
                        <span className="itemComment">{ `${ text.comment }人评论` }</span>
                        <span className="itemRead">{ `${ text.read }人阅读` }</span>
                    </div>
                </div>
            </div>
        )
    }
}
