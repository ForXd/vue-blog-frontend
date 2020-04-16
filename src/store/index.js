import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
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
    showNav(state) {
      state.navFlag = true;
    },
    hiddenNav(state) {
      state.navFlag = false;
    }
  },
  actions: {
    // login({commit}, username, password) {
    //   A.login(username, password)
    //   .then(msg => {
    //     commit('login', { username });
    //   })
    //   .catch(err => {
    //     commit('logout')
    //   })
    // }
  },
  modules: {
    
  }
})
