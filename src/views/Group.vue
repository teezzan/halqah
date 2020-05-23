<template>
  <div>
    <h1 v-if="done">{{audurl()}}</h1>
    <mini-audio v-if="done" :src="audurl()"></mini-audio>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
  data() {
    return {
      index: 1,
      done: false
    };
  },
  methods: {
    groupFetchOne: function() {
      this.$store
        .dispatch("getOnegroup", this.$route.params.id)
        .then(() => (this.done = true))
        // .then(() => this.$router.push('/'))
        .catch(err => console.log(err));
    },
    audurl() {
      if (this.done) {
        return `https://halqah.herokuapp.com/api/group/media/${
          this.media[this.index].filename
        }`;
      }
      return "";
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn", "authStatus", "subs", "title", "media"]),
    ...mapState(["user", "groups", "currentgroup"])
  },
  mounted() {
    this.axios.defaults.headers.common[
      "x-access-token"
    ] = this.$store.state.token;
    this.groupFetchOne();
  },
  destroyed() {
    this.$store.commit("groupOne_error");
  }
};
</script>
