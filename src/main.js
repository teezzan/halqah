import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import XnsAudioPlayerSimple from 'xns-audio-player-simple'
import VueFileAgent from 'vue-file-agent'
import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css'
import VueAudio from 'vue-audio-better'
import vuetify from './plugins/vuetify';
import { Howl, Howler } from 'howler';


Vue.use(VueAudio)
Vue.use(VueFileAgent, VueFileAgentStyles)
Vue.use(XnsAudioPlayerSimple)
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Howl, Howler)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
