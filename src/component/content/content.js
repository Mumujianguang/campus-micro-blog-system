import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from '../views/mainPage/mainPage';
import UserPage from '../views/userPage/userPage';
import CampusNews from '../views/campusNews/campusNews';
import HotPointPage from '../views/hotPointPage/hotPointPage';

import './content.less';

export default class Content extends Component {
    
    render() {
        return (
            <div className="contentWrapper">
                <Switch>
                    <Route path="/mainPage" component={ MainPage } />
                    <Route path="/userPage" component={ UserPage } />
                    <Route path="/campusNews" component={ CampusNews } />
                    <Route path="/hotPointPage" component={ HotPointPage } />
                    <Route path="/" component={ MainPage } /> 
                </Switch>
            </div>
        )
    }
}
