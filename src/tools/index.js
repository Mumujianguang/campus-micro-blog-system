import * as defaultData from '@/asset/defaultData';

// 动态信息列表数据转换函数
function covertToDynamicInfo (info) {
    let { 
        topic, 
        userNick, 
        userImage, 
        phone,
        read_num, 
        like_num, 
        type, 
        push_date, 
        forward_num,  
        from_releasetime, 
        from_user, 
        id,
        content,
        commentList
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
        forward_num,
        type,
        imgSrc: userImage || defaultData.userImg,
        userNick,
        userPhone: phone,
        content,
        releaseTime: push_date,
        readNum: read_num,
        likeNum: like_num,
        commentList
    }
}

// 获取当前时间
function getCurTime () {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    hour = hour < 10 ? `0${hour}` : hour;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
}

// 图片转base64
function imageToBase64 (target) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(target)
        // 转换完成的回调函数
        reader.onload = (e) => {
            resolve(e.target.result);
        }
    })
}

export default {
    covertToDynamicInfo,
    getCurTime,
    imageToBase64
}