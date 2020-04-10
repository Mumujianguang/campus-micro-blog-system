import React, { Component, Fragment } from 'react';
import { Icon, Radio, message } from 'antd';
import CookieController from 'js-cookie';
import { boundActions, store } from '@/redux/index';
import api from '@/api/index';
import './userSetting.less';

export default class userSetting extends Component {
    state = {
        readOnly: true,
        userNick: '',
        userName: '',
        userSex: 0,
        userAge: '',
        userSign: '',
        QQ: '',
        email: ''
    }

    updataUserInfo = () => {
        let { userInfo } = store.getState();
        this.setState({
            userNick: userInfo.userNick || '',
            userName: userInfo.userName || '',
            userSex: parseInt(userInfo.userSex) || 0,
            userAge: userInfo.userAge || '',
            userSign: userInfo.userSign || '',
            QQ: userInfo.QQ || '',
            email: userInfo.email || ''
        })
    }

    initGlobalUserInfo = () => {
        const { globalUserInfo } = store.getState();
        this.setState({
            userNick: globalUserInfo.userNick || '',
            userName: globalUserInfo.userName || '',
            userSex: parseInt(globalUserInfo.userSex) || 0,
            userAge: globalUserInfo.userAge || '',
            userSign: globalUserInfo.userSign || '',
            QQ: globalUserInfo.QQ || '',
            email: globalUserInfo.email || ''
        })
    }

    componentDidMount () {
        this.props.loaded();
        const { userType } = this.props;
        if (userType !== "other") {
            this.updataUserInfo()
            // store中userInfo变化时更新数据
            store.subscribe(() => {
                this.updataUserInfo()
            })
            return;
        }
        this.initGlobalUserInfo();
        // store.subscribe(() => {
        //     this.initGlobalUserInfo();
        // })
    }

    UNSAFE_componentWillMount () {
        this.props.loading();
    }

    changeUserNick = (e) => {
        const { value } = e.target;
        this.setState({
            userNick: value
        })
    }
    changeUserName = (e) => {
        const { value } = e.target;
        this.setState({
            userName: value
        })
    }
    changeUserAge = (e) => {
        const { value } = e.target;
        this.setState({
            userAge: value
        })
    }
    changeUserSex = (e) => {
        const { value } = e.target;
        this.setState({
            userSex: value
        })
    }
    changeUserSign = (e) => {
        const { value } = e.target;
        this.setState({
            userSign: value
        })
    }
    changeQQ = (e) => {
        const { value } = e.target;
        this.setState({
            QQ: value
        })
    }
    changeEmail = (e) => {
        const { value } = e.target;
        this.setState({
            email: value
        })
    }
    

    setCanWrite = () => {
        this.setState({
            readOnly: false
        })
    }

    saveUserInfo = () => {
        let { userNick, userName, userSex, userAge, userSign, QQ, email } = this.state;
        const userPhone = CookieController.get('userPhone');
        if (email.indexOf('@') === -1) {
            message.warning('邮箱格式不正确！');
            return;
        }
        // 发送请求保存用户信息
        userAge = parseInt(userAge);
        QQ = parseInt(QQ);
        const updateUserInfo = {
            userNick, 
            userName, 
            userSex, 
            userAge, 
            userSign, 
            QQ, 
            email
        }
        api.setUserInfo({userPhone, ...updateUserInfo})
            .then(result => {
                const { msg } = result.data;
                if (msg !== 'ok') {
                    message.error('更新信息失败！');
                    return;
                }
                message.success('更新信息成功！');
                // 分发更新后的用户信息，同步store中的数据
                boundActions.createUpdateUserInfo(updateUserInfo);
            })
        //
        this.setState({
            readOnly: true
        })
    }

    

    render() {
        const { readOnly, userNick, userName, userSex, userAge, userSign, QQ, email } = this.state;
        const { userType } = this.props;
        return (
            <div className="userNote">
                <p className="pageTitle">
                    <Icon type="form" />
                    <span>
                        {
                            userType !== "other" ? "设置" : "个人信息"
                        }
                    </span>
                    {
                        userType !== "other" ?
                        <Fragment>
                            <span className="pageTitleLine"></span>
                            {
                                readOnly ? 
                                    <button className="setUserInfo" onClick={ this.setCanWrite } >编辑</button> :
                                    <button className="setUserInfo" onClick={ this.saveUserInfo } >保存</button>
                            }
                        </Fragment> : null
                    }
                </p>
                <div className="userNoteBox">
                    <ul className="infoType">
                        <p className="title">基本信息</p>
                        <li className="item">
                            <div>
                                <label className="itemLabel" htmlFor="">
                                    <span>昵称</span>
                                    <Icon type="meh" />
                                </label>
                                <input className="itemInput" 
                                       type="text" 
                                       disabled={ readOnly }
                                       value={ userNick }
                                       onChange={ this.changeUserNick } />
                            </div>
                        </li>
                        <li className="item">
                            <div>
                                <label className="itemLabel" htmlFor="">
                                    <span>真实姓名</span>
                                    <Icon type="user" />
                                </label>
                                <input className="itemInput" 
                                       type="text" 
                                       disabled={ readOnly }
                                       value={ userName }
                                       onChange={ this.changeUserName } />
                            </div>
                        </li>
                        <li className="item">
                            <div>
                                <label className="itemLabel" htmlFor="">
                                    <span>性别</span>
                                    <Icon type="man" />
                                </label>
                                <Radio.Group className="itemInput" 
                                             disabled={ readOnly }
                                             value={ userSex }
                                             onChange={ this.changeUserSex } >
                                    <Radio value={0}>男</Radio>
                                    <Radio value={1}>女</Radio>
                                </Radio.Group>
                            </div>
                        </li>
                        <li className="item">
                            <div>
                                <label className="itemLabel" htmlFor="">
                                    <span>年龄</span>
                                    <Icon type="crown" />    
                                </label>
                                <input className="itemInput" 
                                       type="text" 
                                       disabled={ readOnly }
                                       value={ userAge }
                                       onChange={ this.changeUserAge } />
                            </div>
                        </li>
                        <li className="item">
                            <div>
                                <label className="itemLabel" htmlFor="">
                                    <span>简介</span>
                                    <Icon type="container" />    
                                </label>
                                <textarea id="" 
                                          className="itemInput userSay" 
                                          disabled={ readOnly }
                                          value={ userSign }
                                          onChange={ this.changeUserSign }></textarea>
                            </div>
                        </li>
                    </ul>
                    <ul className="infoType">
                        <p className="title">联系信息</p>
                        <li className="item">
                            <div>
                                <label className="itemLabel" htmlFor="">
                                    <span>QQ</span>
                                    <Icon type="qq" />    
                                </label>
                                <input className="itemInput" 
                                       type="text" 
                                       disabled={ readOnly }
                                       value={ QQ }
                                       onChange={ this.changeQQ } />
                            </div>
                        </li>
                        <li className="item">
                            <div>
                                <label className="itemLabel" htmlFor="">
                                    <span>邮箱</span>
                                    <Icon type="mail" />    
                                </label>
                                <input className="itemInput" 
                                       type="text" 
                                       disabled={ readOnly }
                                       value={ email }
                                       onChange={ this.changeEmail } />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            
        )
    }
}
