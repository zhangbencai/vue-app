import Vue from 'vue'
import Vuex from 'vuex'

import goodStore from './modules/good'

Vue.use(Vuex)

const store= new Vuex.Store({
    modules:{
        good:goodStore
    }
})
export default store