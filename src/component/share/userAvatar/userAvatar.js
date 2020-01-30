import React, { Component } from 'react'
import './userAvatar.less';

export default class userAvatar extends Component {
    render() {
        const { imgSrc, size } = this.props;
        return (
            <div style={{ width: `${size}px`, height: `${size}px` }} className="avatarBox">
                <img src={ imgSrc } alt="" className="avatar" />
            </div>
        )
    }
}
