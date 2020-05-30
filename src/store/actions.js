import axios from 'axios'
// axios.defaults.baseURL ="";

export default {
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({ url: 'https://halqah.herokuapp.com/api/auth/login', data: user, method: 'POST' })
        .then(resp => {
          // console.log(resp)
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common['x-access-token'] = token
          console.log(user);
          commit('auth_success', { token: resp.data.token, user: resp.data.user })
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
    })
  },
  register({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({ url: 'https://halqah.herokuapp.com/api/auth/register', data: user, method: 'POST' })
        .then(resp => {
          console.log(resp)
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common['x-access-token'] = token
          commit('auth_success', token, user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err)
        })
    })
  },
  logout({ commit }) {
    return new Promise((resolve) => {
      commit('logout')
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['x-access-token']
      resolve()
    })
  },
  getuser({ commit }) {
    return new Promise((resolve, reject) => {
      // commit('auth_request')
      axios({ url: 'https://halqah.herokuapp.com/api/auth/me', method: 'GET' })
        .then(resp => {
          console.log(resp)
          commit('user_success', resp.data)
          resolve(resp)
        })
        .catch(err => {
          commit('user_error', err)
          localStorage.removeItem('token')
          reject(err)
        })
    })
  },
  getgroup({ commit }) {
    return new Promise((resolve, reject) => {
      // commit('auth_request')
      axios({ url: 'https://halqah.herokuapp.com/api/group', method: 'GET' })
        .then(resp => {
          console.log(resp)
          commit('group_success', resp.data)
          resolve(resp)
        })
        .catch(err => {
          commit('group_error', err)
          console.log("error: ")
          reject(err)
        })
    })
  },
  getOnegroup({ commit }, id) {
    return new Promise((resolve, reject) => {
      // commit('auth_request')
      axios({ url: `https://halqah.herokuapp.com/api/group/${id}`, method: 'GET' })
        .then(resp => {
          console.log(resp)
          commit('groupOne_success', resp.data)
          resolve(resp)
        })
        .catch(err => {
          commit('groupOne_error', err)
          console.log("error: ")
          reject(err)
        })
    })
  },
  uploadFile1({ commit }, payload) {
    // axios.defaults.baseURL ="";
    return new Promise((resolve, reject) => {
      axios.post(`https://halqah.herokuapp.com/api/group/${payload.id}/upload`, payload.data)
        .then(resp => {
          commit('groupOne_success', resp.data);
          console.log("post successful");
          resolve(resp);
        })
        .catch(err => {
          commit('groupupload_error', err)
          console.log("error: ")
          reject(err)
        })
    })
  },
  uploadFile({ commit }, payload) {
    // axios.defaults.baseURL ="";
    return new Promise((resolve, reject) => {
      // commit('auth_request')
      axios({ url: `https://halqah.herokuapp.com/api/group/${payload.id}/upload`, data: payload.data, method: 'POST' })
        .then(resp => {
          console.log(resp)
          commit('groupOne_success',resp.data);
          resolve(resp)
        })
        .catch(err => {
          commit('groupupload_error', err)
          console.log(err)
          reject(err)
        })
    })
  },
  subscribe({ commit }, payload) {
    return new Promise((resolve, reject) => {
      // commit('auth_request')
      axios({ url: `https://halqah.herokuapp.com/api/group/${payload.id}/sub`, method: 'GET' })
        .then(resp => {
          console.log(resp)
          commit('user_success', resp.data)
          resolve(resp)
        })
        .catch(err => {
          commit('error', err);
          reject(err)
        })
    })
  },
  unsubscribe({ commit }, payload) {
    return new Promise((resolve, reject) => {
      // commit('auth_request')
      axios({ url: `https://halqah.herokuapp.com/api/group/${payload.id}/unsub`, method: 'GET' })
        .then(resp => {
          console.log(resp)
          commit('user_success', resp.data)
          resolve(resp)
        })
        .catch(err => {
          commit('error', err);
          reject(err)
        })
    })
  },
  deleteFile({ commit }, payload) {
    return new Promise((resolve, reject) => {
      // commit('auth_request')
      axios({ url: `https://halqah.herokuapp.com/api/group/${payload.id}/media/del/${payload.media_id}`, method: 'GET' })
        .then(resp => {
          commit('groupOne_success', resp.data);
          resolve(resp)
        })
        .catch(err => {
          commit('error')
          reject(err)
        })
    })
  },
  creategroup({ commit }, group) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({ url: 'https://halqah.herokuapp.com/api/group/register', data: group, method: 'POST' })
        .then(resp => {
          console.log(resp)
          commit('groupOne_success', resp.data)
          resolve(resp)
        })
        .catch(err => {
          commit('error', err);
          reject(err)
        })
    })
  },

}
