<template>
  <div>
    <!-- <ul>
   <li v-for="{item, index} in currentgroup.media" :key="index">{{ item.title }}</li>
    </ul>-->
    <h1>{{currentgroup.media[0].title}}</h1>
    <xns-audio-player-simple :playlist="songs"></xns-audio-player-simple>

    <audio controls>
      <source src="https://halqah.herokuapp.com/api/group/media/43c9020ea8b54dc02b3158d9111d96a1.ogg" type="audio/ogg" />
      Your browser does not support the audio element.
    </audio>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
  data() {
    return {
      songs: [
        {
          audio: `https://halqah.herokuapp.com/api/group/media/${this.currentgroup.media[0].filename}`,
          artist: "Superstar",
          tittle: "Funky Disco House",
          album: "Alpha Zulu",
          cover: "cover-art.jpg"
        }
      ]
    };
  },
  methods: {
    groupFetchOne: function() {
      this.$store
        .dispatch("getOnegroup", this.$route.params.id)
        // .then(() => this.$router.push('/'))
        .catch(err => console.log(err));
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn", "authStatus", "subs"]),
    ...mapState(["user", "groups", "currentgroup"])
  },
  mounted() {
    // if (true) {

    this.axios.defaults.headers.common[
      "x-access-token"
    ] = this.$store.state.token;
    this.groupFetchOne();
    // }
  },
  destroyed() {
    this.$store.commit("groupOne_error");
  }
};
</script>
