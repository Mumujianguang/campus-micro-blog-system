import React, { Component } from 'react';
import CarouselComp from './carousel/carousel';
import HotPoint from './hotPoint/hotPoint';
import UserNews from './userNews/userNews';
import './mainPage.less';

export default class mainPage extends Component {
    state = {
        hotPointList: [
            {
                title: "啦啦啦",
                img: "https://wx3.sinaimg.cn/large/007evLBUly1gav6n7bh6sj30dw0dwgms.jpg",
                text: {
                    comment: 2,
                    read: 3
                }
            },{
                title: "滴滴滴",
                img: "https://wx2.sinaimg.cn/large/61e7f4aaly1gavttrwl0gj20dw0dw75z.jpg",
                text: {
                    comment: 22,
                    read: 33
                }
            },{
                title: "嘟嘟嘟",
                img: "https://wx2.sinaimg.cn/large/66eeadffly1gavshzqttnj20b40b4mxg.jpg",
                text: {
                    comment: 223,
                    read: 332
                }
            },{
                title: "嘟嘟嘟",
                img: "https://wx3.sinaimg.cn/large/59853be1ly1gav3yjralhj20f408iqb4.jpg",
                text: {
                    comment: 223,
                    read: 332
                }
            },{
                title: "嘟嘟嘟",
                img: "https://wx1.sinaimg.cn/large/7dced06cly1gavviy66woj20dw0dwgmi.jpg",
                text: {
                    comment: 223,
                    read: 332
                }
            },{
                title: "嘟嘟嘟",
                img: "https://wx3.sinaimg.cn/large/59853be1ly1gav3yjralhj20f408iqb4.jpg",
                text: {
                    comment: 223,
                    read: 332
                }
            }
        ]
    }

    render() {
        return (
            <div className="mainPageWrapper">
                <div className="carouselWrapper">
                    <CarouselComp />
                    <UserNews />
                </div>
                <div className="hotPointWrapper">
                    <HotPoint hotPointList={ this.state.hotPointList} />
                </div>
            </div>
        )
    }
}
