<template>
  <div>
    <h1 v-if="done">{{audurl()}}</h1>
    <!-- <mini-audio v-if="done" :src="audurl()"></mini-audio> -->
    <Uploader></Uploader>


  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";
import Uploader from "../components/Uploader.vue";

export default {
  components: {
    Uploader
  },
  data() {
    return {
      index: 0,
      done: false,
      fileRecords: []
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
    },
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
