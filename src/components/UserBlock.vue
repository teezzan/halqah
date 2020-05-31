<template>
  <b-container class="mb-3">
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
            <!-- <b-button class="mt-2 ml-2" variant="warning" >create channel</b-button> -->
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

        <p class="mb-1">{{item.description}}</p>

      </b-list-group-item>
    </b-list-group>
  </b-container>
</template>
<script>
export default {
  props: {
    UserInfo: Object,
    sublist: Object
  },
  data() {
    return {};
  },
  methods: {
    tee(index){
      return `/channel/${index._id}`
    }
  }
};
</script>
