<template>
  <div>
    <!-- <h1>{{ user }} and LoggedIn {{isLoggedIn}}</h1> -->

    <UserView :UserInfo="user" v-if="done"></UserView>
    <!-- <ProfileCard v-if="true" /> -->
    <div id="loader" v-else>
      <v-sheet :color="`grey ${false ? 'darken-2' : 'lighten-4'}`" class="px-3 pt-3 pb-3">
        <v-skeleton-loader
          class="mx-auto"
          max-width="800"
          type="table-heading, list-item-three-line, list-item-three-line, table-tfoot"
        ></v-skeleton-loader>
      </v-sheet>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";
import UserView from "../components/UserBlock";
// import ProfileCard from "../components/ProfileCard";
var _ = require("lodash");

export default {
  components: {
    UserView
    // ProfileCard
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
        .dispatch("getMultiGroup", { num: 0, data: data })
        .then(() => {
          var data = { query: this.user.adminGroups };
          this.$store
            .dispatch("getMultiGroup", { num: 1, data: data })
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
