import React, { Component } from 'react';
import UserInfoBox from './userInfoBox/userInfoBox';
import UserNote from './userNote/userNote';
import UserFollow from './userFollow/userFollow';
import UserSetting from './userSetting/userSetting';
import UserFans from './userFans/userFans';
// import CookieController from 'js-cookie';
import { Spin } from 'antd';
import './userPage.less';

export default class userPage extends Component {
    state = {
        curPageIndex: 1,
        curPageIsLoading: true
    }
    hideLoading = () => {
        this.setState({
            curPageIsLoading: false
        })
    }
    showLoading = () => {
        this.setState({
            curPageIsLoading: true
        })
    }
    // 设置当前子菜单index值
    setCurPageIndex = (index) => {
        this.setState({
            curPageIndex: index
        })
    }
    // 根据curPageIndex值切换子菜单
    curPage (curPageIndex) {
        switch (curPageIndex) {
            case 1: return <UserFollow userType={ this.props.type } 
                                       loading={ this.showLoading } 
                                       loaded={ this.hideLoading } />;

            case 2: return <UserFans userType={ this.props.type } 
                                     loading={ this.showLoading } 
                                     loaded={ this.hideLoading } />;

            case 3: return <UserNote userType={ this.props.type }
                                     loading={ this.showLoading } 
                                     loaded={ this.hideLoading } />;

            case 4: return <UserSetting userType={ this.props.type } 
                                        loading={ this.showLoading } 
                                        loaded={ this.hideLoading } />
        
            default: return <UserNote userType={ this.props.type } 
                                      loading={ this.showLoading } 
                                      loaded={ this.hideLoading } />
        }
    }

    render() {
        const { curPageIndex } = this.state;
        const { type } = this.props;
        return (
            <div className="userPageWrapper">
                <div>
                    <UserInfoBox type={ type } setCurPageIndex={ this.setCurPageIndex } />
                </div>
                <div className="selectBox">
                    { this.curPage(curPageIndex) }
                    {/* 加载界面 */}
                    <div className={ `loadingMask ${ !this.state.curPageIsLoading ? "hide" : "" }`}>
                        <Spin size="large" className="curPageIsLoading" />
                    </div>
                </div>
            </div>
        )
    }
}
