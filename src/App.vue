<template>
  <div id="app">
    <div class="mt-3">
      <b-row align-h="start">
        <b-col cols="4">
          <b-button v-b-toggle.sidebar-backdrop class="ml-2 green-background">
            <b-icon icon="list" class="mr-1"></b-icon>Menu
          </b-button>
        </b-col>
      </b-row>
    </div>
    <div id="nav">
      <div>

        <b-sidebar
          id="sidebar-backdrop"
          bg-variant="red"
          backdrop-variant="dark"
          text-variant="light"
          backdrop
          shadow
          width="250px"
        >
          <ul >
             <router-link to="/user" class="my-4">
              <li>
                <b-icon icon="person-fill" font-scale="2" class="mr-2 "></b-icon>
                <span >My Profile</span>
              </li>
            </router-link>
            <router-link to="/">
              <li>
                <b-icon icon="house-fill" font-scale="1" class="mr-2"></b-icon>
                <span >Home</span>
              </li>
            </router-link>
            <router-link to="/channels">
              <li>
                <b-icon icon="inboxes-fill" font-scale="1" class="mr-2"></b-icon>
                <span >Channels</span>
              </li>
            </router-link>
            <router-link to="/signin">
              <li>
                <b-icon icon="pen" font-scale="1" class="mr-2"></b-icon>
                <span >Sign in</span>
              </li>
            </router-link>
          </ul>
        </b-sidebar>

      </div>
    </div><router-view :key="$route.path"></router-view>
    <!-- <router-view /> -->
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
    color: #f6f9fa;
    text-decoration: none;
    cursor: default;

    &.router-link-exact-active {
      background-color: rgb(244, 244, 248);
      text-decoration: none;
    }
  }
}
ul {
  list-style-type: none;
  text-align: left;
  padding: 0;
  background-color: transparent;
}

ul li {
  padding: 8px 16px;
  // border-bottom: 1px solid #ddd;
  text-decoration: none;
}

ul li:last-child {
  border-bottom: none;
}
#sidebar-backdrop {
  background-color: rgb(66, 40, 116);
}

.green-background {
  background-color:rgb(66, 40, 116) !important;
  border:white !important;
}
.white {color:#ffffff;}
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
