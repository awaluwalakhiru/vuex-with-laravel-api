import Vue from 'vue'
import Vuex from 'vuex'
import visitors from './modules/visitors'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        visitors
    }
})
