import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Menu } from 'antd';
import './leftMenu.less';

export default class LeftMenu extends Component {
    state = {
        isShow: false
    }
    // 移入移出控制菜单栏隐藏与显示
    toggleLeftMenu =  (e) => {
        const nodeName = e.target.nodeName;
        if (!this.state.isShow && (nodeName === "BUTTON" || nodeName === "svg")) return;
        this.changeLeftMenu();
    }
    // 点击控制菜单栏显示与隐藏
    changeLeftMenu = () => {
        this.setState((prevState) => ({
            isShow: !prevState.isShow
        }))
    }

    render() {
        return (
            <div className={ `leftMenuWrapper ${ this.state.isShow ? "show" : "" }` }
                 onMouseLeave={ this.toggleLeftMenu }>
                {/* 路由菜单 */ }
                <Menu
                    style={{ width: 100 }}
                    defaultSelectedKeys={['1']}
                    mode="inline"
                >
                    <Menu.Item key="1">
                        <Link to="/">首页</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/userPage">个人中心</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/campusNews">校园看点</Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to="/hotPointPage">热门话题</Link>
                    </Menu.Item>
                </Menu>
                <button className="showLeftMenuBtn" 
                        onClick={ this.changeLeftMenu }>
                        { this.state.isShow ? <Icon type="left" /> : <Icon type="right" /> }
                </button>
            </div>
        )
    }
}
