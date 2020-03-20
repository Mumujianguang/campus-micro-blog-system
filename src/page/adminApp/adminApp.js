import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom';
import IndexPage from './adminComp/indexPage/indexPage';
import NewsControl from './adminComp/newsControl/newsControl';
import UploadNews from './adminComp/UploadNews/uploadNews';
import GlobalNewPage from '@/component/globalNewPage/globalNewPage';
import { store } from '@/redux';
import { Icon } from 'antd';
import './adminApp.less';

export default class AdminApp extends Component {
    state = {
        isShowGlobalNewPage: false
    }

    componentDidMount () {
        store.subscribe(() => {
            this.updateGlobalNewPage()
        })
    }

    updateGlobalNewPage = () => {
        this.setState({
            isShowGlobalNewPage: store.getState().isShowGlobalNewPage
        })
    }

    render() {
        const { isShowGlobalNewPage } = this.state;
        return (
            <div className="adminPage">
                <div className="adminTopWrapper">
                    <div className="sysTitle">微校园后台管理系统</div>
                    <div className="back" title="前往微校园">
                        <Link to="/">
                            <Icon type="logout" />
                        </Link>
                    </div>
                </div>
                <div className="adminMain">
                    <div className="adminLeftWrapper">
                        <ul className="leftControl">
                            <li className="leftControlItem">
                                <Link to="/admin/index">首页</Link> 
                            </li>
                            <li className="leftControlItem">
                                <Link to="/admin/newsControl">新闻管理</Link> 
                            </li>
                            <li className="leftControlItem">
                                <Link to="/admin/uploadNews">上传新闻</Link> 
                            </li>
                        </ul>
                    </div>
                    <div className="adminContentWrapper">
                        <Switch>
                            <Route path="/admin/index" component={ IndexPage } />
                            <Route path="/admin/newsControl" component={ NewsControl } />
                            <Route path="/admin/uploadNews" component={ UploadNews } />
                        </Switch>
                    </div>
                </div>
                {
                    isShowGlobalNewPage ? <GlobalNewPage /> : null
                }
            </div>
        )
    }
}
