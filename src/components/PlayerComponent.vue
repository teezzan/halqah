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
          <p
            class="align-center justify-center ma-auto mr-1"
          >{{sound===null?"00:00":Math.floor(sound.duration())}}</p>
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
              <v-icon v-if="!playingg">mdi-play</v-icon>
              <v-icon v-else>mdi-pause</v-icon>
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
      playingg: false
    };
  },
  props: {
    source: String
  },
  methods: {
    play() {
      if (this.sound.playing()) {
        this.sound.pause();
        this.playingg = false;
      } else {
        this.sound.play();
        this.playingg = true;
      }

      // console.log(this.sound.pos());
    }
  },
  computed: {
    ...mapState(["playerShown", "playing"]),

    visPlay: {
      get() {
        return this.playerShown;
      },
      set(newVal) {
        this.$store.state.playerShown = newVal;
      }
    },
    Play: {
      get() {
        return this.playing;
      },
      set(newVal) {
        this.$store.state.playing = newVal;
      }
    }
  },
  watch: {
    Play() {
      console.log("play changed");
    }
  },
  mounted() {
    this.sound = new Howl({
      src: [this.source]
    });
    // this.sound.play();
  }
};
</script>
