<template>
<div class="my-tabbar">
    <van-tabbar :route='true' active-color="#F63515" inactive-color="#000">
        <van-tabbar-item icon="home-o" to='/home'>首页</van-tabbar-item>
        <van-tabbar-item icon="search" to='/find'>发现</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart-o" to='/cart'>购物车</van-tabbar-item>
        <van-tabbar-item icon="manager-o" to='/user'>我的</van-tabbar-item>
    </van-tabbar>
</div>
</template>

<script>
import { 
    Tabbar, 
    TabbarItem,
    Icon
} from 'vant'
export default {
    components: {
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem,
        [Icon.name]:Icon
    }
}
</script>

<style lang='scss' scoped>
.my-tabbar{
    margin-top: 30px;
}
</style>