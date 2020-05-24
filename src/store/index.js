import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    subs: state => state.user.sub,
    title: state => state.currentgroup.title,
    media: state => state.currentgroup.media,
    isAdmin: state => {
      if (state.user != undefined && state.currentgroup != undefined) { return state.currentgroup.admin.includes(state.user._id); }
      else {
        return false
      }
    }
  },
  modules: {
  }
})
