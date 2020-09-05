<template>
<div class="find">
    <!-- 头部 -->
    <van-nav-bar left-text="" left-arrow fixed @click-left='back'>
        <template #right>
            <van-search shape="round" placeholder="请输入搜索关键词"/>
        </template>
    </van-nav-bar>
    <!-- 品类列表 -->
    <div class="find-left">
        <div
            v-for = '(item,index) in cates'
            :key = 'item.id'
            v-text='item.cate_zh'
            @touchstart='touch(index,item)'
            :class='{"on": curIdx==index}'
        >
        </div>
    </div>
    <!-- 详情列表 -->
    <div class="find-right">
        <van-grid :column-num="3">
            <van-grid-item v-for="item in goodArr" :key="item._id">
                <van-image :src="img.imgBaseUrl+item.img" />
                <div v-text='item.name'></div>
            </van-grid-item>
        </van-grid>
    </div>
    <MyTabbar />
</div>  
</template>

<script>
import { MyTabbar } from '@/components/'
import { NavBar,Search,Grid, GridItem ,Image} from 'vant';
import {mapMutations,mapState} from 'vuex'
import img from '@/utils/img'
export default {
    name: 'Find',
    data: function() {
        return {
            curIdx:0,
            cates:[],
            goodArr:[],
            img
        }
    },
    components: {
        MyTabbar,
        [NavBar.name]:NavBar,
        [Search.name]:Search,
        [Grid.name]:Grid,
        [GridItem.name]:GridItem,
        [Image.name]:Image
    },
    computed:{
        ...mapState('good',['find'])
    },
    mounted(){
        this.init()
    },
    beforeDestory(){
        this.clearFind()
    },
    methods:{
        ...mapMutations('good',['updateFind','clearFind']),
        async init(){
            let arr = await this.$http.getAllCates({})
            this.cates = arr
            let params = {cate:arr[0].cate}
            console.log('aaa',params)
            this.$http.getGoodsOfCate(params).then((res)=>{
                this.goodArr = res
                this.updateFind({idx:0,list:res})
            })
        },
        touch(idx,item){
            this.curIdx =idx
            let params = {cate:item.cate}
            console.log('bbb',params)
            // 缓存实现
            // 当前品类在状态管理中有数据
            if(this.find[idx] && this.find[idx].length){
                // 不调接口，直接使用缓存中的数据
                this.goodArr = this.find[idx]
            }else{
                // 如果缓存系统中没有，要调接口
                this.$http.getGoodsOfCate(params).then(res=>{
                    // 更新goodArr
                    this.goodArr = res
                    this.updateFind({idx,list:res})
                })
            }
        },
        back(){
            console.log("aaa")
            this.$router.back()
        }
    }
}
</script>

<style lang='scss' scoped>
html body{
    margin: 0;
    padding: 0;
}
.find{
    width: 100%;
    height: 100%;
    position: relative;
    margin-top: 1.6rem;
    .find-left{
        position: absolute;
        top: 0;
        left: 0;
        width: 2.266667rem;
        background-color: #f8f8f8; 
        &>div{
            font-size: 0.4rem;
            line-height: 1.226667rem;
            text-align: center;
            color: #333333;
        }
        &>div.on{
            color: #e93b3d;
            background-color: #ffffff;
        }
    }
    .find-right{
        position: absolute;
        top: 0;
        left: 2.466667rem;
        .van-grid-item{
            font-size: 0.4rem;
            line-height: 0.666667rem;
            text-align: center;
                .van-image{
                width: 1.866667rem;
                height: 1.866667rem;
                    img {
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }
        }
    }
}
</style>