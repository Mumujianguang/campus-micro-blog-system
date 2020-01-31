import React, { Component } from 'react';
import { Icon } from 'antd';
import DynamicList from '@/component/share/dynamicList/dynamicList';
import dynamicListArr from '@/asset/json/dynamicList';
import './userNote.less';

export default class userNote extends Component {
    state = {
        dynamicList: dynamicListArr
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
