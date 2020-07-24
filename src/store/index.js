import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
import { login, register } from '@/api/auth.js';
export default new Vuex.Store({
  state: {
    user: null,
    navFlag: true
  },
  mutations: {
    login(state, user) {
      state.user = user;
      localStorage.setItem('cur_user', JSON.stringify(user));
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem('cur_user');
    },
    loginFail(state) {
      state.user = null;
    },
    showNav(state) {
      state.navFlag = true;
    },
    hiddenNav(state) {
      state.navFlag = false;
    }
  },
  // action return promise
  // 执行异步操作时直接返回就可以链式调用
  actions: {
    login({commit}, {username, password}) {
      return login(username, password)
      .then(msg => {
        // console.log(msg);
        if (msg.success) {
          commit('login', msg.user);
        } else {
          commit('loginFail');
        }
      })
      .catch(() => {
        commit('loginFail');
      })
    },
    register({commit},  {username, password}) {
      return register(username, password)
      .then(msg => {
        if (msg.success) {
          let user = {username, password};
          user.id = msg.id;
          commit('login', user);
        } else {
          commit('loginFail');
        }
      })
      .catch(() => {
        commit('loginFail')
      })
    }
  },
  modules: {
    
  }
})
