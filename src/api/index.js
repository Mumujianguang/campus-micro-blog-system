import axios from 'axios';

const apiPath = "http://localhost:3001";
const baseAxios = axios.create({
    baseURL: apiPath
})

// 登录
function login (userPhone, password) {
    return baseAxios.get(`/userLogin?phone=${userPhone}&password=${password}`)
}
// 注册
function register (postData) {
    return baseAxios.post(`/userRegister`, postData)
}

// 检验昵称唯一性
function checkUserNick (userNick) {
    return baseAxios.get(`/checkUserNick?userNick=${userNick}`);
}

// 检验手机号唯一性
function checkPhone (phone) {
    return baseAxios.get(`/checkPhone?phone=${phone}`);
}

// 查询用户信息
function selectUserInfo (phone) {
    return baseAxios.get(`/selectUserInfo?phone=${phone}`)
}

// 设置用户信息
function setUserInfo (postData) {
    return baseAxios.post(`/setUserInfo`, postData)
}

// 获取话题列表
function getTopicList () {
    return baseAxios.get('/getTopicList')
}

// 获取动态列表
function getDynamicInfoByReadNum () {
    return baseAxios.get('/getDynamicInfoByReadNum')
}

// 发表动态 & 纯文本
function pushDynamic (postData) {
    return baseAxios.post('/pushDynamic', postData);
}

// 发表动态 & 大图
function pushDynamicBigImg (postData) {
    return baseAxios.post('/pushDynamicBigImg', postData);
}

// 发表动态 & 九宫格
function pushDynamicNineImg (postData) {
    return baseAxios.post('/pushDynamicNineImg', postData, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
}


export default {
    apiPath,
    login,
    register,
    checkUserNick,
    checkPhone,
    setUserInfo,
    selectUserInfo,
    getTopicList,
    getDynamicInfoByReadNum,
    pushDynamic,
    pushDynamicBigImg,
    pushDynamicNineImg
}