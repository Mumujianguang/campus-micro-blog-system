import React, { Component } from 'react';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { DatePicker, Icon, message } from 'antd';
import NewsList from '@/component/share/newsList/newsList';
import BlankContent from '@/component/share/blankContent/blankContent';
import './campusNews.less';

export default class campusNews extends Component {
    state = {
        newsList: [
            {
                id: '102',
                title: '123', 
                releaseTime: '2019-02-02'
            },{
                id: '103',
                title: '123', 
                releaseTime: '2019-02-02'
            },{
                id: '104',
                title: '123', 
                releaseTime: '2019-02-02'
            }
        ],
        searchTitle: '', // 用户输入的搜索标题
        searchTime: []
    }

    // 日期选择回调 - 更新搜索的日期区间
    onRangePickerChange = (data, dataString) => {
        console.log(data, dataString);
        this.setState({
            searchTime: dataString
        })
    }

    // 更新搜索标题
    updateSearchTitle = (e) => {
        const { value } = e.target;
        this.setState({
            searchTitle: value
        }) 
    }

    // 按条件查询新闻
    searchSubmit = () => {
        const { searchTime, searchTitle } = this.state;
        if (!searchTime.length && !searchTitle) {
            message.info("您还没有输入查询条件嗷！")
            return;
        } 
        let paramsData = {}
        if (searchTitle) {
            paramsData.searchTitle = searchTitle;
        }
        if (searchTime.length) {
            paramsData.searchTime = searchTime
        }
        console.log(paramsData);
    }

    render() {
        const { RangePicker } = DatePicker;
        const { newsList, searchTitle } = this.state;
        return (
            <div className="campusNews">
                <div className="searchBox">
                    <p className="searchTitle">
                        <span className="searchTitleText">搜索看新闻</span> 
                        <Icon type="search" className="searchTitleIcon" />
                    </p>
                    <div className="searchItemBox">
                        <div className="searchItem">
                            <label htmlFor="" className="searchItemTitle">标题：</label>
                            <input type="text" 
                                   className="titleInput" 
                                   placeholder="请输入搜索的标题"
                                   value={ searchTitle }
                                   onChange={ this.updateSearchTitle } />
                        </div>
                        <div className="searchItem">
                            <span className="searchItemTitle">日期：</span>
                            <RangePicker locale={ locale } onChange={ this.onRangePickerChange } />
                        </div>
                        <div className="searchBtnBox">
                            <button className="searchBtn"
                                    onClick= { this.searchSubmit }>搜索</button>
                        </div>
                    </div>
                </div>
                <div className="newsList">
                    <p className="newsListTitle">
                        <span className="newsListTitleText">看点List</span> 
                        <Icon type="sound" className="newsListTitleIcon" />    
                    </p>
                    <div className="news">
                        {
                            newsList.length !== 0 ? 
                                newsList.map((item, index) => (
                                    <NewsList newsItem={ item } key={ item.id } />
                                )) : <BlankContent />
                        }
                        
                    </div>
                </div>
            </div>
        )
    }
}
