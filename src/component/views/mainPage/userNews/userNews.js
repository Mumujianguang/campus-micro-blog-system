import React, { Component } from 'react'
import UserNewItem from './userNewItem/userNewItem';
import './userNews.less';

export default class UserNews extends Component {
    render() {
        const { refMaxData } = this.props;
        return (
            <div className="userNewsStyle">
                {
                    refMaxData.map((item, index) =>
                        (<UserNewItem userNewInfo={ item } key={ index } />)    
                    )
                }
            </div>
        )
    }
}
