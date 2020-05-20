<template>
  <div class="home">
    <h1>{{ isLoggedIn }} and {{ authStatus }}</h1>
    <xns-audio-player-simple :playlist="songs"></xns-audio-player-simple>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      songs: []
    }
  },
  computed: mapGetters(['isLoggedIn', 'authStatus'])
}
</script>
