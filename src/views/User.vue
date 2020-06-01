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
var _ = require("lodash");

export default {
  components: {
    UserView
  },
  data() {
    return {
      done: false
    };
  },
  methods: {
    user_info: function() {
      this.$store
        .dispatch("getuser")
        .then(() => {
          this.user_groups();
        })
        .catch(err => {
          console.log(err);
          this.$router.push("/signin");
        });
    },
    user_groups: function() {
      var data = { query: this.user.sub };
      this.$store
        .dispatch("getMultiGroup", {num:0, data: data })
        .then(() => {
          var data = { query: this.user.adminGroups };
          this.$store
            .dispatch("getMultiGroup", { num:1, data: data })
            .then(() => {
              this.done = !_.isEmpty(this.user);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
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
    } else {
      this.user_groups();
    }
  }
};
</script>
