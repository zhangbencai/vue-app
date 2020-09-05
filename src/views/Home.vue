<template>
<div>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <!-- 通知栏 -->
    <van-notice-bar
        left-icon="volume-o"
        mode="closeable"
        text="打开京东APP，购物更轻松。打开京东APP，购物更轻松"
    />
    <!-- 搜索框 -->
    <van-search
        show-action
        shape="round"
        background="#dd6e52"
        :placeholder="text.tiele"
        input-align="left"
        disabled
        @click="jumpSearch"
        >
        <template #action>
            <div @click="onlogin">登录</div>
        </template>
    </van-search>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="img.imgBaseUrl+image.img" />
      </van-swipe-item>
    </van-swipe>
    <!-- 分割线 -->
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">为你推荐</van-divider>
    <!-- 商品列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :offset="20"
      :immediate-check='false'
    >
    <div v-for='i in length' :key='i' class='row'>
      <MyGoodltem :good='goods[2*i-2]'/>
      <MyGoodltem :good='goods[2*i-1]'/>
    </div>
  </van-list>
  </van-pull-refresh>
   <!-- 底部 -->
    <MyTabbar/>
</div>
</template>
<script>
import img from '@/utils/img'
import { MyTabbar,MyGoodltem } from '@/components/'
import { 
    NoticeBar,
    Search ,
    Swipe, 
    SwipeItem,
    Image,
    Lazyload,
    Divider,
    List,
    PullRefresh,
    Toast
    } from 'vant'

import Vue from 'vue';
Vue.use(Lazyload);
//给价格添加￥符号
Vue.filter('rmb',function(value){
    return '￥'+value
  })

export default {
    name: 'Home',
    data: function() {
        return {
          img,
          //存储轮播图图片
          images:[],
          //存储商品列表
          goods:[],
          loading: false,
          finished: false,
          refreshing: false,
          page:1,
          hintArr:[
            {id:1,tiele:'网络机顶盒'},
            {id:2,tiele:'暗影游戏本'},
            {id:3,tiele:'好奇铂金装纸尿裤'},
            {id:4,tiele:'饮水机 立式'},
            {id:5,tiele:'微软平板'}
          ]
        }
    },
    computed: {
      length: function() {
        return Math.floor(this.goods.length / 2)
      },
      text:function(){
        let arr= this.hintArr;
        return arr[Math.floor(Math.random()*arr.length)]
      }
    },
    components: {
        MyTabbar,
        MyGoodltem,
        [NoticeBar.name]:NoticeBar,
        [Search.name]: Search,
        [Swipe.name]:Swipe,
        [SwipeItem.name]:SwipeItem,
        [Image.name]:Image,
        [Divider.name]:Divider,
        [List.name]:List,
        [PullRefresh.name]:PullRefresh,
        [Toast.name]:Toast
    },
    mounted(){
      this.getList()
      // 广告列表
      this.$http.getShow({}).then(res=>{
        this.images = res.list
      })
    },
    methods:{
      //调用首页商品列表
      getList(){
        let params = {
          page:this.page,
          size:6
        }
        this.$http.getGoodList(params).then((res)=>{
          //console.log('商品列表',res)
          if(res.list.length === 0) Toast.success('亲，已经到底了')
          if(res.list.length>0){
            if(this.refreshing){
              this.goods = res.list
            }else{
              this.goods = [...this.goods,...res.list]
            }
            this.loading = false
            this. refreshing = false
          }
        })
      },
      //跳转搜索页面
      jumpSearch(){
        this.$router.push('/jump')
      },
      //点击登录按钮，跳转登录页面
        onlogin:function(){
            this.$router.push('/login')
        },
         onLoad() {
         // console.log('到底了')
          this.page++
          this.getList()
        },
        // 下拉刷新
        onRefresh() {
          this.page = 1
          this.getList()
    },
  }
}
</script>
<style lang='scss' scoped>
html body{
  padding: 0;
  margin: 0;
}
.van-notice-bar{
    background-color: #232326;
    color: white;
}
.van-search__action{
    color: #ffffff;
}
.van-swipe{
   height:3.733333rem;
  .van-swipe__track{
    width: 9.333333rem;
    height:3.733333rem;
    img{
      display: block;
      width: 100%;
      height: 100%;
    } 
  }
}
.van-divider{
  margin-top: 40px;
  font-size: 30px;
  color: #6dcefa;
}
.row{
  display: flex;
}
</style>
