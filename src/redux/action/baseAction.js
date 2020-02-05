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
