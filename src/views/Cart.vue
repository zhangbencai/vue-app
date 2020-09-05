<template>
<div>
    <!-- 头部 -->
    <div class="car-head">
        <van-nav-bar title="购物车" left-text="" left-arrow @click-left="back" fixed>
            <template #right>
                <van-icon name="ellipsis" size="28" />
            </template>
        </van-nav-bar>
    </div>
    <!-- 商品 -->
    <div v-for='(item,index) in carList' :key='item.id' class="car-shop">
        <van-row type="flex" justify="center"  align='center'>
            <van-col span="4">
                <van-checkbox v-model="item.checked" @change="rowChange"></van-checkbox>
            </van-col>
            <van-col span="20">
                <van-swipe-cell>
                   <van-card
                        :num="item.num"
                        :price="item.good.price"
                        :desc="item.good.desc"
                        :title="item.good.name"
                        class="goods-card"
                        :thumb="img.imgBaseUrl+item.good.img"
                    >
                        <template #footer>
                            <van-button size="mini" @click='changeNum(index,item,"sub")'>-</van-button>
                            <van-button size="mini" @click='changeNum(index,item,"add")'>+</van-button>
                            <!-- <van-stepper v-model="value" integer @change='add(item.num)'/> -->
                        </template>
                   </van-card>
                        <template #right>
                            <van-button square text="删除" type="danger" class="delete-button" @click='remove(index,item)'/>
                        </template>
                </van-swipe-cell>
            </van-col>
        </van-row>
    </div>
    <!-- 底部 -->
    <div class="car-foot">
        <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit">
            <van-checkbox v-model="checked" @click="fullClick">全选</van-checkbox>
            <template #tip>
                你的收货地址不支持同城送, <span @click="onClickEditAddress">修改地址</span>
            </template>
        </van-submit-bar>
    </div>
</div>  
</template>

<script>
import img from "@/utils/img"
import{	NavBar,
				icon ,
				SubmitBar,
				checkbox,
				Card,
				tag,
				button,
				Stepper,
				Col, 
				Row,
                SwipeCell,
                Toast
			} from 'vant';
export default {
    name: 'Cart',
    data: function() {
        return {
            checked:false,
            carList:[],
            img
        }
    },
    components: {
       [NavBar.name]:NavBar,
       [icon.name]:icon,
       [SubmitBar.name]:SubmitBar,
       [checkbox.name]:checkbox,
       [Card.name]:Card,
       [tag.name]:tag,
       [button.name]:button,
       [Stepper.name]:Stepper,
       [Col.name]:Col,
       [Row.name]:Row,
       [SwipeCell.name]:SwipeCell,
       [Toast.name]:Toast
    },
    computed:{
        total:function(){
            let t =0
            this.carList.map(ele=>{
                if(ele.checked){
                    t+=ele.num * ele.good.price
                }
            })
            return t*100
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        //初始化调用购物车商品详情接口
        init(){
            this.$http.getCartList({}).then((res)=>{
                console.log('商品详情',res)
                res.map((ele,idx)=>{
                    res[idx].checked = false
                })
                this.carList = res
            })
        },
        //获取点击商品数量
        updateCartItem(idx,key,value){
            console.log(idx,key,value)
            this.carList[idx][key] = value
        },
        //行的checkbox
        rowChange(){
            let arr = this.carList.filter(ele=>ele.checked===true)
            this.checked = (arr.length === this.carList.length)
        },
        //全选按钮
        fullClick(){
            this.carList.map((ele,idx)=>{
                this.carList[idx].checked = this.checked
            })
        },
        //删除商品
        remove(idx,item){
            let parpams = {
                id:item._id
            }
            this.$http.getDeleteGood(parpams).then(()=>{
                Toast.success('删除商品成功')
                //this.init()
                this.carList.splice(idx,1)
            })
        },
        //点击按钮改变商品数量
        changeNum(idx,item,type){
            let data = {
                id:item._id,
                num:item.num
            }
            if(type === 'add'){
                data.num++
            }else{
                if(data.num===1) return
                data.num--
            }
            this.$http.getUpdateNum(data).then(()=>{
                //this.init()
                this.updateCartItem(idx,'num',data.num)
            })
        },
        //提交购物车
        onSubmit(){
           let idstr = ''
           this.carList.map(ele=>{
               if(ele.checked){
                   idstr += (';'+ele._id)
               }
           })
           this.$http.getCartSubmit({goods:idstr}).then(()=>{
               Toast.success('提交成功')
               this.init()
               this.checked = false
           })
        },
        //返回上一页
        back(){
            this.$router.back()
        },
        //修改地址
        onClickEditAddress(){
            console.log('修改地址')
        }
    }
}
</script>

<style lang='scss' scoped>
 .goods-card {
    margin: 0;
    background-color: white;
  }

  .delete-button {
    height: 100%;
  }
  .car-foot{
      margin-top: 2.2rem;
  }
	.car-head{
		margin-bottom:2.2rem ;
	}
	.car-shop{
		padding: 0.266667rem 0;
	}
.van-button{
    padding: 0.266667rem 0.4rem;
    font-size: 0.5rem;
    background-color: #ccc;
}
</style>