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