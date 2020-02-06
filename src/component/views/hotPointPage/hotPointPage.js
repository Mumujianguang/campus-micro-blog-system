import React, { Component, Fragment } from 'react';
import SelectAddType from '@/component/share/selectAddType/selectAddType';
import BigImg from '@/component/share/bigImg/bigImg';
import NineImg from '@/component/share/nineImg/nineImg';
import DynamicList from '@/component/share/dynamicList/dynamicList';
import tools from '@/tools/index';
import CookieController from 'js-cookie';
import uuid from 'uuid';
import api from '@/api/index';
import { Icon, message } from 'antd';
import './hotPointPage.less';

export default class hotPointPage extends Component {
    state = {
        selectStatus: 'init',
        bigImgSrc: '',
        nineImgSrcArr: [],
        // img file
        bigImgFile: '',
        nineImgFileArr: [],
        // select组件的当前值
        curSelectValue: '自定义',
        curSelectHotPoint: '',
        hotPointList: [],
        userSay: '',

        dynamicListArr: []
    }

    // 清空动态发布表单
    initState = () => {
        this.setState({
            selectStatus: 'init',
            bigImgSrc: '',
            nineImgSrcArr: [],
            bigImgFile: '',
            nineImgFileArr: [],
            curSelectValue: '自定义',
            curSelectHotPoint: '',
            userSay: ''
        })
    }
    selectInit = () => {
        this.setState({
            selectStatus: 'init',
            bigImgSrc: '',
            nineImgSrcArr: [],
            bigImgFile: '',
            nineImgFileArr: [],
        })
    }
    selectBigImg = () => {
        this.setState({
            selectStatus: 'bigImg'
        })
    }
    selectNineImg = () => {
        this.setState({
            selectStatus: 'nineImg'
        })
    }
    getSelectComponent = () => {
        const { selectStatus, bigImgSrc, nineImgSrcArr } = this.state;
        switch (selectStatus) {
            case 'init':
                return <SelectAddType handleFunc={{ 
                            selectBigImg: this.selectBigImg, 
                            selectNineImg: this.selectNineImg 
                        }} />

            case 'bigImg':
                return <Fragment>
                            <BigImg imgSrc={ bigImgSrc } width="95%" />
                            <div className="pushImgBox">
                                <input type="file" 
                                       className="pushImg"
                                       onChange={ this.setBigImgSrc } />
                            </div>
                       </Fragment> 

            case 'nineImg':
                return <Fragment>
                            <NineImg imgSrcArr={ nineImgSrcArr } />
                            <div className="pushImgBox">
                                <input type="file" 
                                       className="pushImg" 
                                       multiple
                                       onChange={ this.setNineImgSrcArr } />
                            </div>
                       </Fragment>
            default:
                return <SelectAddType handleFunc={{ 
                            selectBigImg: this.selectBigImg, 
                            selectNineImg: this.selectNineImg 
                        }} />
        }
    }
    // 根据上传图片设置当前图片路径
    setBigImgSrc = (e) => {
        // 获取当前图片资源
        const img = e.target.files[0]
        if (!img) {
            this.setState({
                bigImgFile: '',
                bigImgSrc: ''
            })
            return
        }
        const reader = new FileReader();
        // 将图片转为base64格式
        reader.readAsDataURL(img);
        reader.onload = (e) => {
            this.setState({
                bigImgFile: img,
                bigImgSrc: e.target.result
            })
        }
    }
    setNineImgSrcArr = (e) => {
        // 获取图片资源对象，并转为数组
        const imgArr = [...e.target.files];
        // 如果没有图片则将九宫格的图片资源清空
        if (imgArr.length === 0) {
            this.setState({
                nineImgFileArr: [],
                nineImgSrcArr: []
            })
            return;
        } 
        // 存储转换完成的base64格式的图片资源
        const curImgArr = [];
        // 遍历图片资源，转换为base64格式
        imgArr.forEach((img, index) => {
            const reader = new FileReader();
            reader.readAsDataURL(img)
            // 转换完成的回调函数
            reader.onload = (e) => {
                curImgArr.push(e.target.result);
                // 当完成最后一张图片的转换时，设置九宫格的图片资源
                if (index === imgArr.length - 1) {
                    this.setState({
                        nineImgFileArr: imgArr,
                        nineImgSrcArr: curImgArr
                    })
                }
                
            }
        });
    }
    // 选择话题
    selectHotPoint = (e) => {
        const value = e.target.value;
        if (value !== '自定义') {
            this.setState({
                curSelectValue: value,
                curSelectHotPoint: value
            })
            return;
        }
        this.setState({
            curSelectValue: value,
            curSelectHotPoint: ''
        })
    }
    // 自定义话题
    customHotPoint = (e) => {
        this.setState({
            curSelectHotPoint: e.target.value
        })
    }
    // 设置用户发表的内容
    setUserSay = (e) => {
        const { value } = e.target;
        this.setState({
            userSay: value
        })
    }
    // 发布
    pushDynamic = () => {
        const { selectStatus, bigImgFile, bigImgSrc, nineImgSrcArr, nineImgFileArr, curSelectHotPoint, userSay } = this.state;
        const phone = CookieController.get('userPhone');
        if (!phone) {
            message.warning("登录后才能发表动态嗷 ~ ");
            return;
        }
        if ((selectStatus === 'bigImg' && bigImgSrc === '') || (selectStatus === 'nineImg' && nineImgSrcArr.length === 0)) {
            message.warning("还没有上传图片哦！");
            return;
        } 
        const date = new Date();
        const nowTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        const postData = {
            topic: curSelectHotPoint.slice(1, curSelectHotPoint.length - 1),
            id: uuid(),
            type: selectStatus,
            phone: phone,
            content: userSay,
            push_date: nowTime
        }

        const formData = new FormData();
        let httpPromise = null;

        // 判断上传文件类型
        if (selectStatus === 'bigImg') postData.imgFile = bigImgFile;
        // 构造表单数据
        for (let prop in postData) {
            formData.append(prop, postData[prop])
        }
        // 多个文件比较特殊，需要挨个写入formData
        if (selectStatus === 'nineImg') {
            for (let item in nineImgFileArr) {
                formData.append("imgFiles", nineImgFileArr[item]);
            }
        } 
        // 判断请求类型
        if (selectStatus === 'init') httpPromise =  api.pushDynamic(postData);
        if (selectStatus === 'bigImg') httpPromise = api.pushDynamicBigImg(formData);
        if (selectStatus === 'nineImg') httpPromise = api.pushDynamicNineImg(formData);
        httpPromise
            .then(data => {
                console.log(data);
                const { msg } = data.data;
                if (msg === 'ok') {
                    message.success("发布完成：您成功更新了动态！")
                } else if (msg === 'error') {
                    message.error("发布完成：遇到错误啦，更新失败！")
                }
                this.initState();
            })
    }
    componentDidMount () {
        // 获取话题列表
        api.getTopicList()
            .then(data => {
                const { result } = data.data;
                this.setState({
                    hotPointList: result
                })
            })
        
        // 获取动态列表
        api.getDynamicInfoByReadNum()
            .then(result => {
                const { msg } = result.data;
                if (msg === 'ok') {
                    console.log(result);
                    const { data } = result.data;
                    const dynamicListArr = data.map(item => tools.covertToDynamicInfo(item));
                    this.setState({
                        dynamicListArr
                    })
                }
            })
    }

    render() {
        const { curSelectValue, curSelectHotPoint, hotPointList, userSay, dynamicListArr } = this.state;
        return (
            <div className="hotPointPage">
                {/* 发表动态 */}
                <div className="pushDynamic">
                    {/* title部分 */}
                    <p className="pushDynamicTitle">
                        <span className="pushDynamicTitleText">发表新鲜事儿</span> 
                        <Icon type="edit" className="pushDynamicTitleIcon" />    
                    </p>
                    {/* 选择话题 */}
                    <div className="selectPoint">
                        <div className="hotPointListBox">
                            <span className="title">话题</span>
                            {/* 下拉选择框 */}
                            <select className="hotPointList"
                                    value={ curSelectValue }
                                    onChange={ this.selectHotPoint }>
                                <option className="hotPointListItem">自定义</option>
                                {
                                    hotPointList.map((item, index) => (
                                        <option className="hotPointListItem" key={ index }>{ `#${ item }#` }</option>
                                    ))
                                }
                            </select>
                        </div>
                        {
                            // 选择自定义时显示输入框
                            curSelectValue === '自定义' ?
                                <div className="customBox">
                                    <input type="text" 
                                           placeholder="请输入自定义话题"
                                           className="customInput"
                                           value={ curSelectHotPoint }
                                           onChange={ this.customHotPoint }
                                           autoFocus />
                                </div> : null
                        }
                    </div>
                    {/* 动态内容部分 */}
                    <div className="inputModule">
                        <textarea className="inputText" 
                                  placeholder="说点儿什么吧！"
                                  value={ userSay }
                                  onChange={ this.setUserSay }></textarea>
                        <div className="addImg">
                            {
                                this.getSelectComponent()
                            }
                        </div>
                        <div className="push">
                            <div className="sureBtnBox">
                                <button className="btn submitBtn" onClick={ this.pushDynamic }>发布</button>
                                <button className="btn resetSelectStatus" onClick={ this.selectInit }>重置图片类型</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 热门话题动态 */}
                <div className="hotPointDynamic">
                    <div className="hotPointDynamicTitle">
                        <span className="text">热门动态</span>
                        <Icon type="fire" />
                    </div>
                    <div className="hotPointDynamicList">
                        {
                            dynamicListArr.length === 0 ? 
                                <div>暂无内容</div>
                                :
                                dynamicListArr.map((item, index) => (
                                    <DynamicList dynamicItem={ item } key={ index } />
                                ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}
