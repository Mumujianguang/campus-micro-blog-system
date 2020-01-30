import * as actionType from '../action/action-type';
import { combineReducers } from 'redux';

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

export default combineReducers({
    isShowGlobalUserPage: UpdateGlobalUserPageReducer
})