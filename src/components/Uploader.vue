<template>
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
    <button
      :disabled="!fileRecordsForUpload.length"
      @click="uploadFiles()"
    >Upload {{ fileRecordsForUpload.length }} files</button>
  </div>
</template>
<script>
var FormData = require('form-data');
export default {

  data: function() {
    return {
      fileRecords: [],
      uploadUrl: "https://www.mocky.io/v2/5d4fb20b3000005c111099e3",
      uploadHeaders: { "X-Test-Header": "vue-file-agent" },
      fileRecordsForUpload: []
    };
  },
  methods: {
    uploadFiles: function() {
      // Using the default uploader. You may use another uploader instead.
      // this.$refs.vueFileAgent.upload(
      //   this.uploadUrl,
      //   this.uploadHeaders,
      //   this.fileRecordsForUpload
      // );
      const data = new FormData();
      data.append('title', "axios ");
      data.append('lecturer', "Aqua SAma");
      data.append('file', this.fileRecordsForUpload[0].file);
      this.axios.defaults.headers.common[
      "x-access-token"
    ] = this.$store.state.token;
      this.axios.post('https:/halqah.herokuapp.com/api/group/5ec6ebe7e024cf0017082544/upload', data);

      console.log(typeof( this.fileRecordsForUpload.file));
      this.fileRecordsForUpload = [];
    },
    deleteUploadedFile: function(/*fileRecord*/) {
      // Using the default uploader. You may use another uploader instead.
      // this.$refs.vueFileAgent.deleteUpload(
      //   this.uploadUrl,
      //   this.uploadHeaders,
      //   fileRecord
      // );
    },
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
