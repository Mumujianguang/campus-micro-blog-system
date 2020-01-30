import React, { Component } from 'react';
import UserBaseList from '../userBaseList/userBaseList';

export default class userFollow extends Component {
    state = {
        userFollowData: [
            {
                avatarImg: "http://localhost:3000/static/media/01.4c3cc061.jpg",
                userNick: "木木",
                userSay: "又是元气满满的一天啊",
                isFollow: true
            },{
                avatarImg: "http://localhost:3000/static/media/01.4c3cc061.jpg",
                userNick: "啦啦啦",
                userSay: "react",
                isFollow: true
            },{
                avatarImg: "http://localhost:3000/static/media/01.4c3cc061.jpg",
                userNick: "突如其来",
                userSay: "喵喵",
                isFollow: true
            },{
                avatarImg: "http://localhost:3000/static/media/01.4c3cc061.jpg",
                userNick: "木木",
                userSay: "又是元气满满的一天啊",
                isFollow: true
            },{
                avatarImg: "http://localhost:3000/static/media/01.4c3cc061.jpg",
                userNick: "啦啦啦",
                userSay: "react",
                isFollow: true
            },{
                avatarImg: "http://localhost:3000/static/media/01.4c3cc061.jpg",
                userNick: "突如其来",
                userSay: "喵喵",
                isFollow: true
            },{
                avatarImg: "http://localhost:3000/static/media/01.4c3cc061.jpg",
                userNick: "木木",
                userSay: "又是元气满满的一天啊",
                isFollow: true
            },{
                avatarImg: "http://localhost:3000/static/media/01.4c3cc061.jpg",
                userNick: "啦啦啦",
                userSay: "react",
                isFollow: true
            },{
                avatarImg: "http://localhost:3000/static/media/01.4c3cc061.jpg",
                userNick: "突如其来",
                userSay: "喵喵",
                isFollow: true
            },{
                avatarImg: "http://localhost:3000/static/media/01.4c3cc061.jpg",
                userNick: "木木",
                userSay: "又是元气满满的一天啊",
                isFollow: true
            },{
                avatarImg: "http://localhost:3000/static/media/01.4c3cc061.jpg",
                userNick: "啦啦啦",
                userSay: "react",
                isFollow: true
            },{
                avatarImg: "http://localhost:3000/static/media/01.4c3cc061.jpg",
                userNick: "突如其来",
                userSay: "喵喵",
                isFollow: true
            }
        ],
    }
    componentDidMount () {
        this.props.loaded();
    }
    componentWillUnmount () {
        this.props.loading();
    }
    render() {
        return (
            <UserBaseList type="follow" userData={ this.state.userFollowData } />
        )
    }
}
