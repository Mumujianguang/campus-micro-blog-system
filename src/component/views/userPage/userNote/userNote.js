import React, { Component } from 'react';
import { Icon } from 'antd';
import DynamicList from '@/component/share/dynamicList/dynamicList';
import CookieController from 'js-cookie';
import tools from '@/tools/index';
import { store } from '@/redux';
import api from '@/api';
import './userNote.less';

export default class userNote extends Component {
    state = {
        dynamicList: []
    }
    componentWillMount () {
        const { userType } = this.props;
        let userPhone = "";
        if (userType === "other") {
            userPhone = store.getState().globalUserPhone;
        } else {
            userPhone = CookieController.get("userPhone");
        }
         
        api.getDynamicInfoByUserPhone(userPhone)
            .then(result => {
                const { msg } = result.data;
                if (msg !== "ok") return;
                const { data } = result.data;
                this.setState({
                    dynamicList: data.map(item => tools.covertToDynamicInfo(item))
                })
            })
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
