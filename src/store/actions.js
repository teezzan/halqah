import axios from 'axios'
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
          commit('auth_success', {token: resp.data.token, user: resp.data.user})
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
          const user = resp.data.user
          commit('user_success',user)
          resolve(resp)
        })
        .catch(err => {
          commit('user_error', err)
          localStorage.removeItem('token')
          reject(err)
        })
    })
  },

}
