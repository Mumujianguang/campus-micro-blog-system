import React from 'react';
import CookieController from 'js-cookie';
import UserButton from './userButton/userButton';
import UserAvatar from '@/component/share/userAvatar/userAvatar';
import { Modal } from 'antd';
import { store, boundActions } from '@/redux/index';
import './nav.less';

// 导航条
export default class Nav extends React.Component {
    state = {
        // 是否登录
        loginState: store.getState().loginState,
        // 是否显示用户操作栏
        showUserOperation: false,
        userNick: '',
        userImage: ''
    }

    componentDidMount () {      
        store.subscribe(() => {
            const { userInfo } = store.getState();
            this.setState({
                showUserOperation: false,
                loginState: store.getState().loginState,
                userNick: userInfo.userNick || '',
                userImage: userInfo.userImage || 'http://localhost:3000/static/media/01.4c3cc061.jpg'
            })
        })
    }

    showUserOperation = () => {
        this.setState({
            showUserOperation: true
        })
    }
    hideUserOperation = () => {
        this.setState({
            showUserOperation: false
        })
    }

    // 退出登录
    exit = () => {
        const { confirm } = Modal;
        confirm({
            title: '确定要退出登录吗?',
            content: '多呆一秒, 多一秒开熏嗷',
            okText: '是的，退出！',
            cancelText: '点错辽~',
            onOk() {
                // 清除cookie
                CookieController.remove('userPhone');
                // 分发登录状态为退出
                boundActions.createUpdateLoginState(false);
                // 清空store中的用户数据
                boundActions.createDeleteUserInfo();
            }
        });
    }

    render () {
        const { loginState, showUserOperation, userNick, userImage } = this.state;
        return (
            <div className="navWrapper">
                <div className="title">微校园</div>

                {
                    !loginState ? 
                        <div className="userEnter">
                            <UserButton type="登录" />
                            <UserButton type="注册" />
                        </div>
                        :
                        <div className="userControl"
                             onMouseEnter={ this.showUserOperation }
                             onMouseLeave={ this.hideUserOperation }>
                            <div className="userWrapper">
                                <UserAvatar imgSrc={ userImage } size={ 40 } />
                                <span className="userNick">{ userNick } </span>
                            </div>
                            <div className={`user_operation_list ${ showUserOperation ? "show" : "" }`}>
                                <div className="user_operation_list_item"
                                     onClick={ this.exit }>退出登录</div>
                            </div>
                        </div>
                }
            </div>
        )
    }
}
