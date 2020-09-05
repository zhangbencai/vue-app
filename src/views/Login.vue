<template>
    <div>
         <div class="car-head">
            <van-nav-bar title="京东登录注册" left-text="" left-arrow @click-left="back" fixed>
            </van-nav-bar>
        </div>  
        <div class="input-container">
                <van-field
                    v-model="username"
                    name="用户名"
                    label="用户名"
                    placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]"
                />
                <van-field
                    v-model="password"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit" @touchstart='confirm'>登录</van-button>
                </div>
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit" @click="register" >注册</van-button>
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
        }
    },
    methods:{
        confirm(){
             let data = {
                username: this.username,
                password: this.password
            }
            this.$http.getLogin(data).then((res)=>{
                if(res.err === 1){
                    Toast.fail('账号或密码错误');
                }else{
                    localStorage.setItem('token', res.token)
                    Toast.success('恭喜你登录成功');
                    this.$router.push('/home')
                }
            })
        },
        back(){
            this.$router.back()
        },
        register(){
            this.$router.push('/register')
        }
    }
}
</script>
<style lang='scss' scoped>
.input-container{
    margin-top: 1.8rem;
}
</style>