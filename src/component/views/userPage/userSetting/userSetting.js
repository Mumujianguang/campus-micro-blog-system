import React, { Component } from 'react';
import { Icon } from 'antd';
import './userSetting.less';

export default class userSetting extends Component {
    state = {
        readOnly: true
    }

    setCanWrite = () => {
        this.setState({
            readOnly: false
        })
    }

    saveUserInfo = () => {
        // 发送请求保存用户信息
        
        //
        this.setState({
            readOnly: true
        })
    }

    componentDidMount () {
        this.props.loaded();
    }
    componentWillUnmount () {
        this.props.loading();
    }

    render() {
        const { readOnly } = this.state;
        const { type } = this.props;
        return (
            <div className="userNote">
                <p className="pageTitle">
                    <Icon type="form" />
                    <span>
                        {
                            type !== "other" ? "设置" : "个人信息"
                        }
                    </span>
                    {
                        type !== "other" ?
                        <>
                            <span className="pageTitleLine"></span>
                            {
                                readOnly ? 
                                    <button className="setUserInfo" onClick={ this.setCanWrite } >编辑</button> :
                                    <button className="setUserInfo" onClick={ this.saveUserInfo } >保存</button>
                            }
                        </> : null
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
                                <input className="itemInput" type="text" disabled={ readOnly }/>
                            </div>
                        </li>
                        <li className="item">
                            <div>
                                <label className="itemLabel" htmlFor="">
                                    <span>真实姓名</span>
                                    <Icon type="user" />
                                </label>
                                <input className="itemInput" type="text" disabled={ readOnly }/>
                            </div>
                        </li>
                        <li className="item">
                            <div>
                                <label className="itemLabel" htmlFor="">
                                    <span>性别</span>
                                    <Icon type="man" />
                                </label>
                                <input className="itemInput" type="text" disabled={ readOnly }/>
                            </div>
                        </li>
                        <li className="item">
                            <div>
                                <label className="itemLabel" htmlFor="">
                                    <span>出生日期</span>
                                    <Icon type="crown" />    
                                </label>
                                <input className="itemInput" type="text" disabled={ readOnly }/>
                            </div>
                        </li>
                        <li className="item">
                            <div>
                                <label className="itemLabel" htmlFor="">
                                    <span>简介</span>
                                    <Icon type="container" />    
                                </label>
                                <textarea id="" className="itemInput userSay" disabled={ readOnly }></textarea>
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
                                <input className="itemInput" type="text" disabled={ readOnly }/>
                            </div>
                        </li>
                        <li className="item">
                            <div>
                                <label className="itemLabel" htmlFor="">
                                    <span>邮箱</span>
                                    <Icon type="mail" />    
                                </label>
                                <input className="itemInput" type="text" disabled={ readOnly }/>
                            </div>
                        </li>
                        <li className="item">
                            <div>
                                <label className="itemLabel" htmlFor="">
                                    <span>联系电话</span>
                                    <Icon type="phone" />    
                                </label>
                                <input className="itemInput" type="text" disabled={ readOnly }/>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            
        )
    }
}
