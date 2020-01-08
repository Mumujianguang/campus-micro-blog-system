import React from 'react';
import './register.less';
import { Input, Icon, Button, Radio, Alert } from 'antd';

export default class Register extends React.Component {
    state = {

    };

    checkUserName (e) {
        console.log();
        const curValue = e.target.value;
        if (curValue === "") {

        }
    }

    render () {
        return (
            <div>
                <div className="registerItem">
                    <Input
                        placeholder="username"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onBlur={ this.checkUserName }
                    />
                    <Alert message="Warning Text" type="warning" />
                </div>
                <div className="registerItem">
                    <Input.Password
                        placeholder="password"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                </div>
                <div className="registerItem">
                    <Input.Password
                        placeholder="confirm password"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                </div>
                <div className="registerItem">
                    <Input
                        placeholder="e-mail"
                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                </div>
                <div className="registerItem">
                    <Input
                        placeholder="phone"
                        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                </div>
                <div className="registerItem">
                    <Radio.Group className="select_sex">
                        <Radio value={0}>男</Radio>
                        <Radio value={1}>女</Radio>
                    </Radio.Group>
                </div>

                
                <div className="registerItem">
                    <Button className="registerModuleButton" type="primary">确认</Button>
                </div>
                <div className="registerItem">
                    <Button className="registerModuleButton" type="primary">重置</Button>
                </div>
            </div>
        )
    }
}