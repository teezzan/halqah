<template>
  <div class="home">
    <h1>Welcome to HalqahMedia. We are under huge construction</h1>
    <h1>{{ isLoggedIn }} and {{ authStatus }}</h1>
    <div>
      <b-input-group prepend="Channel Name" class="mt-3">
        <b-form-input v-model="name" @keypress.esc="cancelModal(1)"></b-form-input>
      </b-input-group>
    </div>

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
