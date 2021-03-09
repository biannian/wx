const request = require('../utils/request').request;
const API = {
    queryAllShop:() => request('GET', `/shop/queryAll.do`),
    queryShop:(data) => request('GET', `/shop/queryByName.do?shopName=`+data),
    queryById:(data) => request('GET',`/shop/queryById.do?shopId=`+data)
};
module.exports = {
    API: API
}