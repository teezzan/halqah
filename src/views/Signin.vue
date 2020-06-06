<template>
  <div>
    <div id="login" v-if="!reglog" class="whole">
      <div class="container">
        <div class="container-warp">
          <div class="textlog">
            <span class="text-span" @click="showReg">SIGN IN</span>
          </div>
          <form action="post" class="log-form">
            <div class="pref">
              <label for="mail">Email</label>
              <input
                v-model="email"
                type="email"
                name="email"
                class="inp"
                placeholder="Enter username"
              />
            </div>

            <div class="pref">
              <label for="pass">Password</label>
              <input
                v-model="password"
                type="password"
                name="password"
                class="inp"
                placeholder="Enter password"
              />
            </div>

            <div class="retrive">
              <div class="remember">
                <label class="no-padding">
                  <input class="rem" type="checkbox" name="checkbox" value="value" />Remember me
                </label>
              </div>
              <div class="forget">
                <a href="#">Forget password?</a>
              </div>
            </div>

            <div class="button">
              <button @click="login" class="btn">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div id="register"  v-else class="whole">
      <div class="container">
        <div class="container-warp">
          <div class="textreg">
            <span class="text-span" @click="showLog()">SIGN UP</span>
          </div>
          <form action="post" class="log-form">
            <div class="pref">
              <label for="name">Name</label>
              <input
                v-model="name"
                type="text"
                name="name"
                class="inp"
                placeholder="Enter username"
              />
            </div>

            <div class="pref">
              <label for="mail">Email</label>
              <input
                v-model="emailreg"
                type="email"
                name="email"
                class="inp"
                placeholder="Enter email"
              />
            </div>

            <div class="pref">
              <label for="pass">Password</label>
              <input
                v-model="passwordreg"
                type="password"
                name="password"
                class="inp"
                placeholder="Enter password"
              />
            </div>

            <div class="pref">
              <label for="pass">Re-enter Password</label>
              <input
                v-model="password_confirmation"
                type="password"
                name="password"
                class="inp"
                placeholder="Re-enter password"
              />
            </div>

            <div class="button">
              <button @click="register" class="btn">Signin</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
*,
*:after,
*:before {
  box-sizing: border-box;
}

.whole {
  width: 100%;
  margin: 0 auto;
}

a {
  text-decoration: none;
  color: #555555;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  justify-content: center;
  min-height: 100vh;
  background: #ebeeef;
  max-width: 560px;
  margin: 0 auto;
}

.container-warp {
  position: relative;
  border-radius: 10px;
  overflow: -moz-hidden-unscrollable;
}
.textlog {
  background-image: url(../assets/lap.jpg);
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding: 70px 15px 74px 15px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
}

.textreg {
  background-image: url(../assets/face.jpg);
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding: 70px 15px 74px 15px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
}
/*.text::before{
    content: "";
    display: block;
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(75, 110, 128, 0.7);
}*/

.text-span {
  font-family: sans-serif;
  font-size: 30px;
  color: #fff;
  text-transform: uppercase;
  line-height: 1.2;
  text-align: center;
  font-weight: 400;
  cursor: pointer;
}

.log-form {
  width: 100%;
  padding: 43px 15px 57px 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background: white;
}
label {
  display: block;
  padding-left: 5px;
}
label.no-padding {
  padding: 0;
}
.rem {
  margin-right: 8px;
}

.pref {
  border-bottom: 1px solid #b2b2b2;
  margin-bottom: 26px;
}

.retrive {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 30px;
  color: #555555;
}
.remember,
.forget {
  font-size: 13px;
}

[type="checkbox"] {
  vertical-align: middle;
}

input {
  border: none;
  outline: none;
}

input.inp {
  height: 45px;
}
.inp {
  font-family: Poppins-Regular;
  font-size: 15px;
  color: #555555;
  line-height: 1.2;
  display: block;
  width: 100%;
  background: transparent;
  padding: 0 5px;
}

.button {
  text-align: center;
  width: 100%;
}
button.btn {
  padding: 18px 60px;
  border-radius: 25px;
  border: none;
  background-color: #57b846;
  color: white;
}

@media screen and (min-width: 550px) {
  .btn {
    width: 491px;
  }
}
label{
  text-align: left;
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
      btn_en: true,
      loading: false,
      reglog: false
    };
  },
  methods: {
    showReg: function() {
      this.reglog= true
      console.log("hsjkhajhsbjk")
    },
    showLog: function() {

      this.reglog= false

    },
    register: function() {
      const data = {
        name: this.name,
        email: this.emailreg,
        password: this.passwordreg
      };
      if (this.passwordreg == this.password_confirmation) {
        this.loading = true;
        this.$store
          .dispatch("register", data)
          .then(() => {
            alert("Registered Successfully, Please Login");
            this.passwordreg = "";
            this.password_confirmation = "";
            this.emailreg = "";
            this.name = "";
            // this.$router.push("/");
            this.loading = false;
          })
          .catch(err => {
            console.log(err);
            this.loading = false;
          });
      }
    },
    login: function() {
      this.loading = true;
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
        .catch(err => {
          console.log(err);
          this.loading = false;
          alert("Wrong Username or Password");
        });
    }
  },
  watch: {
    password_confirmation: function() {
      if (this.passwordreg != this.password_confirmation) {
        this.info = "password Dont match";
      } else {
        this.info = "";
      }
    }
  }
};
</script>
