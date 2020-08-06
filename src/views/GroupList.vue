<template>
  <v-container>
    <div v-if="loading" id="loader">
      <!-- <b-spinner style="width: 9rem; height: 9rem;" label="Large Spinner"></b-spinner> -->
      <v-sheet :color="`grey ${false ? 'darken-2' : 'lighten-4'}`" class="px-3 pt-3 pb-3">
        <v-skeleton-loader
          class="mx-auto"
          max-width="800"
          type="table-heading, list-item-three-line, list-item-three-line, table-tfoot"
        ></v-skeleton-loader>
      </v-sheet>
    </div>
    <v-card v-else elevation="6">
      <v-card-title>
        Channels
        <!-- <v-row>
          <v-col cols="9">
            <v-text-field hide-details v-if="showsearch" single-line></v-text-field>
          </v-col>
          <v-col cols="2">
:to="tee(item)"
          </v-col>
        </v-row>-->
        <v-spacer></v-spacer>
        <v-btn icon @click="togglesearch">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>

      <v-list shaped two-line>
        <template v-for="(item, index) in searchResult">
          <v-list-item :key="`${index}${item.name}`" @click="showinfo(index)" router-link>
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
    <!-- {{searchResult}} -->
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";
export default {
  data() {
    return {
      loading: true,
      search: "",
      showsearch: false,
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
    togglesearch() {
      this.showsearch = true;
    },
    tee(index) {
      console.log("index is => ", index);
      if (index !== null) {
        index = this.searchResult[index];
        return `/channel/${index._id}`;
      }
    },
    col() {
      return { backgroundColor: `rgb(173, 213, 178)` };
    },
    groupFetchAll: function() {
      this.$store
        .dispatch("getgroup")
        .then(() => {
          this.loading = false;
        })
        .catch(err => console.log(err));
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn", "authStatus", "subs"]),
    ...mapState(["user", "groups"]),
    searchResult() {
      var grp = this.groups;
      var sch = this.search.toLowerCase();

      var filterednames = grp.filter(function(obj) {
        return obj.name.toLowerCase().indexOf(sch) != -1;
      });
      return filterednames;
    }
  },
  mounted() {
    if (!this.groups.length != 0) {
      this.axios.defaults.headers.common[
        "x-access-token"
      ] = this.$store.state.token;
      this.groupFetchAll();
    } else {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.flip-list-move {
  transition: transform 1s;
}

.mylist-item {
  transition: all 1s;
}

.mylist-enter,
.mylist-leave-to {
  opacity: 0;
}

.mylist-leave-active {
  /* position: absolute; */
  height: 0;
  padding-top: 0;
  padding-bottom: 0;
  opacity: 0;
  font-size: 0;
  color: transparent;
}
</style>
