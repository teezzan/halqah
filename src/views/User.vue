<template>
  <div>
    <!-- <h1>{{ user }} and LoggedIn {{isLoggedIn}}</h1> -->

    <UserView
      :UserInfo="userToDisplay"
      v-if="done"
      :me="this.$route.params.id == undefined?false:true"
    ></UserView>
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
var _ = require("lodash");

export default {
  components: {
    UserView: () => import("../components/UserBlock")
  },
  data() {
    return {
      done: false,
      userToDisplay: null
    };
  },
  methods: {
    user_info: function() {
      this.$store
        .dispatch("getuser")
        .then(res => {
          console.log("begin usergroup foe ME");
          this.user_groups(res.data, true);
        })
        .catch(err => {
          console.log(err);
          this.$router.push("/signin");
        });
    },
    userOne_info: function(id) {
      this.$store
        .dispatch("getOneuser", id)
        .then(res => {
          this.user_groups(res.data, false);
        })
        .catch(err => {
          console.log(err);
          alert("user does not exist");
          this.$router.push("/user");
        });
    },
    user_groups: function(user, which) {
      var data = { query: user.sub };
      this.$store
        .dispatch("getMultiGroup", { num: 0, data: data, which: which })
        .then(() => {
          var data = { query: user.adminGroups };
          this.$store
            .dispatch("getMultiGroup", { num: 1, data: data, which: which })
            .then(() => {
              this.done = true; //!_.isEmpty(this.user);
              if (which) {
                this.userToDisplay = this.user;
              } else {
                this.userToDisplay = this.currentuser;
              }
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
    ...mapState(["user", "currentuser"])
  },
  mounted() {
    if (this.$route.params.id == undefined) {
      if (_.isEmpty(this.user)) {
        this.axios.defaults.headers.common[
          "x-access-token"
        ] = this.$store.state.token;
        this.user_info();
      } else {
        this.user_groups(this.user, true);
      }
    } else {
      this.userOne_info(this.$route.params.id);
      // this.userOne_info("5ecd9b62a2f59d0017f973c6");
    }
  },
  updated() {
    console.log("updated");
  }
};
</script>
