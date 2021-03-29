import Vue from 'vue'
import Vuex from 'vuex'
//持久化
// import createPersistedState from "vuex-persistedstate"
//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
    state: {
        dbTask_data: '',
    },
    getters: {
        getDbTaskData: state => {
            return state.dbTask_data;
        },
    },
    mutations: {
        setDbTaskData(state, n) {
            state.dbTask_data = n
        },
    },
    // plugins: [createPersistedState()]
})

export default store