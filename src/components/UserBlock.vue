<template>
  <b-container class="mb-3">
    <b-modal ref="my-modal" hide-footer title="Create Channel ">
      <div class="d-block text-center">
        <b-input-group prepend="Channel Name" class="mt-3">
          <b-form-input v-model="name" @keypress.esc="cancelModal(1)"></b-form-input>
        </b-input-group>
        <b-input-group prepend="Description" class="mt-3">
          <b-form-input v-model="description" @keypress.esc="cancelModal(1)"></b-form-input>
        </b-input-group>
      </div>

      <b-form-row>
        <b-col>
          <b-button class="mt-5" variant="outline-success" @click="creatGroup" block>Create</b-button>
        </b-col>
        <b-col>
          <b-button class="mt-5" variant="outline-danger" block @click="cancelModal(1)">Cancel</b-button>
        </b-col>
      </b-form-row>
    </b-modal>
    <div class="row">
      <div class="col big-box">
        <b-avatar size="6rem" variant="success">{{UserInfo.name[0]}}{{UserInfo.name[1]}}</b-avatar>
      </div>

      <div class="col">
        <div class="row">
          <div>Name: {{UserInfo.name}}</div>
        </div>
        <div class="row">
          <div>About: {{UserInfo.email}}</div>
        </div>
        <div class="row">
          <div>
            <b-button class="mt-2" variant="primary">Message</b-button>
            <b-button class="mt-2 ml-2" variant="warning" @click="showModal(1)">Create channel</b-button>
          </div>
        </div>
      </div>
      <hr />
    </div>
    <hr />
    <div>Channel Subscriptions</div>
    <b-list-group>
      <b-list-group-item
        v-for="(item, index) in UserInfo.groupSub"
        :key="index"
        :to="tee(item)"
        router-link
        class="flex-column align-items-start"
      >
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{item.name}}</h5>
        </div>

        <p class="mb-1 float-right">{{item.description}}</p>
      </b-list-group-item>
    </b-list-group>

    <hr />
    <div>My Channels</div>
    <b-list-group>
      <b-list-group-item
        v-for="(item, index) in UserInfo.groupAdmin"
        :key="index"
        :to="tee(item)"
        router-link
        class="flex-column align-items-start"
      >
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{item.name}}</h5>
        </div>

        <p class="mb-1 float-right">{{item.description}}</p>
      </b-list-group-item>
    </b-list-group>
  </b-container>
</template>


<script>

import { mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
  props: {
    UserInfo: Object,
  },
  data() {
    return {
      name: "",
      description: ""
    };
  },
  methods: {
    tee(index) {
      return `/channel/${index._id}`;
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
    creatGroup() {
      if(this.name != "" && this.description != ""){
      var payload = {name: this.name, description: this.description};
      this.$store
        .dispatch("creategroup", payload)
        .then(() => {this.$router.push(`/channel/${this.currentgroup._id}`)})
        .catch(err => {console.log(err);
        alert("Error Creating. ");
        });}
        else{alert("Field cannot be blank")}
    }
  },
  computed: {
    ...mapGetters([
      "isLoggedIn",
      "authStatus",
      "isAdmin",
    ]),
    ...mapState(["user", "groups", "currentgroup"])
  },
};
</script>
