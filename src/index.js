import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import './redux/index';
// 全局antd组件的国际化配置
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
// import Test from './test/test';


ReactDom.render(<App />, document.getElementById("root"));
