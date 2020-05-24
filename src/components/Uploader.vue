<template>
  <b-container>
    <b-row class="my-1">
      <b-col sm="2">
        <label for="input-large">Title</label>
      </b-col>
      <b-col sm="10">
        <b-form-input v-model="title" size="lg" placeholder="Enter Lecture Title"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="2">
        <label for="input-large">Speaker</label>
      </b-col>
      <b-col sm="10">
        <b-form-input v-model="lecturer" size="lg" placeholder="Enter Lecture Speaker"></b-form-input>
      </b-col>
    </b-row>
    <!-- {{lecturer}} and {{title}} -->
    <div>
      <VueFileAgent
        ref="vueFileAgent"
        :theme="'list'"
        :multiple="true"
        :deletable="true"
        :meta="true"
        :accept="'image/*,.zip,.mp3,.ogg'"
        :maxSize="'10MB'"
        :maxFiles="14"
        :helpText="'Choose images or zip files'"
        :errorText="{
      type: 'Invalid file type. Only images or zip Allowed',
      size: 'Files should not exceed 10MB in size',
    }"
        @select="filesSelected($event)"
        @beforedelete="onBeforeDelete($event)"
        @delete="fileDeleted($event)"
        v-model="fileRecords"
      ></VueFileAgent>
      <button class="btn btn-primary"
        :disabled="!fileRecordsForUpload.length"
        @click="uploadFiles()"
      >Upload {{ fileRecordsForUpload.length }} files</button>

    </div>
  </b-container>
</template>





<script>
var FormData = require("form-data");
export default {
  props: {
    id: String
  },
  data: function() {
    return {
      fileRecords: [],
      fileRecordsForUpload: [],
      title: "",
      lecturer: ""
    };
  },
  methods: {
    uploadFiles: function() {
      const data = new FormData();
      data.append("title", this.title);
      data.append("lecturer", this.lecturer);
      data.append("file", this.fileRecordsForUpload[0].file);
      // console.log(this.lecturer, this.title);
      this.$store
        .dispatch("uploadFile", { id: this.id, data: data })
        .then(() => {
          // this.$router.push("/");
          this.fileRecordsForUpload = [];
          this.fileRecords = [];
          alert("successfully uploaded");
          this.title= "";
          this.lecturer= "";
        })
        .catch(err => {
          console.log(err);
          alert("error uploading");
        });
    },
    deleteUploadedFile: function(/*fileRecord*/) {},
    filesSelected: function(fileRecordsNewlySelected) {
      var validFileRecords = fileRecordsNewlySelected.filter(
        fileRecord => !fileRecord.error
      );
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(
        validFileRecords
      );
    },
    onBeforeDelete: function(fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1);
      } else {
        if (confirm("Are you sure you want to delete?")) {
          this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
        }
      }
    },
    fileDeleted: function(fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1);
      } else {
        this.deleteUploadedFile(fileRecord);
      }
    }
  },
  mounted() {
    this.axios.defaults.headers.common[
      "x-access-token"
    ] = this.$store.state.token;
  }
};
</script>
<style scoped>
.vfa-demo {
  position: relative;
}

.vfa-demo .file-preview-wrapper::before {
  background: transparent;
}

.vfa-demo .file-row {
  position: relative;
  z-index: 15;
  line-height: 24px;
  text-align: left;
  background: #eee;
  margin-bottom: 5px;
  padding: 2px 5px;
}

.vfa-demo .remove {
  float: right;
  margin-top: -3px;
}

.vfa-demo .progress {
  float: right;
  width: 85px;
  height: 10px;
  margin-top: 7px;
  margin-right: 10px;
  background: #fff;
  border: 1px solid #aaa;
}

.vfa-demo .progress.completed {
  display: none;
}

.vfa-demo .drop-help-text {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 2px;
  background: rgba(255, 255, 255, 0.75);
  z-index: 1200;
  font-size: 32px;
  font-weight: bold;
  color: #888;
  align-items: center;
  justify-content: center;
  display: none;
}

.vfa-demo .is-drag-over .drop-help-text {
  display: flex;
}

.vfa-demo .upload-block {
  border: 2px dashed transparent;
  padding: 20px;
  padding-top: 0;
}

.vfa-demo .is-drag-over.upload-block {
  border-color: #aaa;
}

.vfa-demo .vue-file-agent {
  border: 0 !important;
  box-shadow: none !important;
}
</style>
