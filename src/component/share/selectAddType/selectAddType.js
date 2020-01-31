import React, { Component } from 'react';
import { Icon } from 'antd';
import './selectAddType.less';

export default class selectAddType extends Component {
    state = {
        isShowSelectBox: false
    }
    showSelectBox = () => {
        this.setState({
            isShowSelectBox: true
        })
    }
    hideSelectBox = () => {
        this.setState({
            isShowSelectBox: false
        })
    }
    render() {
        const { isShowSelectBox } = this.state;
        const { selectBigImg, selectNineImg } = this.props.handleFunc;
        return (
            <div className="selectAddType">
                <div className="showSelectBox" 
                        onMouseEnter={ this.showSelectBox }
                        onMouseLeave={ this.hideSelectBox }>
                    
                    {
                        isShowSelectBox ? 
                            <ul className="selectBox">
                                <li className="liItem" onClick={ selectBigImg }>大图</li>
                                <li className="liItem" onClick={ selectNineImg }>九宫格</li>
                            </ul> 
                            :
                            <div className="initBox">
                                <Icon type="folder-add" className="selectBoxIcon" />
                                <p>上传图片</p>
                            </div>
                    }
                    
                </div>
            </div>
        )
    }
}
