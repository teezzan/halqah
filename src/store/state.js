export default {
  status: '',
  token: localStorage.getItem('token') || '',
  user: {},
  groups: [],
  currentgroup: {},
  currentuser: {},
  playerShown: false,
  source: "http://localhost:8090/megumins_explosion.mp3",
  playing: false
}
