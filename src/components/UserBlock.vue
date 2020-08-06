<template>
  <v-container class="mb-3">
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
          <div>Email: {{UserInfo.email}}</div>
        </div>
        <div class="row">
          <div>
            <b-button class="mt-2" variant="primary" v-if="me">Message</b-button>
            <b-button class="mt-2 ml-2" variant="warning" @click="showModal(1)">Create channel</b-button>
          </div>
        </div>
      </div>
      <hr />
    </div>

    <v-card elevation="3">
      <v-card-title>
        Channel Subscriptions
        <v-spacer></v-spacer>
        <v-btn icon @click="togglesearch">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>

      <v-list shaped two-line>
        <template v-for="(item, index) in UserInfo.groupSub">
          <v-list-item :key="`${index}${item.name}`" @click="showinfo(item)" router-link>
            <v-list-item-avatar>
              <v-img src="https://picsum.photos/200"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item.name"></v-list-item-title>
              <v-list-item-subtitle v-html="item.description"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider :key="index" :inset="true"></v-divider>
        </template>
      </v-list>
    </v-card>

    <v-card elevation="3">
      <v-card-title>
        My Channels
        <v-spacer></v-spacer>
      </v-card-title>
      <v-divider></v-divider>

      <v-list shaped two-line>
        <template v-for="(item, index) in UserInfo.groupAdmin">
          <v-list-item :key="`${index}${item.name}`" @click="showinfo(item)" router-link>
            <v-list-item-avatar>
              <v-img src="https://picsum.photos/300"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item.name"></v-list-item-title>
              <v-list-item-subtitle v-html="item.description"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider :key="index" :inset="true"></v-divider>
        </template>
      </v-list>
    </v-card>

    <div class="text-center">
      <v-bottom-sheet v-model="showdetails" inset>
        <v-sheet class="text-center" height="500px">
          <div>
            <v-card :loading="loading" class="mx-auto my-12" max-width="100%">
              <v-img height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

              <v-card-title>
                View Channel Page
                <v-spacer></v-spacer>
                <v-btn icon :to="tee(currentindex)">
                  <v-icon>mdi-open-in-app</v-icon>
                </v-btn>
              </v-card-title>

              <v-card-text>
                <v-row align="center" class="mx-0">
                  <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>

                  <div class="grey--text ml-4">4.5 (413)</div>
                </v-row>

                <div class="my-4 subtitle-1">$ • Italian, Cafe</div>

                <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
              </v-card-text>

              <v-divider class="mx-4"></v-divider>

              <v-card-title>Tonight's availability</v-card-title>

              <v-card-text></v-card-text>

              <v-card-actions>
                <v-btn color="deep-purple lighten-2" text>Reserve</v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-sheet>
      </v-bottom-sheet>
    </div>
  </v-container>
</template>


<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
  props: {
    UserInfo: Object,
    me: Boolean
  },
  data() {
    return {
      name: "",
      description: "",
      showdetails: false,
      currentindex: null
    };
  },
  methods: {
    showinfo(index) {
      console.log(index);
      this.currentindex = index;
      this.showdetails = true;
    },
    tee(index) {
      if (index !== null) {
        return `/channel/${index._id}`;
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
    ...mapGetters(["isLoggedIn", "authStatus", "isAdmin"]),
    ...mapState(["user", "groups", "currentgroup"])
  }
};
</script>
