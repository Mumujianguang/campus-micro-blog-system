import React, { Component } from 'react';
import { Input, Icon, message } from 'antd';
import EventPoint from './eventPoint/eventPoint';
import { boundActions } from '@/redux';
import uuid from 'uuid';
import tools from '@/tools';
import './uploadNews.less';
import api from '../../../../api';

export default class UploadNews extends Component {
    state = {
        newsTitle: '',
        newsFrom: '',
        eventPointList: [
            {
                content: '',
                image: ''
            }
        ]
    }
    // 更新新闻标题
    updateNewsTitle = (e) => {
        const { value } = e.target;
        this.setState({
            newsTitle: value
        })
    }
    // 更新新闻来源
    updateNewsFrom = (e) => {
        const { value } = e.target;
        this.setState({
            newsFrom: value
        })
    } 
    // 添加节点
    addEventPoint = () => {
        const eventPointList = [...this.state.eventPointList];
        eventPointList.push({
            content: '',
            image: ''
        })
        this.setState({
            eventPointList
        })
    }
    // 删除节点
    delEventPoint = (index) => {
        const eventPointList = [...this.state.eventPointList];
        eventPointList.splice(index, 1)
        this.setState({
            eventPointList
        })
    }
    // 更新节点内容
    updatePointContent = (content, index) => {
        const eventPointList = [...this.state.eventPointList];
        eventPointList[index].content = content
        this.setState({
            eventPointList
        })
    }
    // 更新节点图片
    updatePointImage = (image, index) => {
        const eventPointList = [...this.state.eventPointList];
        eventPointList[index].image = image[0]
        this.setState({
            eventPointList
        })
    }
    // 上传
    uploadNews = () => {
        const { newsTitle, newsFrom, eventPointList } = this.state;
        const newsId = uuid(); // 生成uuid
        const nowTime = tools.getCurTime(); // 获取当前时间

        // 新闻表头数据
        const formData_head = {
            id: newsId,
            nowTime: nowTime,
            title: newsTitle,
            from: newsFrom
        }

        // 新闻内容数据
        const formData_content = {
            id: newsId
        }

        // 新闻图片数据
        const formData_img = new FormData();
        formData_img.append("id", newsId);
        
        eventPointList.forEach((item, index) => {
            formData_content[`newsContent${index + 1}`] = item.content;
            formData_img.append(`newsImage`, item.image);
        })

        // 异步任务数组
        const promiseTaskArr = [
            api.uploadNewsList_head(formData_head),
            api.uploadNewsList_content(formData_content),
            api.uploadNewsList_img(formData_img),
        ]
        
        Promise.all(promiseTaskArr).then(result => {
            console.log(result);
            const flag = result.every(item => item.data.msg === "ok");
            if (!flag) {
                message.error("发布失败！")
            }
            message.success("发布成功！");
            // 发布成功重置编辑面板
            this.setState({
                newsTitle: '',
                newsFrom: '',
                eventPointList: []
            })
            this.addEventPoint();
        })
    }
    // 预览
    previewNewPage = async () => {
        let { newsTitle, newsFrom, eventPointList } = this.state;
        const nowTime = tools.getCurTime();

        eventPointList = eventPointList.map(async item => {
            let image = '';
            if (item.image) {
                image = await tools.imageToBase64(item.image)
            }      
            return {
                ...item,
                image
            };
        })

        eventPointList = await Promise.all(eventPointList);

        const previewData = {
            newsTitle,
            newsFrom,
            newsTime: nowTime,
            eventPointList
        }
        console.log(previewData);
        boundActions.createUpdatePreviewData(previewData);
        boundActions.createShowGlobalNewPage();
    }

    render() {
        const { newsTitle, newsFrom, eventPointList } = this.state;
        return (
            <div className="uploadNews">
                <p className="titleText">上传新闻</p>
                <div className="addNewsBox">
                    <div className="newsTitle">
                        <span>新闻标题：</span>
                        <Input placeholder="请输入新闻标题"
                               value={ newsTitle }
                               onChange={ this.updateNewsTitle } />
                    </div>
                    <div className="newsFrom">
                        <span>新闻来源：</span>
                        <Input placeholder="请输入新闻来源" 
                               value={ newsFrom }
                               onChange={ this.updateNewsFrom } />
                    </div>
                    <div className="eventPointBox">
                        <p>内容节点：</p>
                        {
                            eventPointList.map((item, index) => (
                                <EventPoint eventPointItem={ item } 
                                            index={ index } 
                                            key={ index }
                                            delEventPoint={ this.delEventPoint }
                                            updatePointContent={ this.updatePointContent }
                                            updatePointImage={ this.updatePointImage } />
                            ))
                        }
                    </div>
                    <div className="addEventPoint" 
                         title="添加内容节点" 
                         onClick={ this.addEventPoint }>
                        <Icon type="plus-circle" />
                    </div>
                </div>
                <div className="uploadNewsBtn">
                    <button className="btn" onClick={ this.previewNewPage }>预览</button>
                    <button className="btn" onClick={ this.uploadNews }>上传</button>
                </div>
                
            </div>
        )
    }
}
