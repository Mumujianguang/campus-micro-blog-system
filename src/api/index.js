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
    return axios.post(`${apiPath}/userRegister`, postData)
}

// 检验昵称唯一性
function checkUserNick (userNick) {
    return axios.get(`${apiPath}/checkUserNick?userNick=${userNick}`);
}

// 检验手机号唯一性
function checkPhone (phone) {
    return axios.get(`${apiPath}/checkPhone?phone=${phone}`);
}


export default {
    login,
    register,
    checkUserNick,
    checkPhone
}