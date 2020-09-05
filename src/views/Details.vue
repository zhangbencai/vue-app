<template>
    <div>
        <div>
            <van-nav-bar title="商品详情" left-text="" left-arrow fixed @click-left='back'>
                <template #right>
                    <van-icon name="more" size="30" color='#ccc'/>
                </template>
            </van-nav-bar>
        </div>
        <div class="picture">
            <img :src="img.imgBaseUrl+info.img" alt="">
        </div>
        <div class="price_wrap">
            <span v-text='"￥"+info.price' class="priceTitle"></span>
        </div>
        <div class="itemName">
            <span v-text="info.name"></span>
        </div>
        <div>   
            <van-goods-action>
                <van-goods-action-icon icon="chat-o" text="客服" dot />
                <van-goods-action-icon icon="cart-o" text="购物车" badge="5" />
                <van-goods-action-icon icon="shop-o" text="店铺" badge="12" />
                <van-goods-action-button type="warning" text="加入购物车" @click="buy"/>
                <van-goods-action-button type="danger" text="立即购买" @click="buy"/>
            </van-goods-action>
        </div>
    </div>
</template>
<script>
import img from '@/utils/img'
import { 
        GoodsAction,
        GoodsActionIcon,
        GoodsActionButton ,
        NavBar,
        icon,
        Toast
    } from 'vant';
export default {
    components:{
        [GoodsAction.name]:GoodsAction,
        [GoodsActionIcon.name]:GoodsActionIcon,
        [GoodsActionButton.name]:GoodsActionButton,
        [NavBar.name]:NavBar,
        [icon.name]:icon,
        [Toast.name]:Toast
    },
    data:function(){
        return{
            info:{},
            img
        }
    },
    mounted(){
        let id = this.$route.params.id 
        let params={
            good_id:id
        }
        this.$http.getDetailsList(params).then((res)=>{
            //console.log('详情',res)
            this.info = res
        })
    },
    methods:{
        buy() {
            
            let token = localStorage.getItem('token')
            if (!token) {
                this.$router.push('/login')
            } else {
                let data = {
                    good_id: this.info._id
                }
                this.$http.getAddToCart(data).then(()=>{
                    Toast.success('添加购物车成功')
                    setTimeout(()=>{
                        this.$router.back()
                    }, 800)
                })
            }
        },
        back(){
            this.$router.back()
        }
    }
}
</script>
<style lang='scss' scoped>
.picture{
    width: 100%;
    height: 100%;
    margin-top: 1.6rem;
    img{
        width: 100%;
        height: 100%;
    }
}
.price_wrap{
    margin-top: 0.32rem;
    .priceTitle{
        line-height: 0.8rem;
        font-size: 0.426667rem;
        padding: 0 0.333333rem;
        color: #f2270c;
    }
}
.itemName{
    padding: 0 0.333333rem;
    color: #262626;
    overflow: hidden;
    font-size: 0.426667rem;
    font-family: inherit;
    line-height: 0.8rem;
}
</style>