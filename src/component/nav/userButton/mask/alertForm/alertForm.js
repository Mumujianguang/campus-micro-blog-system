import React, { Component } from 'react'
import './alertForm.less';
import { Icon } from 'antd';

export default class AlertForm extends Component {
    state = {

    }

    getAlert () {
        const message = this.props.message;
        switch (this.props.type) {
            case "success": 
                return (
                    <div className="successStyle">
                        <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                        <span>{ message }</span> 
                    </div>
                );
            case "warning": 
                return (
                    <div className="warningStyle">
                        <Icon type="warning" theme="twoTone" twoToneColor="#f5222d" />
                        <span>{ message }</span> 
                    </div>
                );
            default: return <div>{ message }</div>;
        }
    }

    render() {
        return (
            this.getAlert()
        )
    }
}
