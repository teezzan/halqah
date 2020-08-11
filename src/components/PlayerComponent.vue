<template>
  <v-bottom-sheet inset v-model="visPlay">
    <v-card tile>
      <v-slider
        hide-details
        @change="show"
        class="align-center"
        min="0"
        v-model="val"
        :max="max"
        color="orange darken-3"
        @start="start"
        @end="end"
      >
        <template v-slot:append>
          <p class="align-center justify-center ma-auto mr-1">
            {{duration}}
            <!-- {{sound===null?"00:00":Math.floor(sound.seek())}} -->
          </p>
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
            <v-btn icon v-if="playingg" @click="play">
              <v-icon>mdi-pause</v-icon>
            </v-btn>
            <v-btn v-else icon @click="play">
              <v-icon>mdi-play</v-icon>
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
      playingg: false,
      duration: 0,
      max: 100,
      val: 0,
      incr: null,
      mousedn: false
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

      console.log(this.sound.seek());
    },
    fancyTimeFormat(duration) {
      // Hours, minutes and seconds
      var hrs = ~~(duration / 3600);
      var mins = ~~((duration % 3600) / 60);
      var secs = ~~duration % 60;

      // Output like "1:01" or "4:03:59" or "123:03:59"
      var ret = "";

      if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
      }

      ret += "" + mins + ":" + (secs < 10 ? "0" : "");
      ret += "" + secs;
      return ret;
    },
    show(e) {
      console.log("loc=> ", e);
      this.sound.seek(e);
    },

    start(e) {
      this.mousedn = true;
      if (this.playingg && this.sound !== null && this.sound !== undefined) {
        this.sound.seek(e);
      }
    },
    end(e) {
      this.mousedn = false;
      if (this.playingg && this.sound !== null && this.sound !== undefined) {
        this.sound.seek(e);
      }
    }
  },
  computed: {
    ...mapState(["playerShown", "playing"]),
    pos() {
      return this.sound.seek();
    },
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
    sound() {
      console.log("posss");
    },
    Play() {
      console.log("play changed");
    },
    source() {
      this.sound = new Howl({
        src: [this.source]
      });
      this.max = 0;
      this.duration = "00:00";

      this.sound.on("end", () => {
        this.playingg = false;
        console.log("Finished!");
      });
      this.sound.once("load", () => {
        console.log("load");
        this.duration = this.fancyTimeFormat(this.sound.duration());
        if (this.playing) {
          this.sound.play();
          this.playingg = true;
        }
        console.log(this.fancyTimeFormat(this.sound.duration()));
        this.max = this.sound.duration();
        this.val = 0;
      });
    }
  },
  mounted() {
    setInterval(() => {
      if (
        this.playingg &&
        this.sound !== null &&
        this.sound !== undefined &&
        !this.mousedn
      ) {
        this.val = this.sound.seek();
      }
    }, 300);
  }
};
</script>
