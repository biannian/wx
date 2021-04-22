const request = require('../utils/request').request;
const API = {
    queryAllShop: () => request('GET', `/shop/queryAll.do`),
    queryShop: (data) => request('GET', `/shop/queryByName.do?shopName=` + data),
    queryShopInfo: (data) => request('GET', `/shop/queryShopInfo.do`,data),
    queryById: (data) => request('GET', `/shop/queryById.do?shopId=` + data),
    queryBuyerLikeShop: (data) => request('GET', `/shop/queryBuyerLikeShop.do`,data),
    queryBuyerLikeShopInfo: (data) => request('GET', `/shop/queryBuyerLikeShopInfo.do`,data),
    addBuyerLikeShop: (data) => request('GET', `/shop/addBuyerLikeShop.do`,data),
    deleteBuyerLikeShop: (data) => request('GET', `/shop/deleteBuyerLikeShop.do`,data),
    queryByType: (data) => request('GET', `/shop/queryByType.do?shopTypeId=` + data),  
    queryRiderInfo: (data) => request('GET', '/Login/queryRiderInfo.do',data),
    updateRiderInfo: (data) => request('GET', '/Login/updateRiderInfo.do',data),
    getBuyerAddress: (data) => request('GET', `/Buyer/getBuyerAddress.do?accountName=` + data),
    getAccount: () => request('GET', '/Login/getLimit.do'),
    wxLogin: (data) => request('POST', `/Login/wxLogin.do`, data),
    checkAccount: (data) => request('GET', '/Login/queryById.do?accountName=' + data),
    updatePassword: (data) => request('GET', '/Login/updatePassword.do' ,data),
    register: (data) => request('POST', '/Login/register.do', data),
    updateAddress: (data) => request('POST', '/Buyer/updateAddress.do', data),
    login: (data) => request('GET', `/Login/login.do`, data), 
    addOrder: (data) => request('POST',`/Order/addOrder.do`, data),
    selectOrder: (data) => request('GET',`/Order/selectOrder.do`, data), 
    queryOrder: (data) => request('GET',`/Order/queryOrder.do`, data),
    updateState: (data) => request('POST',`/Order/updateState.do`, data),
    riderUpdateState: (data) => request('POST',`/Order/riderUpdateState.do`, data),
    deleteOrder: (data) => request('GET',`/Order/deleteOrder.do`, data),
    
};
module.exports = {
    API: API
}