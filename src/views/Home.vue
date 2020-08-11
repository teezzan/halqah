<template>
  <!-- <div>
    <b-input-group prepend="Find Channel" class="mt-3">
      <b-form-input v-model="name" @keypress.esc="cancelModal(1)"></b-form-input>
    </b-input-group>
  </div>-->
  <h1>
    Welcome to HalqahMedia.
    <br />We are under huge construction
    <v-btn @click="fetch">Click to Play Megumin</v-btn>
  </h1>
  <!-- <ProfileCard :isSub="true" /> -->
</template>

<script>
import { mapGetters, mapState } from "vuex";
// import ProfileCard from "../components/ProfileCard";

export default {
  data() {
    return {
      songs: [],
      name: ""
    };
  },
  components: {
    // ProfileCard
  },
  methods: {
    fetch() {
      this.$store.state.source = "http://localhost:8090/megumins_explosion.mp3";
      this.visPlay = true;
      this.Play = true;
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn", "authStatus"]),
    ...mapState(["user", "groups", "currentgroup", "playerShown", "playing"]),
    visPlay: {
      get() {
        return this.playerShown;
      },
      set(newVal) {
        this.$store.state.playerShown = newVal;
      }
    },
    Play: {
      get() {
        return this.playing;
      },
      set(newVal) {
        this.$store.state.playing = newVal;
      }
    }
  }
};
</script>

<style scoped>
</style>
