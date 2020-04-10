import React, { Component } from 'react';
import UserBaseList from '../userBaseList/userBaseList';
import { store, boundActions } from '@/redux/index';
import CookieController from 'js-cookie';
import api from '@/api';

export default class userFollow extends Component {
    state = {
        userFollowData: []
    }
    componentDidMount () {
        this.props.loaded();
        const { userType } = this.props;
        if (userType === "other") {
            const { globalUserPhone } = store.getState();
            api.getUserConcernList(globalUserPhone).then(result => {
                const { concernList } = result.data;
                const userFollowData = this.dealFollowData(concernList);
                this.setState({
                    userFollowData
                })
                // 存入store
                boundActions.createUpdateGlobalUserConcernList(concernList);
            });
            return;
        }
        // store.subscribe(() => {
        //     this.setUserFollowData()
        // })
        this.setUserFollowData();
    }

    UNSAFE_componentWillMount () {
        this.props.loading();
    }

    setUserFollowData = () => {
        const userPhone = CookieController.get("userPhone");
        api.getUserConcernList(userPhone).then(result => {
            const { concernList } = result.data;

            const userFollowData = this.dealFollowData(concernList)
            this.setState({
                userFollowData
            })
            // 存入store
            boundActions.createUpdateUserConcernList(concernList);
        })
        
    }

    dealFollowData = (userConcernList) => {
        return userConcernList.map(item => {
            item.isFollow = true;
            item.userImage = item.userImage ? item.userImage : require("@/asset/img/01.jpg");
            return {...item};
        })
    }

    render() {
        const { userType } = this.props;
        return (
            <UserBaseList type="follow"
                          userType={ userType }
                          userData={ this.state.userFollowData } />
        )
    }
}
