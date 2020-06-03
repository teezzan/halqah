<template>
  <b-container>
    <div v-if="loading" id="loader">
      <b-spinner style="width: 9rem; height: 9rem;" label="Large Spinner"></b-spinner>
    </div>
    <b-list-group v-else class="mb-5">
      <b-list-group-item
        v-for="(item, index) in groups"
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
    </b-list-group>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";
export default {
  data() {
    return {
      loading: true
    };
  },
  methods: {
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
    ...mapState(["user", "groups"])
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
