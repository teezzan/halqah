<template>
  <div id="app">
    <div class="mt-3">
      <b-row align-h="start">
        <b-col cols="4">
          <b-button v-b-toggle.sidebar-backdrop class="ml-2">
            <b-icon icon="list" class="mr-1"></b-icon>Menu
          </b-button>
        </b-col>
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

          <ul class="list-unstyled components">
            <li>
              <router-link to="/">
                <b-icon icon="house-fill" font-scale="1" class="mr-2"></b-icon>
                <span id="device_id">Home</span>
              </router-link>
            </li>
            <li>
              <router-link to="/channels">
                <b-icon icon="inboxes-fill" font-scale="1" class="mr-2"></b-icon>
                <span id="device_id">Channels</span>
              </router-link>
            </li>
            <li>
              <router-link to="/user">
                <b-icon icon="person-fill" font-scale="1" class="mr-2"></b-icon>
                <span id="device_id">User</span>
              </router-link>
            </li>
            <li>
              <router-link to="/signin">
                <b-icon icon="camera" font-scale="1" class="mr-2"></b-icon>
                <span id="device_id">Signin</span>
              </router-link>
            </li>
          </ul>
        </b-sidebar>
      </div>

      <router-view />
    </div>
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
ul {
  list-style-type: none;
  padding: 0;
  border: 1px solid #ddd;
}

ul li {
  padding: 8px 16px;
  border-bottom: 1px solid #ddd;
  text-decoration: none;
}

ul li:last-child {
  border-bottom: none
}

</style>
<script>
import { mapGetters } from "vuex";

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
