<template>
  <v-bottom-sheet inset v-model="visPlay">
    <v-card tile>
      <!-- <v-progress-linear :value="50" height="3"></v-progress-linear> -->
      <v-slider
        hide-details
        class="align-center"
        min="0"
        :value="50"
        max="100"
        color="orange darken-3"
      >
        <template v-slot:append>
          <p class="align-center justify-center ma-auto mr-1">10:15</p>
        </template>
      </v-slider>

      <v-list class="pt-0">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>The Walker</v-list-item-title>
            <v-list-item-subtitle>Fitz & The Trantrums</v-list-item-subtitle>
          </v-list-item-content>

          <v-spacer></v-spacer>

          <v-list-item-icon>
            <v-btn icon>
              <v-icon>mdi-rewind</v-icon>
            </v-btn>
          </v-list-item-icon>

          <v-list-item-icon :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }">
            <v-btn icon>
              <v-icon>mdi-pause</v-icon>
            </v-btn>
          </v-list-item-icon>

          <v-list-item-icon class="ml-0" :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }">
            <v-btn icon>
              <v-icon>mdi-fast-forward</v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-card>
  </v-bottom-sheet>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  props: {
    source: String
  },
  computed: {
    ...mapState(["playerShown"]),

    visPlay: {
      get() {
        return this.playerShown;
      },
      set(newVal) {
        this.$store.state.playerShown = newVal;
      }
    }
  }
};
</script>
