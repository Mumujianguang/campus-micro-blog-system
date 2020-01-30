import React, { Component } from 'react';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { DatePicker, Icon } from 'antd';
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
        ]
    }
    onRangePickerChange = (data, dataString) => {
        console.log(data, dataString);
    }
    render() {
        const { RangePicker } = DatePicker;
        const { newsList } = this.state;
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
                            <input type="text" className="titleInput" placeholder="请输入搜索的标题" />
                        </div>
                        <div className="searchItem">
                            <span className="searchItemTitle">日期：</span>
                            <RangePicker locale={ locale } onChange={ this.onRangePickerChange } />
                        </div>
                        <div className="searchBtnBox">
                            <button className="searchBtn">搜索</button>
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
