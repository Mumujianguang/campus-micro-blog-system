import React, { Component } from 'react';
import './carousel.less';
import { Carousel } from 'antd';

export default class CarouselComp extends Component {
    state = {
        carouselList: [
            {
                id: 0,
                imgSrc: "https://wx3.sinaimg.cn/large/59853be1ly1gav3yjralhj20f408iqb4.jpg",
                text: {
                    title: "新春摄影大赛",
                    comment: 102,
                    read: 551
                }
            },{
                id: 1,
                imgSrc: "https://wx4.sinaimg.cn/large/59853be1ly1gav4cy6iz8j20f408iwj6.jpg",
                text: {
                    title: "考试成绩决定家庭地位",
                    comment: 56,
                    read: 231
                }
            },{
                id: 2,
                imgSrc: "https://wx3.sinaimg.cn/large/59853be1ly1gauzdq3wwrj20f408iq8k.jpg",
                text: {
                    title: "忘记回消息就干脆不会了",
                    comment: 12,
                    read: 109
                }
            },
        ]
    }

    render() {
        const { carouselList } = this.state;
        return (
            <div className="carouselStyle">
                <Carousel autoplay>
                    {
                        carouselList.map(item => 
                            <div className="carousel_item" key={ item.id }>
                                <img src={ item.imgSrc } alt={item.text.title} className="img" />
                                <div className="infoBox">
                                    <p className="title">{ `#${item.text.title}#` }</p>
                                    <div className="info">
                                        <span>{ `${item.text.comment}人评论` }</span>
                                        <span>{ `${item.text.read}人阅读` }</span>
                                    </div>
                                </div>
                            </div>    
                        )
                    }
                </Carousel>
            </div>
        )
    }
}
