import React from 'react';
import './login.less';
import { Input, Icon, Button, Checkbox } from 'antd';

export default class Login extends React.Component {
    state = {

    };

    checkUserName = (e) => {
        console.log(e.target.value);
    }

    render () {
        return (
            <div>
                <div className="formItem">
                    <div className="loginIconCircle">
                        <Icon className="loginIcon" type="user" />
                    </div>
                </div>
                <div className="formItem">
                    <Input
                        placeholder="username"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                </div>
                <div className="formItem">
                    <Input
                        placeholder="password(6-18位)"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}
                         />}
                    />
                </div>
                <div className="formItem">
                    <Checkbox>记住我</Checkbox>
                </div>
                <div className="formItem">
                    <Button className="loginModuleButton" type="primary">登录</Button>
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
