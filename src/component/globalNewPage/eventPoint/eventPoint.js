import React, { Component } from 'react';
import BigImg from '@/component/share/bigImg/bigImg';
import api from '@/api'
import './eventPoint.less'

export default class EventPoint extends Component {
    // 检查图片路径类型
    checkImagePath = (imagePath) => {
        if (imagePath.indexOf("resource\\newsImg") === -1) return imagePath;
        return `${api.apiPath}/getPic?path=${imagePath}`;
    }
    render() {
        const { content, image } = this.props.eventPointItem;
        return (
            <div className="eventPoint">
                <div className="contentText">{ content }</div>
                {
                    image ? <BigImg imgSrc={ this.checkImagePath(image) } width="95%" /> : null
                }
                
            </div>
        )
    }
}
