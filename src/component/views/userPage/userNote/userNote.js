import React, { Component } from 'react';
import { Icon } from 'antd';
import DynamicList from '@/component/share/dynamicList/dynamicList';
import './userNote.less';

export default class userNote extends Component {
    state = {
        dynamicList: [
            {
                type: 'text',
                imgSrc: 'http://localhost:3000/static/media/01.4c3cc061.jpg',
                userNick: '木木',
                content: {
                    text: '123'
                },
                releaseTime: '2019-02-02',
                readNum: 202,
                likeNum: 89,
                commentList: [
                    {
                        imgSrc: 'http://localhost:3000/static/media/01.4c3cc061.jpg',
                        userNick: 'didi',
                        comment: 'haha',
                        commentTime: '2019-01-31'
                    },{
                        imgSrc: 'http://localhost:3000/static/media/01.4c3cc061.jpg',
                        userNick: '喵喵',
                        comment: '嘿嘿',
                        commentTime: '2019-01-31'
                    },{
                        imgSrc: 'http://localhost:3000/static/media/01.4c3cc061.jpg',
                        userNick: '大丸子',
                        comment: '俺也一样',
                        commentTime: '2019-01-31'
                    },
                ]
            },{
                type: 'bigImg',
                imgSrc: 'http://localhost:3000/static/media/01.4c3cc061.jpg',
                userNick: '木木',
                content: {
                    text: '123',
                    imgSrc: 'http://localhost:3000/static/media/01.4c3cc061.jpg'
                },
                releaseTime: '2019-02-02',
                readNum: 226,
                likeNum: 45,
                commentList: [
                    {
                        imgSrc: 'http://localhost:3000/static/media/01.4c3cc061.jpg',
                        userNick: 'didi',
                        comment: 'haha'
                    },{
                        imgSrc: 'http://localhost:3000/static/media/01.4c3cc061.jpg',
                        userNick: '喵喵',
                        comment: '嘿嘿'
                    },{
                        imgSrc: 'http://localhost:3000/static/media/01.4c3cc061.jpg',
                        userNick: '大丸子',
                        comment: '俺也一样'
                    },
                ]
            },{
                type: 'nineImg',
                imgSrc: 'http://localhost:3000/static/media/01.4c3cc061.jpg',
                userNick: '木木',
                content: {
                    text: '456',
                    imgSrcArr: [
                        'http://localhost:3000/static/media/01.4c3cc061.jpg',
                        'http://localhost:3000/static/media/01.4c3cc061.jpg',
                        'http://localhost:3000/static/media/01.4c3cc061.jpg',
                        'http://localhost:3000/static/media/01.4c3cc061.jpg',
                        'http://localhost:3000/static/media/01.4c3cc061.jpg',
                        'http://localhost:3000/static/media/01.4c3cc061.jpg',
                        'http://localhost:3000/static/media/01.4c3cc061.jpg',
                        'http://localhost:3000/static/media/01.4c3cc061.jpg',
                        'http://localhost:3000/static/media/01.4c3cc061.jpg',
                    ]
                },
                releaseTime: '2019-02-02',
                readNum: 5062,
                likeNum: 567,
                commentList: [
                    {
                        imgSrc: 'http://localhost:3000/static/media/01.4c3cc061.jpg',
                        userNick: 'didi',
                        comment: 'haha'
                    },{
                        imgSrc: 'http://localhost:3000/static/media/01.4c3cc061.jpg',
                        userNick: '喵喵',
                        comment: '嘿嘿'
                    },{
                        imgSrc: 'http://localhost:3000/static/media/01.4c3cc061.jpg',
                        userNick: '大丸子',
                        comment: '俺也一样'
                    },
                ]
            }
        ]
    }
    componentDidMount () {
        this.props.loaded();
    }
    componentWillUnmount () {
        this.props.loading();
    }
    render() {
        return (
            <div className="userDynamic">
                <p className="pageTitle">
                    <Icon type="laptop" />
                    <span>动态</span>
                </p>
                <div className="dynamicListBox">
                    {
                        this.state.dynamicList.map((item, index) => (
                            <DynamicList dynamicItem={ item } key={ index } />
                        ))
                    }
                </div>
            </div>
        )
    }
}
