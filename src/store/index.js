import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import menu from '@/store/modules/menu'
import role from '@/store/modules/role'
import user from '@/store/modules/user'

let store = new Vuex.Store({
  state: {
    collapse: false, //是否折叠

  },
  getters: {

  },
  mutations: {
    PACKUP(state) {
      state.collapse = !state.collapse
    }
  },
  actions: {

  },
  modules: {
    menu,
    role,
    user

  }
})

export default store;
