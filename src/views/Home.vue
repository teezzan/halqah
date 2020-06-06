<template>
  <b-container class="home">
    <div>
      <b-input-group prepend="Find Channel" class="mt-3">
        <b-form-input v-model="name" @keypress.esc="cancelModal(1)"></b-form-input>
      </b-input-group>
    </div>
    <h1>Welcome to HalqahMedia. <br/> We are under huge construction</h1>
    <h1>{{ isLoggedIn }} and {{ authStatus }}</h1>
  </b-container>
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

<style scoped>
  

</style>
