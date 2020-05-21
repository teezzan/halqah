<template>
  <b-container id="sign">
    <div>
      <b-tabs small card ref="tabs">
        <b-tab title="Signup">
          <b-card>
            <label for="email_reg">E-Mail Address</label>
            <div>
              <input id="email_reg" type="email" v-model="email_reg" required autofocus />
            </div>
            <div>
              <label for="name">Name</label>
              <div>
                <input id="name" type="text" v-model="name" required />
              </div>
            </div>
            <div>
              <label for="password_reg">Password</label>
              <div>
                <input id="password_reg" type="password" v-model="email_reg" required />
              </div>
            </div>
            <div>
              <button @click="register">Signup</button>
            </div>
          </b-card>
        </b-tab>


        <b-tab title="Login">
          <b-card>
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
              <button @click="login">Login</button>
            </div>
          </b-card>
          <!-- <b-card>I'm the card in tab</b-card> -->
        </b-tab>
      </b-tabs>
    </div>
  </b-container>
</template>

<style scoped>
#sign {
  background-color: darkgray;
}
</style>

<script>
export default {
  data() {
    return {
      name: "",
      email_reg: "",
      email: "",
      password_reg: "",
      password: "",
      password_confirmation: "",
      is_admin: null
    };
  },
  methods: {
    register: function() {
      const data = {
        name: this.name,
        email: this.email_reg,
        password: this.password_reg
      };
      this.$store
        .dispatch("register", data)
        // .then(() => this.$router.push('/'))
        .catch(err => console.log(err));
    },
    login: function() {
      const email = this.email;
      const password = this.password;
      this.$store
        .dispatch("login", { email, password })
        // .then(() => this.$router.push('/'))
        .catch(err => console.log(err));
    }
  }
};
</script>
