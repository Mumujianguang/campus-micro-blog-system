import React from 'react';
import './mask.less';
import Login from '../login/login';
import Register from '../register/register';
import { Drawer, Button } from 'antd';

export default class Mask extends React.Component {

    state = {
        type: this.props.type,
        childType: (this.props.type === "登录" ? "注册" : "登录"),
        visible: this.props.isShowMask, 
        childrenDrawer: false
    };

    componentDidMount() {
        console.log(this.state.childType);
    }

    // 生命周期函数 -- props改变时触发
    UNSAFE_componentWillReceiveProps (nextProps) {
        this.setState({
            visible: nextProps.isShowMask
        })
    }
    // 显示登陆框
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };
    // 关闭登陆框
    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    // 显示注册框
    showChildrenDrawer = () => {
        this.setState({
            childrenDrawer: true,
        });
    };
    // 关闭注册框
    onChildrenDrawerClose = () => {
        this.setState({
            childrenDrawer: false,
        });
    };

    render () {
        return (
            <div className="maskWrapper">
                <Drawer
                    title={ this.state.type }
                    width={600}
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <Button type="primary" onClick={this.showChildrenDrawer}>
                        前往{ this.state.childType }
                    </Button>
                    { this.state.type === "登录" ? <Login /> : <Register /> }
                    
                    <Drawer
                        title={ this.state.childType }
                        width={400}
                        closable={false}
                        onClose={this.onChildrenDrawerClose}
                        visible={this.state.childrenDrawer}
                    >
                        { this.state.type === "登录" ? <Register /> : <Login /> }
                    </Drawer>
                    <div
                        style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e8e8e8',
                        padding: '10px 16px',
                        textAlign: 'right',
                        left: 0,
                        background: '#fff',
                        borderRadius: '0 0 4px 4px',
                        }}
                    >
                        {/* <Button
                            style={{
                                marginRight: 8,
                            }}
                            onClick={this.onClose}
                        >
                            确认
                        </Button> */}
                        <Button onClick={this.onClose} type="primary">
                            返回
                        </Button>
                    </div>
                </Drawer>
            </div>
        )
    }
}