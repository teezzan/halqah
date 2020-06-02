<template>
  <div class="home">
    <h1>Welcome to HalqahMedia. We are under huge construction</h1>
    <h1>{{ isLoggedIn }} and {{ authStatus }}</h1>

  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      songs: []
    };
  },
  computed: mapGetters(["isLoggedIn", "authStatus"])
};
</script>
