<template>
  <b-container id="sign">
    <h4>Login</h4>
    <form>
      <label for="email">E-Mail Address</label>
      <div>
        <input id="email" type="email" v-model="email" required autofocus />
      </div>
      <div>
        <label for="password">Password</label>
        <div>
          <input id="password" type="password" v-model="password" required />
        </div>
      </div>
      <div>
        <button type="submit" @click="login">Login</button>
      </div>
    </form>
  </b-container>
</template>

<style scoped>
#sign {
  background-color: darkgray;
}
</style>

<script>
export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      is_admin: null
    }
  },
  methods: {
    register: function () {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.$store
        .dispatch('register', data)
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
    },
    login: function () {
      const email = this.email
      const password = this.password
      this.$store
        .dispatch('login', { email, password })
        // .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
    }

  }
}
</script>
