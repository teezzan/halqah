<template>
  <v-container>
    <b-form-row>
      <b-col>
        <b-button
          class="mt-3 mb-5"
          variant="outline-primary"
          block
          @click="showDialog(0)"
        >Upload Lecture</b-button>
      </b-col>
      <b-col>
        <b-button
          class="mt-3 mb-5"
          variant="outline-info"
          block
          @click="showDialog(1)"
        >Edit Group Details</b-button>
      </b-col>
    </b-form-row>

    <v-dialog v-model="dialog0" max-width="500px">
      <v-card>
        <v-card-title>Upload Audio</v-card-title>
        <div v-if="errorText!==''">
          <v-alert :type="error" dismissible>{{errorText}}</v-alert>
        </div>
        <v-card-text>
          <v-text-field prepend-icon="mdi-music" v-model="title" label="Lecture Title" clearable></v-text-field>
          <v-text-field
            prepend-icon="mdi-account"
            :rules="[ rules.counter]"
            v-model="lecturer"
            label="Lecture Speaker"
            counter
            maxlength="50"
            clearable
          ></v-text-field>
          <v-file-input
            v-model="file"
            accept="audio/*"
            show-size
            counter
            multiple
            label="Audio File"
          ></v-file-input>
        </v-card-text>
        <v-card-actions>
          <v-btn color="success" @click="uploadFiles()">
            <v-icon>mdi-upload</v-icon>Upload
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="hideDialog(0)">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog1" max-width="500px">
      <v-card>
        <v-card-title>Edit Group Details</v-card-title>
        <v-card-text>
          <v-text-field v-model="name" :rules="[rules.required]" label="Channel Name" clearable></v-text-field>
          <v-text-field
            v-model="description"
            :rules="[rules.required]"
            label="Description"
            clearable
          ></v-text-field>
          <v-btn color="red" text @click="showDialog(2)">Delete</v-btn>
        </v-card-text>
        <v-card-actions>
          <v-btn color="green" @click="updateGroupInfo">save</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="hideDialog(1)">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog2" max-width="500px">
      <v-card>
        <v-card-title>Delete Channel</v-card-title>
        <v-card-subtitle>Enter Channel Name for Confirmation</v-card-subtitle>
        <v-card-text>
          <v-text-field v-model="groupname" label="Channel Name"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="deleteGroup">Delete</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="hideDialog(2)">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
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
      title: "",
      lecturer: "",
      name: this.Grpinfo.name,
      description: this.Grpinfo.description,
      groupname: "",
      dialog0: false,
      dialog1: false,
      dialog2: false,
      file: null,
      errorText: "",
      error: "",
      rules: {
        required: value => !!value || "Required.",
        counter: value => value.length <= 50 || "Max 50 characters",
        // email: value => {
        //   const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //   return pattern.test(value) || "Invalid e-mail.";
        // },
        filerules: value =>
          !value ||
          value.size < 50000000 ||
          "Avatar size should be less than 50 MB!"
      }
    };
  },
  methods: {
    uploadFiles: function() {
      const data = new FormData();
      data.append("title", this.title);
      data.append("lecturer", this.lecturer);
      data.append("file", this.file[0]);
      // console.log(this.lecturer, this.title);
      this.loading = true;
      this.$store
        .dispatch("uploadFile", { id: this.id, data: data })
        .then(() => {
          // this.$router.push("/");
          this.fileRecordsForUpload = [];
          this.fileRecords = [];
          // alert("successfully uploaded");
          // this.errorText = "successfully uploaded";
          // this.error = "success";
          this.title = "";
          this.lecturer = "";
          this.file = null;
          this.loading = false;
          this.hideDialog(0);
        })
        .catch(err => {
          console.log(err);
          // alert("error uploading");
          this.errorText = "error uploading";
          this.error = "error";
        });
      // console.log(this.file);
    },
    showDialog(num) {
      this.errorText = "";
      this.error = "";
      if (num == 0) {
        this.dialog0 = true;
        this.dialog1 = false;
        this.dialog2 = false;
      } else if (num == 1) {
        this.name = this.Grpinfo.name;
        this.description = this.Grpinfo.description;
        this.dialog1 = true;
        this.dialog2 = false;
        this.dialog0 = false;
      } else if (num == 2) {
        this.dialog1 = false;
        this.dialog2 = true;
        this.dialog0 = false;
      }
    },
    hideDialog(num) {
      console.log("herehide");
      if (num == 0) {
        this.dialog0 = false;
      } else if (num == 1) {
        this.dialog1 = false;
      } else if (num == 2) {
        this.dialog2 = false;
      }
    },
    //
    updateGroupInfo() {
      if (this.name != "" && this.description != "") {
        var data = {
          name: this.name,
          description: this.description,
          pushAdmin: ["5edaef0785857f0017ea5297"],
          pullAdmin: []
        };
        this.$store
          .dispatch("updateGroup", { id: this.id, data: data })
          .then(() => {
            this.hideDialog(1);
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
#loader {
  /* align-self: center; */
  text-align: center;
}
</style>
