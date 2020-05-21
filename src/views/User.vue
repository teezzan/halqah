<template>
  <div class="about">
    <h1>{{ user }} and LoggedIn {{isLoggedIn}}</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapState } from 'vuex';
export default {
  data (){
    return{

    }
  },
  methods: {
    user_info: function() {
      this.$store
        .dispatch("getuser")
        .then(() => {
          console.log("gdeedUser");
          console.log(this.user);
        })
        // .then(() => this.$router.push('/'))
        .catch(err => console.log(err));
    }
  },
  computed: { ...mapGetters(['isLoggedIn', 'authStatus']), ...mapState(['user'])


  },
  mounted(){
     if(!this.user.email){
    this.axios.defaults.headers.common['x-access-token'] = this.$store.state.token;
    this.user_info()
     }
  }
}
</script>
