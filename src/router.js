// 模块引入
import Vue from 'vue'
import VueRouter from 'vue-router'
// 注册，使用Vue.use()注册路由
Vue.use(VueRouter)

const Home = ()=>import('@/views/Home.vue')
const Find = ()=>import('@/views/Find.vue')
const Cart = ()=>import('@/views/Cart.vue')
const User = ()=>import('@/views/User.vue')
const Details =()=>import('@/views/Details.vue')
const Register =()=>import('@/views/Register.vue')
const Login =()=>import('@/views/Login.vue')
const Jump =()=>import('@/views/Jump.vue')

const router =new VueRouter({
    routes:[
        { path: '/home', component: Home},
        { path: '/find', component: Find},
        { path: '/cart', component: Cart},
        { path: '/user', component: User},
        { path: '/details/:id',component:Details},
        { path: '/register',component:Register},
        { path: '/login',component:Login},
        { path: '/jump',component:Jump},
        { path: '/*', redirect: '/home'}
    ]
})
//全局路由守卫
router.beforeEach((to,from,next)=>{
    if(to.fullPath === '/cart' || to.fullPath === '/user'){
        let token = localStorage.getItem('token')
        if(token){
            next();
        }else{
            next('./login')
        }
    }else{
        next()
    }
})
export default router