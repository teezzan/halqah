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
            <v-btn icon @click="play">
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

import { Howl } from "howler";

export default {
  data() {
    return {
      sound: null,
      playing: false
    };
  },
  props: {
    source: String
  },
  methods: {
    play() {
      this.sound.play();
    }
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
  },
  mounted() {
    this.sound = new Howl({
      src: [
        "http://media.dawahnigeria.com/dnlectures2/Imam%20Ishaq%20Muhammad%20Awwal%20(Abeokuta)/Ramadan%20Tafseer%201441/Imam%20Isaq%20Muhammadul%20Awwal_Ramadan%201441%20Tafseer%20-%20Day%2003%20-%20Dawahtul%20Haqq%20-%20(26-04-20)%20(Yoruba)_DN.mp3"
      ]
    });
    this.sound.play();
  }
};
</script>
