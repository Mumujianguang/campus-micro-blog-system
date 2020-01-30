import React, { Component } from 'react';
import { Icon } from 'antd';
import './blankContent.less';

export default class blankContent extends Component {
    static defaultProps = {
        width: "150px",
        height: "150px",
        fontSize: "80px"
    }
    render() {
        const { width, height, fontSize } = this.props;
        return (
            <div className="blackContent">
                <div className="centerInfoBox" style={{ width, height }}>
                    <Icon type="info-circle" className="centerIcon" style={{ fontSize }} />
                    <p className="centerInfo">暂无数据</p>
                </div>
            </div>
        )
    }
}
