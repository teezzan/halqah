<template>
  <div id="app">

    <div>
  <b-row align-h="start">
    <b-col cols="4"><b-button v-b-toggle.sidebar-backdrop class="float left">Toggle Sidebar</b-button></b-col>
    <!-- <b-col cols="4">One of two columns</b-col> -->
  </b-row>

    </div>
    <div id="nav">
      <div>
        <b-sidebar
          id="sidebar-backdrop"
          title="Halqah Media"
          backdrop-variant="dark"
          backdrop
          shadow
          width="300px"
        >
          <div class="px-3 py-2">
            <router-link to="/">Home</router-link>|
            <router-link to="/channels">Channels</router-link>|
            <router-link to="/user">User</router-link>|
            <router-link to="/signin">Signin</router-link>
          </div>
        </b-sidebar>
      </div>

      <router-view />
    </div>
    <!-- <div id="nav">

      <b-navbar toggleable type="primary" variant="light">
        <b-navbar-brand to="/">Halqah Media</b-navbar-brand>

        <b-navbar-toggle target="navbar-toggle-collapse">
          <template v-slot:default="{ expanded }">
            <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
            <b-icon v-else icon="chevron-bar-down"></b-icon>
          </template>
        </b-navbar-toggle>

        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item to="/channels">Channels</b-nav-item>
            <b-nav-item to="/user">User</b-nav-item>
            <b-nav-item to="/signin">Signin</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

    </div>-->
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script>
import { mapGetters } from "vuex";
// import Slider from '@jeremyhamm/vue-slider'
// import { SidebarMenu } from "vue-sidebar-menu";

export default {
  components: {
    // Slider,
    // SidebarMenu
  },
  data() {
    return {
      menu: [
        {
          header: true,
          title: "Main Navigation",
          hiddenOnCollapse: true
        },
        {
          href: "/",
          title: "Dashboard",
          icon: "fa fa-user"
        },
        {
          href: "/channels",
          title: "Charts",
          icon: "fa fa-chart-area",
          child: [
            {
              href: "/user",
              title: "Sub Link"
            }
          ]
        }
      ]
    };
  },
  computed: mapGetters(["isLoggedIn", "authStatus"]),
  mounted() {
    if (this.isLoggedIn) {
      this.axios.defaults.headers.common[
        "x-access-token"
      ] = this.$store.state.token;
      this.$store.dispatch("getuser").catch(err => {
        console.log(err);
        // this.$router.push("/signin");
      });
    }
  }
};
</script>
