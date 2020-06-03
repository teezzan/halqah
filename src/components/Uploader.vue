<template>
  <b-container>
    <b-form-row>
      <b-col>
        <b-button
          class="mt-3 mb-5"
          variant="outline-primary"
          block
          @click="showModal(1)"
        >Upload Lecture</b-button>
      </b-col>
      <b-col>
        <b-button
          class="mt-3 mb-5"
          variant="outline-info"
          block
          @click="showModal(2)"
        >Edit Group Details</b-button>
      </b-col>
    </b-form-row>
    <b-modal ref="my-modal" hide-footer title="Upload Lecture">
      <div v-if="loading" id="loader">
        <b-row align-h="center">
          <b-col cols="8">
            <b-spinner style="width: 9rem; height: 9rem;" label="Large Spinner"></b-spinner>
          </b-col>
        </b-row>
      </div>

      <div v-else>
        <div class="d-block text-center">
          <b-input-group prepend="Lecture Title" class="mt-3">
            <b-form-input v-model="title" @keypress.esc="cancelModal(1)"></b-form-input>
          </b-input-group>
          <b-input-group prepend="Lecture Speaker" class="mt-3">
            <b-form-input v-model="lecturer" @keypress.esc="cancelModal(1)"></b-form-input>
          </b-input-group>
        </div>

        <div class="mt-2">
          <VueFileAgent
            ref="vueFileAgent"
            :theme="'list'"
            :multiple="true"
            :deletable="true"
            :meta="true"
            :accept="'.amr,.wav,.m4a,.mp3,.ogg'"
            :maxSize="'50MB'"
            :maxFiles="1"
            :helpText="'Choose Audio files'"
            :errorText="{
            type: 'Invalid file type. Only Audio File Allowed',
            size: 'Files should not exceed 50MB in size',}"
            @select="filesSelected($event)"
            @beforedelete="onBeforeDelete($event)"
            @delete="fileDeleted($event)"
            v-model="fileRecords"
          ></VueFileAgent>
        </div>

        <b-form-row>
          <b-col>
            <b-button
              class="mt-5"
              :disabled="(!fileRecordsForUpload.length) && (title.length!=0) && (lecturer.length!=0)"
              variant="outline-success"
              block
              @click="uploadFiles()"
            >Upload Lecture</b-button>
          </b-col>
          <b-col>
            <b-button class="mt-5" variant="outline-danger" block @click="cancelModal(1)">Cancel</b-button>
          </b-col>
        </b-form-row>
      </div>
    </b-modal>

    <b-modal ref="my-modal2" hide-footer title="Edit Group Details">
      <div class="d-block text-center">
        <b-input-group prepend="Name" class="mt-3">
          <b-form-input v-model="name" @keypress.esc="cancelModal(2)"></b-form-input>
        </b-input-group>
        <b-input-group prepend="Description" class="mt-3">
          <b-form-input v-model="description" @keypress.esc="cancelModal(2)"></b-form-input>
        </b-input-group>
        <b-button class="mt-3 mb-5" variant="danger" block @click="showModal(3)">Delete group</b-button>
      </div>
      <b-form-row>
        <b-col>
          <b-button class="mt-5" variant="outline-success" @click="updateGroupInfo" block>Submit</b-button>
        </b-col>
        <b-col>
          <b-button class="mt-5" variant="outline-danger" block @click="cancelModal(1)">Cancel</b-button>
        </b-col>
      </b-form-row>
    </b-modal>

    <b-modal ref="my-modal3" hide-footer title="Delete Channel">
      <div class="d-block text-center">
        <b>Enter Channel Name for Confirmation</b>
        <b-input-group prepend="Enter Channel Name" class="mt-3">
          <b-form-input v-model="groupname" @keypress.esc="cancelModal(3)"></b-form-input>
        </b-input-group>
      </div>
      <b-form-row>
        <b-col>
          <b-button class="mt-5" variant="outline-danger" @click="deleteGroup" block>Delete</b-button>
        </b-col>
        <b-col>
          <b-button class="mt-5" variant="outline-success" block @click="cancelModal(3)">Cancel</b-button>
        </b-col>
      </b-form-row>
    </b-modal>
  </b-container>
</template>





<script>
var FormData = require("form-data");
export default {
  props: {
    id: String,
    Grpinfo: Object
  },
  data: function() {
    return {
      loading: false,
      fileRecords: [],
      fileRecordsForUpload: [],
      title: "",
      lecturer: "",
      name: this.Grpinfo.name,
      description: this.Grpinfo.description,
      groupname: ""
    };
  },
  methods: {
    uploadFiles: function() {
      const data = new FormData();
      data.append("title", this.title);
      data.append("lecturer", this.lecturer);
      data.append("file", this.fileRecordsForUpload[0].file);
      // console.log(this.lecturer, this.title);
      this.loading = true;
      this.$store
        .dispatch("uploadFile", { id: this.id, data: data })
        .then(() => {
          // this.$router.push("/");
          this.fileRecordsForUpload = [];
          this.fileRecords = [];
          alert("successfully uploaded");
          this.title = "";
          this.lecturer = "";
          this.loading = false;
          this.cancelModal(1);
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
    },
    showModal(num) {
      if (num == 1) {
        this.$refs["my-modal"].show();
      } else if (num == 2) {
        this.$refs["my-modal2"].show();
      } else {
        this.$refs["my-modal2"].hide();
        this.$refs["my-modal3"].show();
      }
    },
    saveModal(num) {
      if (num == 1) {
        this.$refs["my-modal"].hide();
      } else if (num == 2) {
        this.$refs["my-modal2"].hide();
      } else {
        this.$refs["my-modal3"].hide();
      }
    },
    cancelModal(num) {
      if (num == 1) {
        this.$refs["my-modal"].hide();
      } else if (num == 2) {
        this.$refs["my-modal2"].hide();
      } else {
        this.$refs["my-modal3"].hide();
      }
    },
    updateGroupInfo() {
      if (this.name != "" && this.description != "") {
        var data = { name: this.name, description: this.description };
        this.$store
          .dispatch("updateGroup", { id: this.id, data: data })
          .then(() => {
            this.cancelModal(2);
          })
          .catch(err => console.log(err));
      } else {
        alert("Fields should not be empty");
      }
    },
    groupFetchAll: function() {
      this.$store
        .dispatch("getgroup")
        .then(() => this.$router.push("/channels"))
        .catch(err => console.log(err));
    },
    deleteGroup() {
      if (this.groupname == this.name) {
        this.$store
          .dispatch("deletegroup", this.id)
          .then(() => {
            this.groupFetchAll();
          })
          // .then(() => )
          .catch(err => console.log(err));
      } else {
        alert("names dont match");
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
#loader{
  /* align-self: center; */
  text-align: center;
}
</style>
