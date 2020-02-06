import * as defaultData from '@/asset/defaultData';

function covertToDynamicInfo (info) {
    let { 
        topic, 
        userNick, 
        userImage, 
        read_num, 
        like_num, 
        type, 
        push_date,   
        from_releasetime, 
        from_user, 
        id,
        content
    } = info;

    if (type === 'init') {
        content = {
            text: content
        }
    }
    if (type === 'bigImg') {
        content = {
            text: content,
            imgSrc: info.imgFilePath[0].filepath
        }
    }
    if (type === 'nineImg') {
        content = {
            text: content,
            imgSrcArr: Object.values(info.imgFilePath[0]) 
        }
    }
    // 返回组件所需的动态数据
    return {
        id,
        topic,
        refFrom: {
            userNick: from_user,
            releaseTime: from_releasetime
        },
        type,
        imgSrc: userImage || defaultData.userImg,
        userNick,
        content,
        releaseTime: push_date,
        readNum: read_num,
        likeNum: like_num,
        commentList: []
    }
}

export default {
    covertToDynamicInfo
}