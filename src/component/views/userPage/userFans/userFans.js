import React, { Component } from 'react';
import UserBaseList from '../userBaseList/userBaseList';
import { store } from '@/redux/index';
import api from '../../../../api';

export default class userFans extends Component {
    state = {
        userFansData: []
    }

    componentDidMount () {
        this.props.loaded();
    }
    componentWillMount () {
        this.props.loading();

        const { userType } = this.props;
        if (userType === "other") {
            const { globalUserPhone, globalUserConcernList } = store.getState();
            api.getUserFansList(globalUserPhone).then(result => {
                const { fansList } = result.data;
                const userFansData = this.dealUserFansData(globalUserConcernList, fansList);
                this.setState({
                    userFansData
                })
            });
            return;
        }
        const { userConcernList, userFansList } = store.getState();
        const userFansData = this.dealUserFansData(userConcernList, userFansList);
        this.setState({
            userFansData
        })
    }

    dealUserFansData = (userConcernList, userFansList) => {
        return userFansList.map(item => {
            item.isFollow = false;
            item.userImage = item.userImage ? item.userImage : require("@/asset/img/01.jpg");
            // 如果粉丝列表中存在关注的人，则显示关注标识
            const { fansPhone } = item;
            const searchEachConcern = userConcernList.findIndex(user => user.concernUserPhone === fansPhone);
            if (searchEachConcern !== -1) {
                item.isFollow = true;
            }
            return item;
        })
    }

    render() {
        const { userType } = this.props;
        return (
            <UserBaseList type="fans" 
                          userType={ userType }
                          userData={ this.state.userFansData } />
        )
    }
}
