<template>
  <v-card max-width="700px" class="mx-auto">
    <v-card-title>
      <v-row>
        <v-col cols="12" class="mx-auto" align="center">
          <v-avatar class="text-center" size="125">
            <v-img src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>
          </v-avatar>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          class="mx-auto font-weight-light text-center text-h5"
          align="center"
        >{{Grpinfo.name}}</v-col>
      </v-row>
    </v-card-title>
    <v-card-subtitle>
      <v-row>
        <v-col cols="12" align="center">{{Grpinfo.description}}</v-col>
      </v-row>
    </v-card-subtitle>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn v-if="!isSub" color="deep-purple lighten-2" @click="toggleSub" text>
        <v-icon>mdi-playlist-check</v-icon>Subscribe
      </v-btn>
      <v-btn v-else color="red lighten-2" @click="toggleSub" text>
        <v-icon>mdi-playlist-minus</v-icon>UnSubscribe
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  pageTitle: "My Profile",
  props: {
    Grpinfo: Object,
    isSub: Boolean,
    toggleSub: Function
  },
  // components: { AvatarPicker },
  data() {
    return {
      loading: false
    };
  },
  methods: {}
};
</script>
