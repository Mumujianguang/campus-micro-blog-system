import React, { Component } from 'react';
import './carousel.less';
import api from '@/api';
import { Carousel } from 'antd';

export default class CarouselComp extends Component {
    state = {}

    // 检查图片路径类型
    checkImagePath = (imagePath) => {
        if (imagePath.indexOf("resource\\img") === -1) return imagePath;
        return `${api.apiPath}/getPic?path=${imagePath}`;
    }

    render() {
        const { carouselData } = this.props;
        return (
            <div className="carouselStyle">
                <Carousel autoplay>
                    {
                        carouselData.map(item => 
                            <div className="carousel_item" key={ item.id }>
                                <img src={ this.checkImagePath(item.imgSrc) } alt={item.text.title} className="img" />
                                <div className="infoBox">
                                    <p className="title">{ `#${item.text.title}#` }</p>
                                    <div className="info">
                                        <span>{ `${item.text.likeNum}人点赞` }</span>
                                        <span>{ `${item.text.readNum}人阅读` }</span>
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
