import React, { Component } from 'react';
import { Icon, Spin } from 'antd';
import { store } from '@/redux/index';
import './userInfoBox.less';

export default class userInfoBox extends Component {
    state = {
        userBackgroundLoading: true,
        userImage: '',
        backImage: '',
        userNick: '',
        userSex: 0,
        userSign: '',
        concernNum: '',
        fansNum: '',
        dynamicNum: ''
    }

    updateUserInfo = () => {
        const { userInfo } = store.getState();
        this.setState({
            userImage: userInfo.userImage || "http://pic1.win4000.com/wallpaper/2018-03-23/5ab49ec774e64.jpg" ,
            backImage: userInfo.backImage || require("@/asset/img/01.jpg"),
            userNick: userInfo.userNick || '',
            userSex: parseInt(userInfo.userSex),
            userSign: userInfo.userSign,
            concernNum: userInfo.concernNum || 0,
            fansNum: userInfo.fansNum || 0,
            dynamicNum: userInfo.dynamicNum || 0
        })
    }

    userBackgroundLoadingEvent = (e) => {
        this.setState({
            userBackgroundLoading: false
        })
    }

    componentDidMount () {
        const { type } = this.props;
        if (type !== 'other') {
            this.updateUserInfo();
            store.subscribe(() => {
                this.updateUserInfo();
            })
        }
    }

    render() {
        const { userBackgroundLoading, userImage, backImage, userNick, userSex, userSign, concernNum, fansNum, dynamicNum } = this.state;
        const { setCurPageIndex, type } = this.props;
        return (
            <div className="userInfoBox">
                <div className="userImg">
                    <div className="backgroundImgBox">
                        <img src={ userImage }
                             alt="" 
                             className={ `backgroundImg ${ !userBackgroundLoading ? "backgroundImgShow" : "" }` }
                             onLoad={ this.userBackgroundLoadingEvent } />
                        <Spin size="large" spinning={this.state.userBackgroundLoading } className="loadingIcon" />
                    </div>
                    <img src={ backImage } alt="" className="avatarImg" />
                </div>
                <div className="userNickBox">
                    <span className="userNick">{ userNick }</span> 
                    {
                        userSex ? <Icon type="woman" className="womanIcon" /> : <Icon type="man" className="manIcon" />
                    }
                </div>
                <div className="userSignBox">
                    <span className="userSignTitle">签名：</span>
                    <span className="userSignContent">{ userSign }</span>
                </div>
                <div className="userInfo">
                    <div className="userInfoItem" onClick={ () => { setCurPageIndex(1) }  }>
                        <span>关注</span>
                        <span className="userInfoItemNum">{ concernNum }</span>  
                    </div>
                    <div className="userInfoItem" onClick={ () => { setCurPageIndex(2) }  }>
                        <span>粉丝</span>
                        <span className="userInfoItemNum">{ fansNum }</span>  
                    </div>
                    <div className="userInfoItem" onClick={ () => { setCurPageIndex(3) }  }>
                        <span>动态</span>
                        <span className="userInfoItemNum">{ dynamicNum }</span>  
                    </div>
                    <div className="userInfoItem" onClick={ () => { setCurPageIndex(4) }  }>
                        <span>
                            {
                                type !== "other" ? "设置" : "个人信息"
                            }
                        </span> 
                    </div>
                </div>
            </div>
        )
    }
}
