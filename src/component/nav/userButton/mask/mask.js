import React from 'react';
import Login from './login/login';
import Register from './register/register';
import { Drawer, Button } from 'antd';
import './mask.less';

export default class Mask extends React.Component {

    state = {
        type: this.props.type,
        childType: (this.props.type === "登录" ? "注册" : "登录"), 
        childrenDrawer: false
    };

    componentDidMount() {
        console.log(this.state.childType);
    }
    
    // 关闭一级框
    onClose = () => {
        this.props.onHideMask();
    };
    // 显示二级框
    showChildrenDrawer = () => {
        this.setState({
            childrenDrawer: true,
        });
    };
    // 关闭二级框
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
                    width={400}
                    closable={false}
                    onClose={this.onClose}
                    visible={this.props.isShowMask}
                >
                    <Button type="primary" onClick={this.showChildrenDrawer}>
                        前往{ this.state.childType }
                    </Button>
                    { this.state.type === "登录" ? <Login /> : <Register /> }
                    
                    <Drawer
                        title={ this.state.childType }
                        width={300}
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
                        <Button onClick={this.onClose} type="primary">
                            返回
                        </Button>
                    </div>
                </Drawer>
            </div>
        )
    }
}