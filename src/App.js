import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserApp from '@/page/userApp/userApp';
import AdminApp from '@/page/adminApp/adminApp';

export default class App extends Component {

    routeChange = (location) => {
        console.log(location);
    }

    render() {
        return (
            // 路由
            <BrowserRouter basename="/">
                <Switch>
                    <Route path="/admin" component={ AdminApp } />
                    <Route path="/" component={ UserApp } />
                </Switch>               
            </BrowserRouter>
        )
    }
}
