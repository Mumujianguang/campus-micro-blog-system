import React, { Fragment } from 'react';
import { Button } from 'antd';
import Mask from './mask/mask';

// 登录/注册按钮组件
export default class UserButton extends React.Component {
    constructor (prop) {
        super();
        this.state = {
            type: prop.type,
            isShowMask: false
        };
    }

    showMask = () => {
        this.setState({
            isShowMask: true
        })
    }

    hideMask = () => {
        this.setState({
            isShowMask: false
        })
    }

    render () {
        return (
            <Fragment>
                <Button 
                    className="userButton" 
                    type="primary"
                    onClick={ this.showMask }
                    >
                    { this.state.type }
                </Button>
                <Mask  
                    type={ this.state.type } 
                    isShowMask={ this.state.isShowMask } 
                    onHideMask={ this.hideMask }
                />
            </Fragment>
        )
    }
}