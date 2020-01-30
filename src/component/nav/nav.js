import React from 'react';
import UserButton from './userButton/userButton';
import './nav.less';

// 导航条
export default class Nav extends React.Component {
    constructor (prop) {
        super();
    }

    render () {
        return (
            <div className="navWrapper">
                <div className="title">微校园</div>
            
                <div className="userEnter">
                    <UserButton type="登录" />
                    <UserButton type="注册" />
                </div>
            </div>
        )
    }
}
