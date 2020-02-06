import { createStore, bindActionCreators } from 'redux';
import reducer from './reducer/index';
import * as baseAction from './action/baseAction';

/**
 * createStore创建数据仓库
 * @param reducer
 */
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// 创建 (具有自动分发功能的action创建函数) 
const boundActions = bindActionCreators( baseAction, store.dispatch );

export {
    boundActions,
    store
}