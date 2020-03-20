import React, { Component } from 'react';
import { Icon } from 'antd';
import './eventPoint.less';

export default class EventPoint extends Component {
    state = {
        isShowDelBtn: false
    }

    showDelBtn = () => {
        this.setState({
            isShowDelBtn: true
        })
    }
    hideDelBtn = () => {
        this.setState({
            isShowDelBtn: false
        })
    }

    delPoint = () => {
        const { index, delEventPoint } = this.props;
        delEventPoint(index);
    }

    updateNodeContent = (e) => {
        const { value } = e.target;
        const { index, updatePointContent } = this.props;
        updatePointContent(value, index)
    }

    updateNodeImage = (e) => {
        const { files } = e.target;
        const { index, updatePointImage } = this.props;
        updatePointImage(files, index)
    }

    render() {
        const { index, eventPointItem } = this.props;
        const { isShowDelBtn } = this.state;
        return (
            <div className="eventPointItem"
                 onMouseEnter={ this.showDelBtn }
                 onMouseLeave={ this.hideDelBtn }>
                <div className="toolbar">
                    <div className="nodeName">{ `节点${index + 1}` }</div>
                    {
                        isShowDelBtn ? 
                        <div className="delPoint" onClick={ this.delPoint }>
                            <Icon type="close-circle" />
                        </div> : null
                    }
                    
                </div>
                
                <div className="newsContent">
                    <span>内容：</span>
                    <textarea className="contentText" 
                              value={ eventPointItem.content }
                              onChange={ this.updateNodeContent }></textarea>
                </div>
                <div className="newsImage">
                    <span>图片：</span>
                    <input type="file" 
                           onChange={ this.updateNodeImage } />
                </div>
            </div>
        )
    }
}
