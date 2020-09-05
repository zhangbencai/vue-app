<template>
    <div>
        <van-nav-bar
            left-text="返回"
            right-text="按钮"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
        >
        <template #title>
            <van-search
                v-model="value"
                placeholder="请输入搜索关键词"
                input-align="center"
            />
        </template>
        </van-nav-bar>
    </div>
</template>
<script>
import { NavBar ,Search} from 'vant';
export default {
    data:function(){
        return{
            value:''
        }
    },
    components:{
        [NavBar.name]:NavBar,
        [Search.name]:Search
    },
    methods:{
        //返回上级
        onClickLeft(){
            this.$router.back()
        },
        //搜索
        onClickRight(){
            
        }
    }
}
</script>
<style scoped>

</style>