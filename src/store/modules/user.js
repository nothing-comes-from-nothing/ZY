//获取管理员列表
import {
  getUser,
  Login,
  getTotal
} from '@/request/user'

export default {
  namespaced: true,
  state: {
    userlist: [],
    page: 1, //页码数
    size: 1, //某页数量
    total: 0 //总条数
  },
  getters: {
    userlist: state => state.userlist,
    page: state => state.page,
    size: state => state.size,
    total: state => state.total
  },
  mutations: {
    SET_LIST(state, data) {
      state.userlist = data;
    },
    SET_PAGE(state, data) {
      state.page = data;
    },
    SET_SIZE(state, data) {
      state.size = data;
    },
    SET_TOTAL(state, data) {
      state.total = data;
    },
  },
  actions: {
    // 请求管理员列表的数据！
    async get_user_list({
      commit,
      state,
      dispatch
    }) {
      let res = await getUser(state.size, state.page);
      commit('SET_LIST', res)
      //请求数量
      dispatch('get_user_total')
    },
    //获取管理员总数
    async get_user_total({
      commit
    }) {
      let res = await getTotal();
      commit('SET_TOTAL', res)
    },
    set_page({
      commit,
      dispatch
    }, data) {
      commit('SET_PAGE', data)
      dispatch('get_user_list')
    },
    set_size({
      commit,
      dispatch
    }, data) {
      commit('SET_SIZE', data)
      dispatch('get_user_list')
    },
    async login({
      commit
    }, data) {
      let res = await Login(data)
    }
  }
};
