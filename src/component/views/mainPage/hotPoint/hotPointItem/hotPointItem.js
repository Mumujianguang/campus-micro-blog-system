import React, { Component } from 'react';
import api from '@/api';
import './hotPointItem.less';

export default class hotPointItem extends Component {
    
    // 检查图片路径类型
    checkImagePath = (imagePath) => {
        if (imagePath.indexOf("resource\\img") === -1) return imagePath;
        return `${api.apiPath}/getPic?path=${imagePath}`;
    }

    render() {
        const { title, img, text } = this.props.hotPointItemInfo;
        return (
            <div className="hotPointItemStyle">
                <div className="itemImgBox">
                    <img src={ this.checkImagePath(img) } alt="" className="itemImg"/>
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
