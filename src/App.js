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
import api from '@/api/index';

export default class App extends React.Component {
    state = {
        isShowGlobalUserPage: store.getState().isShowGlobalUserPage
    }
    componentDidMount () {
        store.subscribe(() => {
            this.updateGlobalUserPage()
        })
        const phone = CookieController.get("userPhone")
        if (phone) {
            // 存在cookie，将状态设置为自动登录
            boundActions.createUpdateLoginMode(true);
            // 将登录状态设置为登录
            boundActions.createUpdateLoginState(true);
            // 获取用户信息数据
            api.selectUserInfo(phone)
                .then(result => {
                    const { data } = result.data;
                    console.log(result);
                    boundActions.createInitUserInfo(data[0]);
                })
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
