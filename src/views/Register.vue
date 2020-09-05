<template>
    <div>
        <div class="car-head">
            <van-nav-bar title="京东注册" left-text="" left-arrow @click-left="back" fixed>
            </van-nav-bar>
        </div>  
        <div class="input-container">
                <van-field
                    v-model.trim="username"
                    name="用户名"
                    label="用户名"
                    placeholder="用户名"
                />
                <van-field
                    v-model.trim="password"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                />
                <van-field
                    v-model.trim="password2"
                    type="password"
                    name="密码"
                    label="再次输入密码"
                    placeholder="密码"
                />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit" @touchstart='confirm'>注册</van-button>
                </div>
        </div>
    </div>
</template>
<script>
import { Form ,field,button,NavBar,Toast} from 'vant';
export default {
    components:{
        [Form.name]:Form,
        [field.name]:field,
        [button.name]:button,
        [NavBar.name]:NavBar,
        [Toast.name]:Toast
    },
    data:function(){
        return{
            username:'',
            password:'',
            password2:''
        }
    },
    methods:{
        confirm(){
            let data = {
                username: this.username,
                password: this.password,
                password2: this.password2
            }
            this.$http.getRegist(data).then((err)=>{
                    if(err.err === 1){
                         Toast.fail(err.msg);
                    }else{
                         Toast.success('恭喜你注册成功');
                        setTimeout(()=>{
                            this.$router.push('/login')
                        },3000)
                    }
            })
        },
        back(){
            this.$router.back()
        }
    }
}
</script>
<style lang='scss' scoped>
.input-container{
    margin-top: 1.8rem;
}
</style>