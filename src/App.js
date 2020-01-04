import React from 'react';
import Nav from './component/nav/index';
import './App.less';
import 'antd/dist/antd.css';


export default class App extends React.Component {
    constructor (prop) {
        super();
    }


    render () {
        return (
            <div className="appWrapper">
                <div className="Header">
                    <Nav />
                </div>
                <div className="Content">123</div>
            </div>
        );
    }
}