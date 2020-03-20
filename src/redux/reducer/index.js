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

const UpdateGlobalNewPageReducer = (state = false, { type }) => {
    switch (type) {
        case actionType.SHOWNEW:
            return true;
        case actionType.HIDENEW:
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
        case actionType.UPDATEUSERAVATARIMAGE:
            return {...state, userImage: payload};
        case actionType.UPDATEUSERBACKIMAGE:
            return {...state, backImage: payload};
        case actionType.DELETEUSERINFO:
            return {};
        case actionType.UPDATEUSERDYNAMICNUM:
            return {...state, dynamicNum: parseInt(state.dynamicNum) + 1 };
        case actionType.UPDATEUSERCONCERNNUM:
            return {...state, concernNum: parseInt(state.concernNum) + payload};
        default:
            return state;
    }
}

const UpdateGlobalUserPhone = (state = "", { type, payload }) => {
    switch (type) {
        case actionType.UPDATEGLOBALUSERPHONE:
            return payload;
        default:
            return state;
    }
}

const UpdateGlobalUserInfo = (state = {}, { type, payload }) => {
    switch (type) {
        case actionType.UPDATEGLOBALUSERINFO:
            return {...state, ...payload};
        default:
            return state;
    }
}

const UpdateUserConcernList = (state = [], { type, payload }) => {
    switch (type) {
        case actionType.UPDATEUSERCONCERNLIST:
            return [...payload];
        default:
            return state;
    }
}

const UpdateUserFansList = (state = [], { type, payload }) => {
    switch (type) {
        case actionType.UPDATEUSERFANSLIST:
            return [...payload];
        default:
            return state;
    }
}
// 全局用户页面 用户关注列表
const UpdateGlobalUserConcernList = (state = [], { type, payload }) => {
    switch (type) {
        case actionType.UPDATEGLOBALEUSERCONCERNLIST:
            return [...payload];
        default:
            return state;
    }
}

const UpdatePreviewData = (state = {}, { type, payload }) => {
    switch (type) {
        case actionType.UPDATEPREVIEWDATA:
            return {...payload};
        default:
            return state;
    }
}

export default combineReducers({
    loginState: UpdateLoginStateReducer,
    autoLogin: UpdateLoginModeReducer,
    isShowGlobalUserPage: UpdateGlobalUserPageReducer,
    isShowGlobalNewPage: UpdateGlobalNewPageReducer,
    userInfo: UpdateUserInfoReducer,
    userConcernList: UpdateUserConcernList,
    userFansList: UpdateUserFansList,
    globalUserPhone: UpdateGlobalUserPhone,
    globalUserInfo: UpdateGlobalUserInfo,
    globalUserConcernList: UpdateGlobalUserConcernList,
    previewNewsData: UpdatePreviewData
})