<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/channels">Channels</router-link>|
      <router-link to="/user">User</router-link>|
      <router-link to="/signin">Signin</router-link>
    </div>
    <!-- <sidebar-menu :menu="menu" /> -->
    <!-- <Slider :width="300" format="push" direction="left" :opacity="0.15" :links="[{'id': 1, 'text': 'Link 1', 'url': 'https://github.com'}, {'id': 2, 'text': 'Link 2', 'url': 'https://github.com'}]"></Slider> -->

    <router-view />
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
      this.$store.dispatch("getuser")
      .catch(err => {
        console.log(err);
        // this.$router.push("/signin");
      });
    }
  }
};
</script>
