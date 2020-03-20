import React, { Component } from 'react';
import BigImg from '@/component/share/bigImg/bigImg';
import './eventPoint.less'

export default class EventPoint extends Component {
    
    render() {
        const { content, image } = this.props.eventPointItem;
        return (
            <div className="eventPoint">
                <div className="contentText">{ content }</div>
                {
                    image ? <BigImg imgSrc={ image } width="95%" /> : null
                }
                
            </div>
        )
    }
}
