<template>
  <div>
    <GroupDetail v-if="done" :Grpinfo="currentgroup" :isSub="isSub"></GroupDetail>
    <div id="loader" v-else>
      <v-sheet :color="`grey ${false ? 'darken-2' : 'lighten-4'}`" class="px-3 pt-3 pb-3">
        <v-skeleton-loader
          class="mx-auto"
          max-width="800"
          type="card table-heading, list-item-two-line, image"
        ></v-skeleton-loader>
      </v-sheet>
    </div>
    <Uploader v-if="isAdmin" :id="this.$route.params.id" :Grpinfo="currentgroup"></Uploader>
    <b-container v-if="done">
      <b-list-group class="mb-5">
        <b-list-group-item
          class="d-flex justify-content-between align-items-left list"
          v-for="(td, index) in media"
          :key="index"
        >
          <div class="textTodo">{{ td.title}}</div>

          <div class="float-right">
            <span class="mx-2">
              <b-badge class="mt-2">{{((td.size)/(1024*1024)).toFixed(1)}} Mb</b-badge>
            </span>

            <b-dropdown
              split
              text="Download"
              class="m-2"
              variant="primary"
              @click="download(index)"
            >
              <b-dropdown-item block variant="success" @click="fetch(index)">Play</b-dropdown-item>
              <b-dropdown-item v-if="isAdmin" variant="danger" @click="delFile(index)">Delete</b-dropdown-item>
            </b-dropdown>
          </div>
        </b-list-group-item>
      </b-list-group>
    </b-container>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";

// var FileSaver = require("file-saver");

export default {
  components: {
    Uploader: () => import("../components/Uploader.vue"),
    GroupDetail: () => import("../components/ChannelBlock.vue")
  },
  data() {
    return {
      index: 0,
      done: false,
      show: false,
      fileRecords: []
    };
  },
  methods: {
    groupFetchOne: function() {
      this.$store
        .dispatch("getOnegroup", this.$route.params.id)
        .then(() => (this.done = true))
        // .then(() => this.$router.push('/'))
        .catch(err => console.log(err));
    },
    fetch(num) {
      this.index = num;
      this.show = true;
      if (this.media.length != 0) {
        var newVal = `https://halqah.herokuapp.com/api/group/media/${
          this.media[this.index].filename
        }`;
        this.$store.state.source = newVal;
        this.visPlay = true;
        this.Play = true;
      }
    },
    download(num) {
      this.index = num;
      window.location = this.audurl();
      // FileSaver.saveAs(this.audurl(), `${this.title}.mp3`);
      // return this.audurl();
    },
    audurl() {
      if (this.done) {
        if (this.media.length != 0) {
          return `https://halqah.herokuapp.com/api/group/media/${
            this.media[this.index].filename
          }`;
        }
      }
      return "";
    },
    delFile(num) {
      var payload = {
        id: this.$route.params.id,
        filename: this.currentgroup.media[num].filename,
        media_id: this.currentgroup.media[num].id
      };
      this.$store
        .dispatch("deleteFile", payload)
        .then(() => {
          this.groupFetchOne();
        })
        // .then(() => this.$router.push('/'))
        .catch(err => console.log(err));
    }
  },
  computed: {
    ...mapGetters([
      "isLoggedIn",
      "authStatus",
      "isAdmin",
      "subs",
      "isSub",
      "media",
      "title"
    ]),
    ...mapState(["user", "groups", "currentgroup", "playerShown", "playing"]),
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
  mounted() {
    this.axios.defaults.headers.common[
      "x-access-token"
    ] = this.$store.state.token;
    this.groupFetchOne();
  },
  destroyed() {
    this.$store.commit("groupOne_error");
  }
};
</script>
