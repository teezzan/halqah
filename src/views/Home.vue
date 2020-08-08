<template>
  <!-- <div>
      <b-input-group prepend="Find Channel" class="mt-3">
        <b-form-input v-model="name" @keypress.esc="cancelModal(1)"></b-form-input>
      </b-input-group>
    </div>
    <h1>
      Welcome to HalqahMedia.
      <br />We are under huge construction
  </h1>-->
  <ProfileCard />
</template>

<script>
import { mapGetters } from "vuex";
import ProfileCard from "../components/ProfileCard";

export default {
  data() {
    return {
      songs: [],
      name: ""
    };
  },
  components: {
    ProfileCard
  },
  computed: mapGetters(["isLoggedIn", "authStatus"])
};
</script>

<style scoped>
</style>
