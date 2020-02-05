import React from 'react';
import './login.less';
import { Input, Icon, Button, Checkbox, message } from 'antd';
import { boundActions, store } from '@/redux/index';
import CookieController from 'js-cookie';
import api from '@/api/index';

export default class Login extends React.Component {
    state = {
        userPhone: '',
        password: '',
        autoLogin: store.getState().autoLogin
    };

    changeCheck = (e) => {
        this.setState(prevState => ({
            autoLogin: !prevState.autoLogin
        }), () => {
            // 分发更新后的登录模式到store
            boundActions.createUpdateLoginMode(this.state.autoLogin);
        })
    }

    updateUserPhoneInp = (e) => {
        const newValue = e.target.value;
        this.setState({
            userPhone: newValue
        })
    }

    updatePwdInp = (e) => {
        const newValue = e.target.value;
        this.setState({
            password: newValue
        })
    }

    login = () => {
        const { userPhone, password } = this.state;
        if (userPhone === '' || password === '') {
            message.warning('未输入手机号或密码！');
            return;
        }
        if (userPhone.length !== 11) {
            message.warning('您输入的手机号位数不是11位嗷！');
            return;
        }
        api.login(userPhone, password)
            .then(data => {
                const msg = data.data.msg;
                console.log(msg);
                if (msg === 'login success') {
                    // 分发登录状态
                    boundActions.createUpdateLoginState(true);
                    // 设置cookie
                    CookieController.set("userPhone", userPhone, { expires: 1 });
                    // 提示
                    message.success("登录成功！");
                    return;
                }

                if (msg === 'the user is not exit') {
                    message.error('登录失败：该手机号未注册！')
                } else {
                    message.error('登录失败：手机号或密码错误！')
                }
            })
    }

    render () {
        const { autoLogin, userPhone, password } = this.state;
        return (
            <div>
                <div className="formItem">
                    <div className="loginIconCircle">
                        <Icon className="loginIcon" type="user" />
                    </div>
                </div>
                <div className="formItem">
                    <Input
                        value={ userPhone }
                        onChange={ this.updateUserPhoneInp }
                        placeholder="手机号"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                </div>
                <div className="formItem">
                    <Input
                        value={ password }
                        onChange={ this.updatePwdInp }
                        placeholder="密码"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                </div>
                <div className="formItem">
                    <Checkbox checked={ autoLogin } onClick={ this.changeCheck }>记住我</Checkbox>
                </div>
                <div className="formItem">
                    <Button className="loginModuleButton" 
                            type="primary"
                            onClick={ this.login }>登录</Button>
                </div>
                <div className="formItem">
                    <Button className="loginModuleButton" type="primary">重置</Button>
                </div>
                <div className="formItem">
                    <Button className="loginModuleButton" type="primary">忘记密码</Button>
                </div>
            </div>
        );
    }
}
