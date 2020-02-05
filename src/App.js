import './App.less';
import 'antd/dist/antd.css';
import React from 'react';
import Nav from './component/nav/nav';
import Content from './component/content/content';
import LeftMenu from './component/leftMenu/leftMenu';
import GlobalUserPage from './component/globalUserPage/globalUserPage';
import CookieController from 'js-cookie';
import { boundActions, store } from '@/redux/index';
import { BrowserRouter } from 'react-router-dom';

export default class App extends React.Component {
    state = {
        isShowGlobalUserPage: store.getState().isShowGlobalUserPage
    }
    componentDidMount () {
        store.subscribe(() => {
            this.updateGlobalUserPage()
        })
        if (CookieController.get("userPhone")) {
            // 存在cookie，将状态设置为自动登录
            boundActions.createUpdateLoginMode(true);
            // 将登录状态设置为登录
            boundActions.createUpdateLoginState(true);
        }
    }
    
    updateGlobalUserPage = () => {
        this.setState({
            isShowGlobalUserPage: store.getState().isShowGlobalUserPage
        })
    }
    
    render () {
        const { isShowGlobalUserPage } = this.state;
        return (
            <div className="appWrapper">
                <div className="header">
                    <Nav />
                </div>
                {/* content路由 */}
                <BrowserRouter basename="/">
                    <div className="content">
                        <Content />
                    </div>
                    <div className="leftMenu">
                        <LeftMenu />
                    </div>
                </BrowserRouter>
                {
                    isShowGlobalUserPage ? 
                        <GlobalUserPage /> : null
                }
                
            </div>
        );
    }
}
