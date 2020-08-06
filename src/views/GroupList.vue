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
    <!-- <b-list-group v-else class="mb-5">
      <b-input-group prepend="Find Channel" class="my-3">
        <b-form-input v-model="search" @keypress.esc="cancelModal(1)"></b-form-input>
      </b-input-group>

      <b-list-group-item
        v-for="(item, index) in searchResult"
        :key="index"
        :to="tee(item)"
        router-link
        class="flex-column align-items-start"
        :style="col(index)"
      >
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{item.name}}</h5>
          <small>Last upload: 3 days ago</small>
        </div>

        <p class="mb-1 float-right">{{item.description}}</p>
      </b-list-group-item>
    </b-list-group>-->
    <v-card v-else elevation="6">
      <v-card-title>
        Channels
        <!-- <v-row>
          <v-col cols="9">
            <v-text-field hide-details v-if="showsearch" single-line></v-text-field>
          </v-col>
          <v-col cols="2">

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
          <v-list-item :key="index" :to="tee(item)" router-link>
            <v-list-item-avatar>
              <v-img src="https://picsum.photos/200"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item.name"></v-list-item-title>
              <v-list-item-subtitle v-html="item.description"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider :key="index" inset="true"></v-divider>
        </template>
      </v-list>
    </v-card>
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
      showsearch: false
    };
  },
  methods: {
    togglesearch() {
      this.showsearch = true;
    },
    tee(index) {
      return `/channel/${index._id}`;
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
