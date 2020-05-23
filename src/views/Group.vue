<template>
  <div>
    <h1 v-if="done">{{audurl()}}</h1>
    <mini-audio v-if="done" :src="audurl()"></mini-audio>


 <div class="vfa-demo bg-light pt-3">
    <VueFileAgent
      class="upload-block"
      ref="vfaDemoRef"
      :uploadUrl="'https://www.mocky.io/v2/5d4fb20b3000005c111099e3'"
      :uploadHeaders="{}"
      :multiple="true"
      :deletable="true"
      :theme="'list'"
      :maxSize="'25MB'"
      :errorText="{
        size: 'This file is too large to be attached',
      }"
      v-model="fileRecords"
    >
      <template v-slot:before-outer>
        <p>Email Attachment example with drag & drop support and <span class="badge">attachment</span> keyword basic detection.</p>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Your Name" value="John Doe">
        </div>
        <div class="form-group">
          <input type="email" class="form-control" placeholder="Email address" value="johndoe@example.com">
        </div>
        <div class="form-group">
          <textarea v-model="message" class="form-control" placeholder="Your Message"></textarea>
        </div>
      </template >
      <template v-slot:file-preview="slotProps">
        <div :key="slotProps.index" class="grid-box-item file-row">
          <button type="button" class="close remove" aria-label="Remove" @click="removeFileRecord(slotProps.fileRecord)">
            <span aria-hidden="true">&times;</span>
          </button>
          <div class="progress" :class="{'completed': slotProps.fileRecord.progress() == 100}">
            <div class="progress-bar" role="progressbar" :style="{width: slotProps.fileRecord.progress() + '%'}"></div>
          </div>
          <strong>{{ slotProps.fileRecord.name() }}</strong> <span class="text-muted">({{ slotProps.fileRecord.size() }})</span>
        </div>
      </template >
      <template v-slot:file-preview-new>
        <div class="text-left my-3" key="new">
          <a href="#" class="">Select files</a> or drag & drop here
        </div>
      </template >
<!--       <template v-slot:after-inner>
        <div class="text-left pt-1">
          <a href="#" class="">Select files</a> or drag & drop here
        </div>
      </template > -->
      <template v-slot:after-outer>
        <div title="after-outer">
          <div class="drop-help-text">
            <p>Drop here</p>
          </div>
          <button type="button" class="btn btn-primary" @click="send()">Send</button>
        </div>
      </template >
    </VueFileAgent>
  </div>

<!--
    <VueFileAgent
      :uploadUrl="'https://www.mocky.io/v2/5d4fb20b3000005c111099e3'"
      :uploadHeaders="{}"
      :multiple="true"
      :deletable="true"
      :editable="true"
      :meta="true"
      :accept="'image/*,video/*,.pdf,.zip'"
      :maxSize="'14MB'"
      :maxFiles="8"
      :helpText="'Select files'"
      :errorText="{
        type: 'Please select images, videos, pdf or zip files',
        size: 'You selected a larger file!',
      }"
      :thumbnailSize="120"
      :theme="'list'"
      v-model="fileRecords"
    ></VueFileAgent> -->

</div>
</template>
<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
  data() {
    return {
      index: 1,
      done: false,
      fileRecords: [

        ]
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
    audurl() {
      if (this.done) {
        return `https://halqah.herokuapp.com/api/group/media/${
          this.media[this.index].filename
        }`;
      }
      return "";
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn", "authStatus", "subs", "title", "media"]),
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
