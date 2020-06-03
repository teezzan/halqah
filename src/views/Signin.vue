<template>
  <b-container id="sign">
    <div>
      <b-tabs small card ref="tabs">
        <b-tab title="Login">
          <b-card >

            <b-row class="my-1">
              <b-col sm="2">
                <label for="input-large">Email</label>
              </b-col>
              <b-col sm="10">
                <b-form-input v-model="email" size="lg" placeholder="Enter Email"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="2">
                <label for="input-large">Password</label>
              </b-col>
              <b-col sm="10">
                <b-form-input v-model="password" size="lg" type="password"></b-form-input>
              </b-col>
            </b-row>
            <b-button class="btn btn-primary" @click="login">Login</b-button>
          </b-card>
        </b-tab>

        <b-tab title="Signup">
          <b-card>
            <!-- <a name="log"> a</a> -->
            <b-row class="my-1">
              <b-col sm="2">
                <label for="input-large">Name</label>
              </b-col>
              <b-col sm="10">
                <b-form-input v-model="name" size="lg" placeholder="Enter Name" type="text"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="2">
                <label for="input-large">Email</label>
              </b-col>
              <b-col sm="10">
                <b-form-input v-model="emailreg" size="lg" placeholder="Enter Email" type="email"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="2">
                <label for="input-large">Password</label>
              </b-col>
              <b-col sm="10">
                <b-form-input v-model="passwordreg" size="lg" type="password"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="2">
                <label for="input-large">Re-enter Password</label>
              </b-col>
              <b-col sm="10">
                <b-form-input v-model="password_confirmation" size="lg" type="password"></b-form-input>
              </b-col>
            </b-row>
            <b-button class="btn btn-primary" @click="register"  >Register</b-button>
            <div> {{info}} </div>
          </b-card>
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
      emailreg: "",
      email: "",
      passwordreg: "",
      password: "",
      password_confirmation: "",
      info: "",
      btn_en: true
    };
  },
  methods: {
    register: function() {
      const data = {
        name: this.name,
        email: this.emailreg,
        password: this.passwordreg
      };
      if (this.passwordreg == this.password_confirmation) {
        this.$store
          .dispatch("register", data)
          .then(() => {
            alert("Registered Successfully Please Login");
            this.passwordreg = "";
            this.password_confirmation = "";
            this.emailreg = "";
            this.name = "";
            // this.$router.push("/");
          })
          .catch(err => console.log(err));
      }
    },
    login: function() {
      const email = this.email;
      const password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then(() => {
          alert("Login Successful");
          this.password = "";
          this.email = "";
          this.$router.push("/");
        })
        .catch(err => console.log(err));
    }
  },
  watch: {
    password_confirmation :function(){
      if(this.passwordreg != this.password_confirmation){
        this.info = "password Dont match"
      }
      else{
        this.info = ""
      }
    }
  }
};
</script>
