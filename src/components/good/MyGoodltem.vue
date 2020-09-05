<template>
    <div class="similar-product">
        <div class="similar-posre" @touchstart='skipToDetail'>
            <img :src="img.imgBaseUrl+good.img"> 
        </div>
        <span class="similar-product-text" v-text='good.name'></span> 
        <p class="similar-product-info">
            <span class="big-price">{{good.price | rmb}}</span>
            <span class="guess-button">看相似</span>
        </p>
        <p></p>
    </div>
</template>

<script>
import img from '@/utils/img'
export default {
     props: {
        good: {
            type: Object,
            required: true
        }
    },
    data:function(){
        return{
            img,
        }
    },
    methods:{
        skipToDetail(){
            this.$router.push('./details/'+this.good._id)
        }
    }
}
</script>

<style lang="scss" scoped>
.similar-product{
    flex: 1;
    margin-left: 4px;
    width: 4.693333rem;
    height: 7.12rem;
    background-color: #fff;
    .similar-posre{
        width:4.693333rem;
        height: 4.693333rem;
        img{
            display: block;
            width: 100%;
            height: 100%;
        }
    }
    .similar-product-text{
        box-sizing: border-box;
        height: 31px;
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
        color: #232326;
        margin-top: 5px;
        line-height: 16px;
        margin-bottom: 3px;
        padding: 0 4px;
    }
    .similar-product-info{
        font-size: 13px;
        overflow: hidden;
        position: relative;
        height: 26px
    }
        .big-price{
            color: #f23030;
            display: inline-block;
            padding: 0 5px 0 4px;
            position: relative;
            top: 1px;
            height: 25px;
            line-height: 25px;
            font-size: 16px;
        }
        .guess-button{
            display: block;
            position: absolute;
            top: 0;
            right: 8px;
            text-align: center;
            color: #686868;
            font-size: 12px;
            width: 49px;
            height: 24px;
            line-height: 25px;
            border: 1px solid #e3e3e3;
        }
}
</style>