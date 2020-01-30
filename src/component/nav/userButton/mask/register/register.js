import React from 'react';
import './register.less';
import AlertForm from '../alertForm/alertForm';
import { Input, Icon, Button, Radio } from 'antd';

export default class Register extends React.Component {
    state = {
        userName: "",
        passWord: "",
        confirmPassWord: "",
        eMail: "",
        phone: "",
        sex: 0,
        confirmPassWordInputLock: true,
        userNameAlert: {
            type: "success",
            message: "验证通过",
            visible: false
        },
        passWordAlert: {
            type: "success",
            message: "验证通过",
            visible: false
        },
        confirmPassWordAlert: {
            type: "success",
            message: "验证通过",
            visible: false
        },
        eMailAlert: {
            type: "success",
            message: "验证通过",
            visible: false
        },
        phoneAlert: {
            type: "success",
            message: "验证通过",
            visible: false
        }
    };

    // 重置state
    stateInit =  () => {
        this.setState({
            userName: "",
            passWord: "",
            confirmPassWord: "",
            eMail: "",
            phone: "",
            sex: 0,
            confirmPassWordInputLock: true,
            userNameAlert: {
                type: "success",
                message: "验证通过",
                visible: false
            },
            passWordAlert: {
                type: "success",
                message: "验证通过",
                visible: false
            },
            confirmPassWordAlert: {
                type: "success",
                message: "验证通过",
                visible: false
            },
            eMailAlert: {
                type: "success",
                message: "验证通过",
                visible: false
            },
            phoneAlert: {
                type: "success",
                message: "验证通过",
                visible: false
            }
        })
    }
    // 选择性别
    selectSex = (e) => {
        const curValue = e.target.value;
        this.setState({
            sex: curValue
        })
    }

    /**
     * checkInputContent
     * @param {输入框类型} type 
     * @param {输入框值} value
     * @param {错误提示信息} message 
     * @param {判定错误的规则} warningRule 
     */
    checkInputContent (type, value, message, warningRule) {
        if (warningRule) {
            this.setState({
                [type]: value,
                [`${type}Alert`]: {
                    type: "warning",
                    message,
                    visible: true
                }
            })
            return;
        }
        this.setState({
            [type]: value,
            [`${type}Alert`]: {
                type: "success",
                message: "通过验证",
                visible: true
            }
        })
    }
    // 校验用户名
    checkUserName = (e) => {
        const curValue = e.target.value;
        const warningRule = (curValue === "");
        this.checkInputContent("userName", curValue, "用户名不能为空", warningRule);
    }
    // 校验密码
    checkPassWord = (e) => {
        const curValue = e.target.value;
        if (curValue === "") {
            this.setState({
                passWord: curValue,
                confirmPassWordInputLock: true,
                passWordAlert: {
                    type: "warning",
                    message: "密码不能为空",
                    visible: true
                }
            })
            return;
        }
        if (curValue.length < 6 || curValue.length > 18) {
            this.setState({
                passWord: curValue,
                confirmPassWordInputLock: true,
                passWordAlert: {
                    type: "warning",
                    message: "密码长度不能小于6位或大于18位",
                    visible: true
                }
            })
            return;
        }
        this.setState({
            passWord: curValue,
            confirmPassWordInputLock: false,
            passWordAlert: {
                type: "success",
                message: "通过验证",
                visible: true
            }
        })
    }
    // 校验密码确认
    checkConfirmPassWord = (e) => {
        const curValue = e.target.value;
        const passWord = this.state.passWord;
        const warningRule = (curValue !== passWord);
        this.checkInputContent("confirmPassWord", curValue, "两次密码输入不一致", warningRule);
    }
    // 校验邮箱
    checkEmail = (e) => {
        const curValue = e.target.value;
        const warningRule = curValue.indexOf('@') === -1;
        this.checkInputContent("eMail", curValue, "输入内容与邮箱格式不符", warningRule);
    }
    checkPhone = (e) => {
        const curValue = e.target.value;
        const warningRule = curValue.length !== 11;
        this.checkInputContent("phone", curValue, "输入的手机号码不是11位", warningRule);
    }

    render () {
        const { 
            userName,
            passWord,
            confirmPassWord,
            eMail,
            phone,
            confirmPassWordInputLock,
            userNameAlert, 
            passWordAlert, 
            confirmPassWordAlert, 
            eMailAlert, 
            phoneAlert 
        } = this.state;

        return (
            <div>
                <div className="registerItem">
                    <Input
                        value={ userName }
                        placeholder="username"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={ this.checkUserName }
                    />
                    { userNameAlert.visible ? 
                        <AlertForm type={ userNameAlert.type } message={ userNameAlert.message }  /> : null 
                    }
                </div>
                <div className="registerItem">
                    <Input.Password
                        value={ passWord }
                        placeholder="password"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={ this.checkPassWord }
                    />
                    { passWordAlert.visible ? 
                        <AlertForm type={ passWordAlert.type } message={ passWordAlert.message }  /> : null 
                    }
                </div>
                <div className="registerItem">
                    <Input.Password
                        value={ confirmPassWord }
                        disabled={ confirmPassWordInputLock }
                        placeholder="confirm password"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={ this.checkConfirmPassWord }
                    />
                    { confirmPassWordAlert.visible ? 
                        <AlertForm type={ confirmPassWordAlert.type } message={ confirmPassWordAlert.message }  /> : null 
                    }
                </div>
                <div className="registerItem">
                    <Input
                        value={ eMail }
                        placeholder="e-mail"
                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange = { this.checkEmail }
                    />
                    { eMailAlert.visible ? 
                        <AlertForm type={ eMailAlert.type } message={ eMailAlert.message }  /> : null 
                    }
                </div>
                <div className="registerItem">
                    <Input
                        value={ phone }
                        placeholder="phone"
                        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange = { this.checkPhone }
                    />
                    { phoneAlert.visible ? 
                        <AlertForm type={ phoneAlert.type } message={ phoneAlert.message }  /> : null 
                    }
                </div>
                <div className="registerItem">
                    <Radio.Group className="select_sex" onChange={ this.selectSex } value={this.state.sex}>
                        <Radio value={0}>男</Radio>
                        <Radio value={1}>女</Radio>
                    </Radio.Group>
                </div>

                
                <div className="registerItem">
                    <Button className="registerModuleButton" type="primary">确认</Button>
                </div>
                <div className="registerItem">
                    <Button className="registerModuleButton" type="primary" onClick={ this.stateInit }>重置</Button>
                </div>
            </div>
        )
    }
}