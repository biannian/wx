const request = require('../utils/request').request;
const API = {
    queryAllShop: () => request('GET', `/shop/queryAll.do`),
    queryShop: (data) => request('GET', `/shop/queryByName.do?shopName=` + data),
    queryById: (data) => request('GET', `/shop/queryById.do?shopId=` + data),
    getBuyerAddress: (data) => request('GET', `/Buyer/getBuyerAddress.do?accountName=` + data),
    getAccount: () => request('GET', '/Login/getLimit.do'),
    wxLogin: (data) => request('POST', `/Login/wxLogin.do`, data),
    checkAccount: (data) => request('GET', '/Login/queryById.do?accountName=' + data),
    register: (data) => request('POST', '/Login/register.do', data),
    updateAddress: (data) => request('POST', '/Buyer/updateAddress.do', data),
    login: (data) => request('GET', `/Login/login.do`, data), 
    addOrder: (data) => request('POST',`/Order/addOrder.do`, data),
    selectOrder: (data) => request('GET',`/Order/selectOrder.do`, data), 
    queryOrder: (data) => request('GET',`/Order/queryOrder.do`, data),
};
module.exports = {
    API: API
}