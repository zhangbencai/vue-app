import axios from './fetch'

export function getCnodeList(params){
    return axios({
        url:'/topics',
        method:'GET',
        params
    })
}

//首页商品列表
export function getGoodList(params){
    return axios({
        url:'/jd/getHotGoodList',
        method:'GET',
        params
    })
}

//详情列表{ good_id }
export function getDetailsList(params){
    return axios({
        url:'/jd/getGoodDetail',
        method:"GET",
        params
    })
}

//注册 {username, password, password2 }
export function getRegist(data){
    return axios({
        url: '/users/cms/register',
        method: 'POST',
        data
    })
}

//登入 {username, password }
export function getLogin(data){
    return axios({
        url: '/users/cms/login',
        method: 'POST',
        data
    })
}

//添加购物车
export function getAddToCart(data){
    return axios({
        url:'/jd/addToCart',
        method:'POST',
        data
    })
}
//获取购物车列表
export function getCartList(params){
    return axios({
        url: '/jd/getCartList',
        method: 'GET',
        params
    })
}

//修改购物车商品数量{num, id}
export function getUpdateNum(data){
    return axios({
        url: '/jd/updateCartNum',
        method: 'POST',
        data
    })
}

//删除购物车商品
export function getDeleteGood(params){
    return axios({
        url: '/jd/deleteToCart',
        method: 'GET',
        params
    })
}

//提交购物车{goods}这个入参是商品的_id拼接成字符串
export function getCartSubmit(data){
    return axios ({
        url: '/jd/submitToCart',
        method: 'POST',
        data
    })
}

//获取所有品类
export function getAllCates(params){
    return axios ({
        url: '/jd/getAllCates',
        method: 'GET',
        params
    })
}

//用cate品类查询所有商品 {cate}
export function getGoodsOfCate(params){
    return axios({
        url: '/jd/getCateGoodList',
        method: 'GET',
        params
    })
}

//获取轮播图
export function getShow(params){
    return axios({
        url:'jd/ads/all',
        method:'GET',
        params
    })
}
export default {
    getCnodeList,
    getGoodList,
    getDetailsList,
    getAddToCart,
    getRegist,
    getLogin,
    getCartList,
    getUpdateNum,
    getDeleteGood,
    getCartSubmit,
    getAllCates,
    getGoodsOfCate,
    getShow
}