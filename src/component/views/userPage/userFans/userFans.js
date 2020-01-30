import React, { Component } from 'react';
import UserBaseList from '../userBaseList/userBaseList';

export default class userFans extends Component {
    state = {
        userFansData: [
            {
                avatarImg: "http://localhost:3000/static/media/01.4c3cc061.jpg",
                userNick: "木木",
                userSay: "又是元气满满的一天啊",
                isFollow: false
            },{
                avatarImg: "http://localhost:3000/static/media/01.4c3cc061.jpg",
                userNick: "啦啦啦",
                userSay: "vue",
                isFollow: false
            },{
                avatarImg: "http://localhost:3000/static/media/01.4c3cc061.jpg",
                userNick: "2012的第一场雪",
                userSay: "i like u",
                isFollow: false
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
            <UserBaseList type="fans" userData={ this.state.userFansData } />
        )
    }
}
