import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import { store } from './redux/index';
import CookieController from 'js-cookie';
// 全局antd组件的国际化配置
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
// import Test from './test/test';

window.onbeforeunload = function () {
    const { autoLogin } = store.getState();
    console.log(autoLogin);
    if (!autoLogin) {
        CookieController.remove('userPhone');
    }
}

ReactDom.render(<App />, document.getElementById("root"));
