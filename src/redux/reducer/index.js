import * as actionType from '../action/action-type';
import { combineReducers } from 'redux';

// 更新全局遮罩面板的状态 -- 显示/隐藏
const UpdateGlobalUserPageReducer = (state = false, { type }) => {
    switch (type) {
        case actionType.SHOW:
            return true;
        case actionType.HIDE:
            return false;
        default:
            return state
    }
};
// 更新登录模式 -- 自动/手动
const UpdateLoginModeReducer = (state = false, { type, payload }) => {
    switch (type) {
        case actionType.UPDATELOGINMODE:
            return payload;
        default:
            return state
    }
}

// 更新登录状态
const UpdateLoginStateReducer = (state = false, { type, payload }) => {
    switch (type) {
        case actionType.LOGINSTATE:
            return payload;
        default:
            return state;
    }
}

// 更新用户数据
const UpdateUserInfoReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case actionType.INITUSERINFO:
            return payload;
        case actionType.UPDATEUSERINFO:
            return {...state, ...payload};
        case actionType.DELETEUSERINFO:
            return {};
        default:
            return state;
    }
}


export default combineReducers({
    loginState: UpdateLoginStateReducer,
    autoLogin: UpdateLoginModeReducer,
    isShowGlobalUserPage: UpdateGlobalUserPageReducer,
    userInfo: UpdateUserInfoReducer
})