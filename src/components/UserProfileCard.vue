<template>
  <div>
    <v-card max-width="700px" class="mx-auto">
      <v-card-title>
        <v-row>
          <v-col cols="12" class="mx-auto" align="center">
            <v-avatar class="text-center" size="125">
              <v-img src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>
            </v-avatar>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            class="mx-auto font-weight-light text-center text-h5"
            align="center"
          >{{UserInfo.name}}</v-col>
        </v-row>
      </v-card-title>
      <v-card-subtitle>
        <v-row>
          <v-col
            cols="12"
            align="center"
            class="font-weight-light text-sm-center text-body-1"
          >{{UserInfo.email}}</v-col>
        </v-row>
      </v-card-subtitle>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red lighten-2" @click="showDialog" text>
          <v-icon>mdi-folder-plus</v-icon>Create Channel
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="dialog0" max-width="500px">
      <v-card>
        <v-card-title>Channel Details</v-card-title>
        <v-card-text>
          <v-text-field v-model="name" :rules="[rules.required]" label="Channel Name" clearable></v-text-field>
          <v-text-field
            v-model="description"
            :rules="[rules.required]"
            label="Description"
            clearable
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="green" @click="creatGroup">Create</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="hideDialog()">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  pageTitle: "Profile",
  props: {
    UserInfo: Object
  },
  data() {
    return {
      dialog0: false,
      loading: false,
      name: "",
      description: "",
      rules: {
        required: value => !!value || "Required.",
        counter: value => value.length <= 50 || "Max 50 characters"
      }
    };
  },
  methods: {
    showDialog() {
      this.name = "";
      this.description = "";
      this.dialog0 = true;
    },
    hideDialog() {
      this.dialog0 = false;
    },
    creatGroup() {
      if (this.name != "" && this.description != "") {
        var payload = { name: this.name, description: this.description };
        this.$store
          .dispatch("creategroup", payload)
          .then(() => {
            this.$router.push(`/channel/${this.currentgroup._id}`);
          })
          .catch(err => {
            console.log(err);
            alert("Error Creating. ");
          });
      } else {
        alert("Field cannot be blank");
      }
    }
  },
  computed: {
    ...mapState(["user", "groups", "currentgroup"])
  }
};
</script>
