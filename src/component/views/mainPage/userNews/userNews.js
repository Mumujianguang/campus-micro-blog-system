import React, { Component } from 'react'
import UserNewItem from './userNewItem/userNewItem';
import './userNews.less';

export default class UserNews extends Component {
    state = {
        userNewsList: [
            {
                type: "啦啦啦",
                content: "冲冲冲！！！",
                img: 'https://wx1.sinaimg.cn/mw690/6cf03c75ly1gav9to1igpj22081c6x6q.jpg',
                user: {
                    avatarImg: 'https://wx1.sinaimg.cn/mw690/6cf03c75ly1gav9to1igpj22081c6x6q.jpg',
                    nick: 'mm'
                },
                info: {
                    reprint: 233,
                    comment: 123,
                    read: 540
                },
                pushTime: '2019-01-15'
            },{
                type: "啦啦啦",
                content: "冲冲冲！！！",
                img: 'https://wx1.sinaimg.cn/mw690/6cf03c75ly1gav9to1igpj22081c6x6q.jpg',
                user: {
                    avatarImg: 'https://wx1.sinaimg.cn/mw690/6cf03c75ly1gav9to1igpj22081c6x6q.jpg',
                    nick: 'mm'
                },
                info: {
                    reprint: 233,
                    comment: 123,
                    read: 540
                },
                pushTime: '2019-01-15'
            }
        ]
    }
    render() {
        const { userNewsList } = this.state;
        return (
            <div className="userNewsStyle">
                {
                    userNewsList.map((item, index) =>
                        (<UserNewItem userNewInfo={ item } key={ index } />)    
                    )
                }
            </div>
        )
    }
}
