import React, { Component } from 'react';
import { Table, message, Modal } from 'antd';
import api from '@/api';
import uuid from 'uuid';
import './newsControl.less';

const { confirm } = Modal;
export default class index extends Component {
    state = {
        newsList: [],
        selectedRows: [],
        searchTitle: '' // 用户输入的搜索标题
    }

    // 更新搜索标题
    updateSearchTitle = (e) => {
        const { value } = e.target;
        this.setState({
            searchTitle: value
        }) 
    }

    searchSubmit = () => {
        const { searchTitle } = this.state;
        if (!searchTitle) {
            this.getNewsList();
            return;
        }
        const paramsData = {
            searchTitle
        }
        api.searchNews(paramsData).then(result => {
            if (result.data.msg === 'ok') {
                let { data } = result.data;
                data = this.createNewsListData(data);
                this.setState({
                    newsList: data
                })
            }
        })
    }

    // 构造新闻列表数据
    createNewsListData (data) {
        data = data.map(item => {
            let time = item.newsDate;
            time = new Date(time).toLocaleDateString();
            time = time.replace(/\//g, '-');
            return {
                id: item.id,
                title: item.newsTitle,
                newsFrom: item.newsFrom,
                releaseTime: time
            };
        })
        return data;
    }

    // 获取新闻列表
    getNewsList () {
        api.getNewsBaseInfo().then(result => {
            console.log(result);
            if (result.data.msg === 'ok') {
                let { data } = result.data;
                data = this.createNewsListData(data);
                this.setState({
                    newsList: data
                })
            }
        })
    }

    deleteNews = () => {
        const { selectedRows } = this.state;
        if (!selectedRows.length) return;
        const targetNewsIdArr = selectedRows.map(item => item.id);
        console.log(targetNewsIdArr);
        api.deleteNews({ targetNewsIdArr }).then(result => {
            console.log(result);
            if (result.data.msg === 'ok') {
                message.success('删除成功！');
                this.setState({
                    modalVisible: false
                })
                this.getNewsList();
            }
        })
    }


    showConfirm = () => {
        const { newsList, selectedRows } = this.state;

        if (!newsList.length) {
            message.info("当前没有数据");
            return;
        }
        if (!selectedRows.length) {
            message.info("当前没有选中数据");
            return;
        }
        confirm({
            title: '确认要删除吗?',
            onOk: () => {
                this.deleteNews();
            },
            onCancel() {},
        });
    }

    componentDidMount () {
        this.getNewsList();
    }


    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(selectedRows);
          this.setState({
            selectedRows
          })
        }
    }

    columns = [
        {
            title: '标题',
            dataIndex: 'title'
        },
        {
            title: '来自',
            dataIndex: 'newsFrom',
        },
        {
          title: '发布时间',
          dataIndex: 'releaseTime',
        },
      ];

    render() {
        const { searchTitle, newsList } = this.state;
        return (
            <div className="newsControl">
                <p className="titleText">新闻管理</p>
                <div className="searchItemBox">
                    <div className="searchItem">
                        <label htmlFor="" className="searchItemTitle">标题：</label>
                        <input type="text" 
                                className="titleInput" 
                                placeholder="请输入搜索的标题"
                                value={ searchTitle }
                                onChange={ this.updateSearchTitle } />
                    </div>
                    <div className="searchBtnBox">
                        <button className="searchBtn"
                                onClick= { this.searchSubmit }>搜索</button>
                    </div>
                </div>
                <div className="newsList">
                    <Table rowSelection={this.rowSelection}
                           rowKey={ uuid() }
                           columns={this.columns} 
                           dataSource={newsList}
                           pagination={{
                                defaultPageSize: 5
                           }} />
                </div>
                <div className="manageBox">
                    <div className="deleteBtn"
                         onClick={ this.showConfirm }>
                         删除
                    </div>
                </div>
            </div>
        )
    }
}
