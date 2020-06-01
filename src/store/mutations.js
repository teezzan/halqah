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
    state.status = 'success'
  },
  user_error (state){
    state.user = {}
    state.token = ''
  },
  group_success (state, group ){
    state.groups = group
  },
  group_error (state){
    state.groups = []
  },
  groupOne_success (state, group ){
    state.currentgroup = group
    // console.log(group);
  },
  groupMulti_success (state, group ){
    state.user.groupSub = group
  },
  groupMultiAdmin_success (state, group ){
    state.user.groupAdmin = group
  },
  groupOne_error (state){
    state.currentgroup = {}
  },
  groupupload_error (){
    // state.currentgroup = {}
    console.log("Upload error");

  },
  error (){
    console.log("Conventional error");
  },
  token_error (state){
    state.token = ''
    state.user = {}
  }
}
