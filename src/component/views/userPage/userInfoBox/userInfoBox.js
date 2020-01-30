import React, { Component } from 'react';
import { Icon, Spin } from 'antd';
import './userInfoBox.less';

export default class userInfoBox extends Component {
    state = {
        userBackgroundLoading: true
    }

    userBackgroundLoadingEvent = (e) => {
        this.setState({
            userBackgroundLoading: false
        })
    }

    render() {
        const { userBackgroundLoading } = this.state;
        const { setCurPageIndex, type } = this.props;
        return (
            <div className="userInfoBox">
                <div className="userImg">
                    <div className="backgroundImgBox">
                        <img src="http://pic1.win4000.com/wallpaper/2018-03-23/5ab49ec774e64.jpg" 
                             alt="" 
                             className={ `backgroundImg ${ !userBackgroundLoading ? "backgroundImgShow" : "" }` }
                             onLoad={ this.userBackgroundLoadingEvent } />
                        <Spin size="large" spinning={this.state.userBackgroundLoading } className="loadingIcon" />
                    </div>
                    <img src={require("@/asset/img/01.jpg")} alt="" className="avatarImg" />
                </div>
                <div className="userNickBox">
                    <span className="userNick">木木剑光</span> 
                    {
                        0 ? <Icon type="woman" className="womanIcon" /> : <Icon type="man" className="manIcon" />
                    }
                </div>
                <div className="userInfo">
                    <div className="userInfoItem" onClick={ () => { setCurPageIndex(1) }  }>
                        <span>关注</span>
                        <span className="userInfoItemNum">26</span>  
                    </div>
                    <div className="userInfoItem" onClick={ () => { setCurPageIndex(2) }  }>
                        <span>粉丝</span>
                        <span className="userInfoItemNum">56</span>  
                    </div>
                    <div className="userInfoItem" onClick={ () => { setCurPageIndex(3) }  }>
                        <span>动态</span>
                        <span className="userInfoItemNum">78</span>  
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
