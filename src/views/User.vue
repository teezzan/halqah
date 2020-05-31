<template>
  <div>
    <!-- <h1>{{ user }} and LoggedIn {{isLoggedIn}}</h1> -->
    <UserView :UserInfo="user" v-if="done"></UserView>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";
import UserView from "../components/UserBlock";
var _ = require('lodash');

export default {
  components: {
    UserView
  },
  data() {
    return {
      done: false,
    };
  },
  methods: {
    user_info: function() {
      this.$store
        .dispatch("getuser")
        .then(() => {
          this.done = !_.isEmpty(this.user);
        })
        .catch(err => {
          console.log(err);
          this.$router.push("/signin");
        });
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn", "authStatus", "subs"]),
    ...mapState(["user"])
  },
  mounted() {
    if (_.isEmpty(this.user)) {
      this.axios.defaults.headers.common[
        "x-access-token"
      ] = this.$store.state.token;
      this.user_info();
    }

  }
};
</script>
