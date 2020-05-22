<template>
  <div class="home">
    <h1>{{ isLoggedIn }} and {{ authStatus }}</h1>
    <xns-audio-player-simple :playlist="songs"></xns-audio-player-simple>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'


// https://halqah.herokuapp.com/api/group/media/43c9020ea8b54dc02b3158d9111d96a1.ogg

export default {
  data () {
    return {
      songs: []
    }
  },
  computed: mapGetters(['isLoggedIn', 'authStatus'])
}
</script>
