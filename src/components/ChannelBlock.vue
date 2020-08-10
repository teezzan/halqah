<template>
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
