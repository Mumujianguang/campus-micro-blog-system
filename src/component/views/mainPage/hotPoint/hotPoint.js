import React, { Component } from 'react';
import './hotPoint.less';
import HotPointItem from "./hotPointItem/hotPointItem";

export default class hotPoint extends Component {
    render() {
        const hotPointList = this.props.hotPointList;
        return (
            <div className="hotPointStyle">
                <p className="hotPointTitle">校园热门话题</p>
                {
                    hotPointList.map((item, index) => 
                        <HotPointItem hotPointItemInfo={ item } key={ index } />
                    )
                }
                
            </div>
        )
    }
}
