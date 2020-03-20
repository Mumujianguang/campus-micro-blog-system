import React from 'react';
import './login.less';
import { Input, Icon, Button, Checkbox, message } from 'antd';
import { boundActions, store } from '@/redux/index';
import CookieController from 'js-cookie';
import { withRouter } from 'react-router-dom';
import api from '@/api/index';

class Login extends React.Component {
    state = {
        loginIdentity: 'user',
        userPhone: '',
        password: '',
        autoLogin: store.getState().autoLogin
    };

    changeLoginIdentity = (e) => {
        const { value } = e.target;
        this.setState({
            loginIdentity: value
        })
    }

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

    userLogin = () => {
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
            .then(result => {
                const { msg, data } = result.data;
                if (msg === 'login success') {
                    // 分发登录状态
                    boundActions.createUpdateLoginState(true);
                    // 初始化用户信息
                    boundActions.createInitUserInfo(data[0]);
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

    adminLogin = () => {
        const { userPhone, password } = this.state;
        if (!userPhone || !password) {
            message.info("请输入管理员账号或密码！")
            return;
        }
        api.adminLogin({
            username: userPhone, 
            password
        }).then(result => {
            if (result.data.msg !== 'ok') {
                message.error("登录失败！账号或密码错误")
                return;
            }
            message.success("登录成功！")
            this.props.history.push("/admin")
        })
    }

    render () {
        const { loginIdentity, autoLogin, userPhone, password } = this.state;
        const isUser = loginIdentity === "user";
        return (
            <div>
                <div className="formItem">
                    <div className="loginIconCircle">
                        <Icon className="loginIcon" type="user" />
                    </div>
                </div>
                <div className="formItem">
                    <select className="loginIdentity" value={ loginIdentity } onChange={ this.changeLoginIdentity }>
                        <option className="logingIdentityItem" value="user">用户登录</option>
                        <option className="logingIdentityItem" value="admin">管理员登录</option>
                    </select>
                </div>
                <div className="formItem">
                    <Input
                        value={ userPhone }
                        onChange={ this.updateUserPhoneInp }
                        placeholder={ isUser ? "手机号" : "管理员账号" }
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                </div>
                <div className="formItem">
                    <Input.Password
                        value={ password }
                        onChange={ this.updatePwdInp }
                        placeholder="密码"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                </div>
                {
                    isUser ?
                    <div className="formItem">
                        <Checkbox checked={ autoLogin } onClick={ this.changeCheck }>记住我</Checkbox>
                    </div> : null
                }
                <div className="formItem">
                    <Button className="loginModuleButton" 
                        type="primary"
                        onClick={ isUser ? this.userLogin : this.adminLogin }>登录</Button>  
                </div>
                <div className="formItem">
                    <Button className="loginModuleButton" type="primary">重置</Button>
                </div>
                {
                    isUser ? 
                    <div className="formItem">
                        <Button className="loginModuleButton" type="primary">忘记密码</Button>
                    </div> : null
                }
                
            </div>
        );
    }
}

export default withRouter(Login)
