import React, { Component } from 'react';
import { Icon, Spin, Modal, Radio, message } from 'antd';
import { store, boundActions } from '@/redux/index';
import CookieController from 'js-cookie';
import uuid from 'uuid';
import api from '@/api/index';
import './userInfoBox.less';

export default class userInfoBox extends Component {
    state = {
        userBackgroundLoading: true,
        userAvatarLoading: true,
        isShowUpdateUserAvatarBtn: false,
        confirmLoading: false,
        modalVisible: false,
        uploadFile: '',
        uploadImageType: 'userImage',
        userImage: '',
        backImage: '',
        userNick: '',
        userSex: 0,
        userSign: '',
        concernNum: '',
        fansNum: '',
        dynamicNum: '',
        isConcern: false
    }
    // 获取store数据更新state
    updateUserInfo = () => {
        const { userInfo } = store.getState();
        this.setState({
            backImage: userInfo.backImage || "http://pic1.win4000.com/wallpaper/2018-03-23/5ab49ec774e64.jpg" ,
            userImage: userInfo.userImage || require("@/asset/img/01.jpg"),
            userNick: userInfo.userNick || '',
            userSex: parseInt(userInfo.userSex),
            userSign: userInfo.userSign,
            concernNum: userInfo.concernNum || 0,
            fansNum: userInfo.fansNum || 0,
            dynamicNum: userInfo.dynamicNum || 0
        })
    }
    // 设置上传图片的类型
    selectUploadType = (e) => {
        const { value } = e.target;
        this.setState({
            uploadImageType: value
        })
    }
    // 获取上传图片文件
    setUploadFile = (e) => {
        const uploadFile = e.target.files[0];
        this.setState({
            uploadFile
        })
    }
    // 显示控制函数
    userBackgroundLoaded = (e) => {
        this.setState({
            userBackgroundLoading: false
        })
    }
    userAvatarLoaded = () => {
        this.setState({
            userAvatarLoading: false
        })
    }
    showUpdateUserAvatarBtn = () => {
        this.setState({
            isShowUpdateUserAvatarBtn: true
        })
    }
    hideUpdateUserAvatarBtn = () => {
        this.setState({
            isShowUpdateUserAvatarBtn: false
        })
    }
    handleUpload = () => {
        this.setState({
            modalVisible: false
        })
    }
    showUploadModal = () => {
        this.setState({
            modalVisible: true
        })
    }
    // 检查图片路径类型
    checkImagePath = (imagePath) => {
        const filePath = this.state[imagePath];
        if (filePath.indexOf("resource\\img") === -1) return filePath;
        return `${api.apiPath}/getPic?path=${filePath}`;
    }
    // 上传图片
    uploadImage = () => {
        const { uploadFile, uploadImageType } = this.state;
        if (uploadFile === '') {
            message.warning('您还没有选择要上传的图片哦！');
            return;
        }
        this.setState({
            confirmLoading: true
        })
        const postData = new FormData();
        postData.append("imageFile", uploadFile);
        postData.append("type", uploadImageType);
        postData.append("phone", CookieController.get("userPhone"));

        api.uploadUserImage(postData)
            .then(result => {
                const { msg, data } = result.data;
                if (msg !== 'ok') {
                    message.error('遇到错误啦！更新失败');
                    return;
                }           
                this.setState({
                    modalVisible: false,
                    confirmLoading: false,
                    uploadFile: '',
                    [uploadImageType]: data.imageFile
                })
                message.success('更改头像成功！');

                // 分发更新用户头像信息
                uploadImageType === "userImage" ? 
                    boundActions.createUpdateUserAvatarImage(data.imageFile):
                    boundActions.createUpdateUserBackImage(data.imageFile);
            })
    }

    initOtherUserInfo = () => {
        const { globalUserPhone } = store.getState();
        api.selectUserInfo(globalUserPhone).then(result => {
            if (result.data.msg !== "ok") {
                message.error("服务器出错啦！")
                return;
            }
            const globalUserInfo = result.data.data[0];
            // 将当前全局页面用户的信息存入store
            boundActions.createUpdateGlobalUserInfo(globalUserInfo);
            this.setState({
                backImage: globalUserInfo.backImage || "http://pic1.win4000.com/wallpaper/2018-03-23/5ab49ec774e64.jpg" ,
                userImage: globalUserInfo.userImage || require("@/asset/img/01.jpg"),
                userNick: globalUserInfo.userNick || '',
                userSex: parseInt(globalUserInfo.userSex),
                userSign: globalUserInfo.userSign,
                concernNum: globalUserInfo.concernNum || 0,
                fansNum: globalUserInfo.fansNum || 0,
                dynamicNum: globalUserInfo.dynamicNum || 0
            })
        })
    }

    checkIsConcern = () => {
        const { globalUserPhone, userConcernList } = store.getState();
        const isConcern = userConcernList.findIndex(item => item.concernUserPhone === globalUserPhone);
        if (isConcern === -1) return;
        this.setState({
            isConcern: true
        })
    }

    componentDidMount () {
        const { type } = this.props;
        if (type !== 'other') {
            this.updateUserInfo();
            store.subscribe(() => {
                this.updateUserInfo();
            })
            return;
        }
        this.initOtherUserInfo()
        store.subscribe(() => {
            this.checkIsConcern();
        })
    }

    // 关注用户
    concernUser = () => {
        const { globalUserPhone } = store.getState();
        const userPhone = CookieController.get("userPhone");
        api.concernUser({
            id: uuid(),
            userPhone,
            concernUserPhone: globalUserPhone
        }).then(result => {
            if (result.data.msg !== "ok") {
                message.error("服务器出错啦~")
                return;
            }
            this.setState({
                isConcern: true,
                fansNum: this.state.fansNum + 1
            })
        })
    }

    cancelConcern = () => {
        const { globalUserPhone } = store.getState();
        const userPhone = CookieController.get("userPhone");
        api.cancelConcern({
            userPhone,
            concernUserPhone: globalUserPhone
        }).then(result => {
            if (result.data.msg !== "ok") {
                message.error("服务器出错啦~")
                return;
            }
            this.setState({
                isConcern: false,
                fansNum: this.state.fansNum - 1
            })
        })
    }

    render() {
        const { 
            userBackgroundLoading, 
            isShowUpdateUserAvatarBtn,
            userAvatarLoading,
            confirmLoading,
            modalVisible,
            uploadImageType, 
            userNick, 
            userSex, 
            userSign, 
            concernNum, 
            fansNum, 
            dynamicNum,
            isConcern
        } = this.state;
        const { setCurPageIndex, type } = this.props;
        const { globalUserPhone } = store.getState();
        const curUserPhone = CookieController.get("userPhone");
        const isSelf = globalUserPhone === curUserPhone
        return (
            <div className="userInfoBox">
                <div className="userImg">
                    {/* 用户背景图片 */}
                    <div className="backgroundImgBox">
                        <img src={ this.checkImagePath("backImage") }
                             alt="" 
                             className={ `backgroundImg ${ !userBackgroundLoading ? "backgroundImgShow" : "" }` }
                             onLoad={ this.userBackgroundLoaded } />
                        <Spin size="large" spinning={ userBackgroundLoading } className="loadingIcon" />
                    </div>
                    {/* 用户头像 */}
                    <div className="avatarImgBox" 
                         onMouseEnter={ type !== "other" ? this.showUpdateUserAvatarBtn : null }
                         onMouseLeave={ type !== "other" ? this.hideUpdateUserAvatarBtn : null }>
                        <img src={ this.checkImagePath("userImage") } alt="" 
                             className="avatarImg"
                             onLoad={ this.userAvatarLoaded } />
                        <Spin size="large" spinning={ userAvatarLoading } className="loadingIcon" />
                        {
                            isShowUpdateUserAvatarBtn ? 
                            <div className="updateUserAvatar"
                                 onClick={ this.showUploadModal }>
                                <span>更换头像</span>
                            </div>: null
                        }
                        <Modal title="上传头像"
                               visible={ modalVisible }
                               onOk={this.uploadImage}
                               confirmLoading={ confirmLoading }
                               onCancel={ this.handleUpload }
                               okText="上传"
                               cancelText="取消" >
                            <div>
                                <span>选择修改图片类型：</span>
                                <Radio.Group value={ uploadImageType } 
                                             onChange={ this.selectUploadType }>
                                    <Radio value="userImage">个人头像</Radio>
                                    <Radio value="backImage">个人背景</Radio>
                                </Radio.Group>
                            </div>
                            <div style={{margin: '10px'}}>
                                <input type="file" 
                                       onChange={ this.setUploadFile }
                                       style={{
                                           borderRadius: "10px",
                                           outline: 'none',
                                           border: '2px solid #ccc'
                                        }} />
                            </div>
                        </Modal>
                    </div>
                </div>
                <div className="userNickBox">
                    <div>
                        <span className="userNick">{ userNick }</span> 
                        {
                            userSex ? <Icon type="woman" className="womanIcon" /> : <Icon type="man" className="manIcon" />
                        }
                    </div>
                    {
                        type === "other" && !isSelf ? (
                            !isConcern ? 
                            <div className="concernBtn" onClick={ this.concernUser }>
                                <span className="concernText">关注</span>
                            </div> 
                            :
                            <div className="concernBtn" onClick={ this.cancelConcern }>
                                <span className="concernText">已关注</span>
                            </div>
                        )
                        : null
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
