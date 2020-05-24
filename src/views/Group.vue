<template>
  <div>
    <!-- <h1 v-if="done">{{audurl()}}</h1> -->

    <Uploader :id="this.$route.params.id"></Uploader>

    <b-container>
      <div><mini-audio v-if="show" :src="audurl()"></mini-audio></div>
      <b-list-group>
        <b-list-group-item
          class="d-flex justify-content-between align-items-left list"
          v-for="(td, index) in media"
          :key="index"
        >


          <div class="textTodo">{{ td.title}}</div>

          <b-button-group>

            <button  class="btn btn-info" @click="fetch(index)">
              <!-- <b-icon-x class="small"></b-icon-x> -->
              Play
            </button>
            <button  class="btn btn-secondary" @click="download(index)">
              <!-- <b-icon-x class="small"></b-icon-x> -->
              <!-- <a :href="download(index)"> Download </a> -->
              Download

            </button>
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
var FileSaver = require('file-saver');

export default {
  components: {
    Uploader
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
    fetch(num){
      this.index = num;
      this.show = true;
    },
    download(num){
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
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn", "authStatus", "isAdmin", "subs", "title", "media"]),
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
