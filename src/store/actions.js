export default {
  login ({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      this.axios({ url: 'http://localhost:3000/login', data: user, method: 'POST' })
        .then(resp => {
          console.log(resp)
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          this.axios.defaults.headers.common['x-access-token'] = token
          commit('auth_success', token, user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
    })
  },
  register ({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      this.axios({ url: 'http://localhost:3000/auth/register', data: user, method: 'POST' })
        .then(resp => {
          console.log(resp)
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          this.axios.defaults.headers.common['x-access-token'] = token
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
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      commit('logout')
      localStorage.removeItem('token')
      delete this.axios.defaults.headers.common['x-access-token']
      resolve()
    })
  }

}
