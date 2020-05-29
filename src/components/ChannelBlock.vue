<template>
  <b-container>
    <!-- <b-row>
      <b-col sm="6">
        <b-avatar></b-avatar>
      </b-col>
      <b-col sm="6">
        <b-row>
          <b-row>Name</b-row>
          <b-row> Details</b-row>
          <b-row> Number of Lectures</b-row>

        </b-row>
      </b-col>
    </b-row>-->

    <div class="container">
      <div class="row">
        <div class="col big-box">
          <b-avatar size="4rem" variant="primary">{{Grpinfo.name[0]}}{{Grpinfo.name[1]}}</b-avatar>
        </div>

        <div class="col">
          <div class="row">
            <div>Name: {{Grpinfo.name}}</div>
          </div>
          <div class="row">
            <div>About: {{Grpinfo.description}}</div>
          </div>
          <div class="row">
            <div>Number of Lectures: {{Grpinfo.media.length}}</div>
          </div>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  props: {
    Grpinfo: Object
  },
  data() {
    return {};
  }
};
</script>
