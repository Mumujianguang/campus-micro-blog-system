import * as actionTypes from './action-type';


/**
 * action创建函数
 */
export const createShowGlobalUserPage = () => ({
    type: actionTypes.SHOW,
})

export const createHideGlobalUserPage = () => ({
    type: actionTypes.HIDE,
})

// 更新登录模式
export const createUpdateLoginMode = (payload) => ({
    type: actionTypes.UPDATELOGINMODE,
    payload
})

// 更新登录状态
export const createUpdateLoginState = (payload) => ({
    type: actionTypes.LOGINSTATE,
    payload
})

// 初始化用户数据
export const createInitUserInfo = (payload) => ({
    type: actionTypes.INITUSERINFO,
    payload
})

// 更新用户数据
export const createUpdateUserInfo = (payload) => ({
    type: actionTypes.UPDATEUSERINFO,
    payload
})

// 清空用户数据
export const createDeleteUserInfo = () => ({
    type: actionTypes.DELETEUSERINFO
})