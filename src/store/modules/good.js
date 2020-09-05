export default {
    namespaced:true,
    state:{
        find:{}
    },
    getters:{},
    mutations:{
        updateFind(state,payload){
            state.find[payload.idx] = payload.list
        },
        clearFind(state){
            state.find={}
        }
    },
    actions:{}
}