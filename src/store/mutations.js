export default {
  auth_request (state) {
    state.status = 'loading'
  },
  auth_success (state, payload) {
    state.status = 'success'
    state.token = payload.token
    state.user = payload.user
  },
  auth_error (state) {
    state.status = 'error'
  },
  logout (state) {
    state.status = ''
    state.token = ''
  },
  user_success (state, user ){
    state.user = user
  },
  user_error (state){
    state.user = {}
    state.token = ''
  }
}
