<template>
  <div>
    <h1>{{ currentgroup }}</h1>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
  data() {
    return {};
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
    this.$store.commit('groupOne_error')
  }
};
</script>
