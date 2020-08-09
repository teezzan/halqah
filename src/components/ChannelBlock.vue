<template>
  <!-- <div>

  </div>-->
  <!-- <b-container class="mb-3">
    <div class="row">
      <div class="col big-box">
        <b-avatar size="6rem" variant="primary">{{Grpinfo.name[0]}}{{Grpinfo.name[1]}}</b-avatar>
      </div>

      <div class="col">
        <div class="row">
          <div>Name: {{Grpinfo.name}}</div>
        </div>
        <div class="row">
          <div>About: {{Grpinfo.description}}</div>
        </div>
        <div class="row">
          <div>
            <b-badge>{{Grpinfo.media.length}} Lectures</b-badge>
          </div>
        </div>
        <div class="row">
          <div>
            <b-button class="mt-2" :variant="subColor()" @click="toggleSub">{{subString()}}</b-button>
          </div>
        </div>
      </div>
    </div>
    <hr />
  </b-container>-->
  <ProfileCard :Grpinfo="Grpinfo" :isSub="isSub" :toggleSub="toggleSub" />
</template>

<script>
import ProfileCard from "./ProfileCard";
export default {
  props: {
    Grpinfo: Object,
    isSub: Boolean
  },
  components: {
    ProfileCard
  },
  data() {
    return {};
  },
  methods: {
    toggleSub() {
      if (this.isSub) {
        this.$store
          .dispatch("unsubscribe", { id: this.Grpinfo._id })
          // .then(() => (this.done = true))
          .catch(err => {
            console.log(err);
            this.$router.push("/signin");
          });
      } else {
        this.$store
          .dispatch("subscribe", { id: this.Grpinfo._id })
          .catch(err => {
            console.log(err);
            this.$router.push("/signin");
          });
      }
    },
    subString() {
      if (this.isSub) {
        return "Unsubscribe";
      } else {
        return "Subscribe";
      }
    },
    subColor() {
      if (this.isSub) {
        return `warning`;
      } else {
        return `primary`;
      }
    }
  }
};
</script>
