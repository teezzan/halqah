<template>
  <div>
    <GroupDetail v-if="done" :Grpinfo="currentgroup" :isSub="isSub"></GroupDetail>
    <Uploader v-if="isAdmin" :id="this.$route.params.id" :Grpinfo="currentgroup" ></Uploader>

    <b-container v-if="done">
      <div>
        <mini-audio v-if="show" :src="audurl()"></mini-audio>
      </div>
      <b-list-group>
        <b-list-group-item
          class="d-flex justify-content-between align-items-left list"
          v-for="(td, index) in media"
          :key="index"
        >
          <div class="textTodo">{{ td.title}}</div>

          <b-button-group>
            <span class="mx-2">
              <b-badge>{{((td.size)/(1024*1024)).toFixed(1)}} Mb</b-badge>
            </span>

            <button class="btn btn-info" @click="fetch(index)">
              Play
            </button>
            <button class="btn btn-secondary" @click="download(index)">
              <!-- <b-icon-x class="small"></b-icon-x> -->
              <!-- <a :href="download(index)"> Download </a> -->
              Download
            </button>
            <button v-if="isAdmin" class="btn btn-danger" @click="delFile(index)">Delete</button>
          </b-button-group>
        </b-list-group-item>
      </b-list-group>
    </b-container>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";
import Uploader from "../components/Uploader.vue";
import GroupDetail from "../components/ChannelBlock.vue";

var FileSaver = require("file-saver");

export default {
  components: {
    Uploader,
    GroupDetail
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
    },
    download(num) {
      this.index = num;
      // window.location = this.audurl();
      FileSaver.saveAs(this.audurl(), `${this.title}.mp3`);
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
      var payload = {id:this.$route.params.id, filename: this.currentgroup.media[num].filename, media_id: this.currentgroup.media[num].id }
      this.$store
        .dispatch("deleteFile", payload)
        .then(() => {this.groupFetchOne();})
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
    ...mapState(["user", "groups", "currentgroup"])
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
