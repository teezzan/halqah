<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/channels">Channels</router-link> |
      <router-link to="/user">User</router-link> |
      <router-link to="/signin">Signin</router-link>

    </div>
    <router-view/>
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
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters(['isLoggedIn', 'authStatus']),
  mounted(){
    if(this.isLoggedIn){
      this.axios.defaults.headers.common['x-access-token'] = this.$store.state.token;
      this.$store
        .dispatch("getuser")
        .catch(err => console.log(err));
    }
  }
}
</script>
