<template>
  <v-app>
    <v-app-bar app color="deep-purple darken-3" dark>
      <v-app-bar-nav-icon @click.stop="draw = !draw"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-model="draw" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">John Leider</v-list-item-title>
            <v-list-item-subtitle>john@vuetifyjs.com</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>

      <v-list dense>
        <template v-for="(item) in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>

          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i" link>
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

          <v-list-item v-else :key="item.text" link :to="item.to">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <router-view :key="$route.path"></router-view>
      </v-container>
    </v-main>

    <v-speed-dial
      v-model="fab"
      bottom
      right
      :open-on-hover="false"
      absolute
      fixed
      :transition="transition"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="blue darken-2" class="fabb" dark fab>
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-ufo-outline</v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="green" to="/channels">
        <!-- <router-link to="/channels"> -->
        <v-icon>mdi-teach</v-icon>
      </v-btn>
      <v-btn fab dark small color="indigo" to="/user">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn fab dark small color="red" @click="showPlayer">
        <v-icon>mdi-music</v-icon>
      </v-btn>
    </v-speed-dial>

    <v-bottom-sheet inset v-model="playerShown">
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn color="red" dark v-bind="attrs" v-on="on">Open Player</v-btn>
      </template>-->
      <v-card tile>
        <v-progress-linear :value="50" class="my-0" height="3"></v-progress-linear>

        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>The Walker</v-list-item-title>
              <v-list-item-subtitle>Fitz & The Trantrums</v-list-item-subtitle>
            </v-list-item-content>

            <v-spacer></v-spacer>

            <v-list-item-icon>
              <v-btn icon>
                <v-icon>mdi-rewind</v-icon>
              </v-btn>
            </v-list-item-icon>

            <v-list-item-icon :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }">
              <v-btn icon>
                <v-icon>mdi-pause</v-icon>
              </v-btn>
            </v-list-item-icon>

            <v-list-item-icon class="ml-0" :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }">
              <v-btn icon>
                <v-icon>mdi-fast-forward</v-icon>
              </v-btn>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-card>
    </v-bottom-sheet>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
    draw: false,
    items: [
      // { icon: "mdi-home", text: "Home", to: "/" },
      { icon: "mdi-trending-up", text: "Feed", to: "/" },
      { icon: "mdi-account", text: "Profile", to: "/user" },
      { icon: "mdi-teach", text: "Channels", to: "/channels" },
      { icon: "mdi-radar", text: "Dawah Nigeria", to: "/dawahcast" },
      { icon: "mdi-help-circle", text: "Help" }
    ],
    direction: "top",
    fab: false,
    transition: "slide-y-reverse-transition",
    playerShown: false
  }),
  methods: {
    showPlayer() {
      console.log("play or pause. Just shpw Music card");
      this.playerShown = true;
    }
  }
};
</script>
<style >
/* .v-speed-dial .fabb {
  position: absolute;
  bottom: 5px;
  right: 30px;
} */
/* .v-speed-dial__list {
  align-items: end !important;
  width: 30px !important;
  position: absolute !important;
  bottom: 5px !important;
  right: 30px !important;
  left: auto !important;
} */
/* .fab {} */
</style>
