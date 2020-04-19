import React, { Component } from 'react';
import CarouselComp from './carousel/carousel';
import HotPoint from './hotPoint/hotPoint';
import UserNews from './userNews/userNews';
import { Spin, Icon } from 'antd';
import './mainPage.less';
import api from '../../../api';

export default class mainPage extends Component {
    state = {
        carouselData: [
            // {
            //     id: 0,
            //     imgSrc: "https://wx3.sinaimg.cn/large/59853be1ly1gav3yjralhj20f408iqb4.jpg",
            //     text: {
            //         title: "新春摄影大赛",
            //         like: 102,
            //         read: 551
            //     }
            // },{
            //     id: 1,
            //     imgSrc: "https://wx4.sinaimg.cn/large/59853be1ly1gav4cy6iz8j20f408iwj6.jpg",
            //     text: {
            //         title: "考试成绩决定家庭地位",
            //         like: 56,
            //         read: 231
            //     }
            // },{
            //     id: 2,
            //     imgSrc: "https://wx3.sinaimg.cn/large/59853be1ly1gauzdq3wwrj20f408iq8k.jpg",
            //     text: {
            //         title: "忘记回消息就干脆不会了",
            //         like: 12,
            //         read: 109
            //     }
            // },
        ],
        hotPointList: [
            // {
            //     title: "啦啦啦",
            //     img: "https://wx3.sinaimg.cn/large/007evLBUly1gav6n7bh6sj30dw0dwgms.jpg",
            //     text: {
            //         comment: 2,
            //         read: 3
            //     }
            // },{
            //     title: "滴滴滴",
            //     img: "https://wx2.sinaimg.cn/large/61e7f4aaly1gavttrwl0gj20dw0dw75z.jpg",
            //     text: {
            //         comment: 22,
            //         read: 33
            //     }
            // },{
            //     title: "嘟嘟嘟",
            //     img: "https://wx2.sinaimg.cn/large/66eeadffly1gavshzqttnj20b40b4mxg.jpg",
            //     text: {
            //         comment: 223,
            //         read: 332
            //     }
            // },{
            //     title: "嘟嘟嘟",
            //     img: "https://wx3.sinaimg.cn/large/59853be1ly1gav3yjralhj20f408iqb4.jpg",
            //     text: {
            //         comment: 223,
            //         read: 332
            //     }
            // },{
            //     title: "嘟嘟嘟",
            //     img: "https://wx1.sinaimg.cn/large/7dced06cly1gavviy66woj20dw0dwgmi.jpg",
            //     text: {
            //         comment: 223,
            //         read: 332
            //     }
            // },{
            //     title: "嘟嘟嘟",
            //     img: "https://wx3.sinaimg.cn/large/59853be1ly1gav3yjralhj20f408iqb4.jpg",
            //     text: {
            //         comment: 223,
            //         read: 332
            //     }
            // }
        ],
        refMaxData: [],
        isLoading: true
    }

    countTopic = async (data) => {
        const countObj = {};
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            if (!countObj[item.topic]) {
                countObj[item.topic] = {
                    readNum: item.read_num,
                    likeNum: item.like_num
                }
                const commentResult = await api.getCommentNum(item.id);
                countObj[item.topic].commentNum = commentResult.data.data;
                if (item.type === "bigImg") {
                    countObj[item.topic].id = item.id
                    const bigImgResult = await api.getBigImg(item.id);
                    countObj[item.topic].imgSrc = bigImgResult.data.data;
                }
            } else {
                if (!countObj[item.topic].id && item.type === "bigImg") {
                    countObj[item.topic].id = item.id
                    const bigImgResult = await api.getBigImg(item.id);
                    countObj[item.topic].imgSrc = bigImgResult.data.data;
                }
                countObj[item.topic].readNum += item.read_num;
                countObj[item.topic].likeNum += item.like_num;
            }
        }
        return countObj
    }
    // 轮播数据转换函数
    covertToCarouselData = (countObj) => {
        const carouselData = [];
        for (let prop in countObj) {
            const item = countObj[prop];
            carouselData.push({
                id: item.id,
                imgSrc: item.imgSrc,
                text: {
                    title: prop,
                    readNum: item.readNum,
                    likeNum: item.likeNum 
                }
            })
        }
        carouselData.sort((a, b) => b.text.likeNum - a.text.likeNum);
        carouselData.length = 3;
        return carouselData;
    }
    // 热点列表转换函数
    covertToHotPointList = (countObj) => {
        const hotPointList = [];
        for (let prop in countObj) {
            const item = countObj[prop];
            hotPointList.push({
                title: prop,
                img: item.imgSrc,
                text: {
                    comment: item.commentNum,
                    read: item.readNum 
                }
            })
        }
        // 按照评论数降序排列
        hotPointList.sort((a, b) => b.text.comment - a.text.comment);
        hotPointList.length = 6;
        return hotPointList;
    }

    // 转发数最多的大图类动态展示区
    covertToRefMaxData = (data) => {
        const refMaxData = [];
        for (let prop in data) {
            const item = data[prop];
            refMaxData.push({
                type: item.topic,
                content: item.content,
                img: item.imgSrc,
                user: {
                    avatarImg: item.userImg,
                    nick: item.userNick
                },
                info: {
                    reprint: item.forward_num,
                    like: item.like_num,
                    read: item.read_num
                },
                pushTime: item.push_date
            })
        }
        return refMaxData;
    }

    // 收集大图类型的动态
    getDynamic_bigImg = async (data) => {
        const bigImgData = data.filter(item => item.type === 'bigImg' && item.from_user === null);
        console.log(bigImgData);
        bigImgData.sort((a, b) => b.forward_num - a.forward_num);
        bigImgData.length = 2;
        for (let i = 0; i < bigImgData.length; i++) {
            const item = bigImgData[i];
            const bigImgResult = await api.getBigImg(item.id);
            const userInfoResult = await api.selectUserInfo(item.phone);
            item.userImg = userInfoResult.data.data[0].userImage;
            item.userNick = userInfoResult.data.data[0].userNick;
            item.imgSrc = bigImgResult.data.data;
        }
        return bigImgData
    }

    componentDidMount () {
        api.getAllDynamic().then(async result => {
            console.log(result);
            const bigImgData = await this.getDynamic_bigImg(result.data.data);
            const countObj = await this.countTopic(result.data.data);
            const carouselData = this.covertToCarouselData(countObj);
            const hotPointList = this.covertToHotPointList(countObj);
            const refMaxData = this.covertToRefMaxData(bigImgData);
            console.log(refMaxData);
            this.setState({
                carouselData,
                hotPointList,
                refMaxData,
                isLoading: false
            })
        })
    }
    



    render() {
        const antIcon = <Icon type="loading" style={{ fontSize: 100 }} spin />;
        const { carouselData, hotPointList, refMaxData, isLoading } = this.state;
        return (
            <div className="mainPageWrapper">
                <div className="carouselWrapper">
                    <CarouselComp carouselData={ carouselData } />
                    <UserNews refMaxData={ refMaxData } />
                </div>
                <div className="hotPointWrapper">
                    <HotPoint hotPointList={ hotPointList} />
                </div>
                {
                    isLoading ? 
                    <div className="loadingPage">
                        <Spin indicator={antIcon} className="loadingIcon" />
                    </div> : null
                }
                
            </div>
        )
    }
}
