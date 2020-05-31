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
            <b-button class="mt-2" variant="primary" >Message</b-button>
            <!-- <b-button class="mt-2 ml-2" variant="warning" >create channel</b-button> -->
          </div>
        </div>
      </div>
      <hr/>
      <h2>Channel Subscriptions</h2>
    </div>
    <hr />
  </b-container>
</template>
<script>
export default {
  props: {
    UserInfo: Object
  },
  data(){
    return {

    }
  }
}
</script>
