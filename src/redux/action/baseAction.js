import * as actionTypes from './action-type';


/**
 * action创建函数
 */
export const createShowGlobalUserPage = () => ({
    type: actionTypes.SHOW
})

export const createHideGlobalUserPage = () => ({
    type: actionTypes.HIDE
})

export const createShowGlobalNewPage = () => ({
    type: actionTypes.SHOWNEW
})

export const createHideGlobalNewPage = () => ({
    type: actionTypes.HIDENEW
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

// 更新用户头像
export const createUpdateUserAvatarImage = (payload) => ({
    type: actionTypes.UPDATEUSERAVATARIMAGE,
    payload
})
// 更新用户背景图片
export const createUpdateUserBackImage = (payload) => ({
    type: actionTypes.UPDATEUSERBACKIMAGE,
    payload
})
// 用户更新动态时更新用户信息中的动态总数
export const createUpdateUserDynamicNum = () => ({
    type: actionTypes.UPDATEUSERDYNAMICNUM
})
// 更新用户信息中的关注数
export const createUpdateUserConcernNum = (payload) => ({
    type: actionTypes.UPDATEUSERCONCERNNUM,
    payload
})

// 当前全局用户页面的用户号
export const createUpdateGlobalUserPhone = (payload) => ({
    type: actionTypes.UPDATEGLOBALUSERPHONE,
    payload
})
// 当前全局用户页面的用户信息
export const createUpdateGlobalUserInfo = (payload) => ({
    type: actionTypes.UPDATEGLOBALUSERINFO,
    payload
})
// 当前全局用户页面的关注列表
export const createUpdateGlobalUserConcernList = (payload) => ({
    type: actionTypes.UPDATEGLOBALEUSERCONCERNLIST,
    payload
})
// 更新用户的关注列表
export const createUpdateUserConcernList = (payload) => ({
    type: actionTypes.UPDATEUSERCONCERNLIST,
    payload
})
// 更新用户的粉丝列表
export const createUpdateUserFansList = (payload) => ({
    type: actionTypes.UPDATEUSERFANSLIST,
    payload
})

export const createUpdatePreviewData = (payload) => ({
    type: actionTypes.UPDATEPREVIEWDATA,
    payload
})





