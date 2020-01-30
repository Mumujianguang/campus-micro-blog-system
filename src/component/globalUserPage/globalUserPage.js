import React, { Component } from 'react';
import UserPage from '../views/userPage/userPage';
import './globalUserPage.less';
import { boundActions } from '@/redux/index';

export default class globalUserPage extends Component {
    // 点击隐藏用户主页
    hideGlobalUserPage = () => {
        // 分发action
        boundActions.createHideGlobalUserPage()
    }
    render() {
        return (
            <div className="globalUserPage">
                <div className="globalUserPageMask" onClick = { this.hideGlobalUserPage }></div>
                <div className="userPageBox">
                    <UserPage type="other" />
                </div>
            </div>
        )
    }
}
