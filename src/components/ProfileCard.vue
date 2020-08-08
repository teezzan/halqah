<template>
  <v-card max-width="700px" class="mx-auto">
    <v-card-title>
      <v-row>
        <v-col cols="12" class="mx-auto" align="center">
          <v-avatar class="text-center" size="125">
            <v-img src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>
          </v-avatar>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          class="mx-auto font-weight-light text-center text-h5"
          align="center"
        >The Great Mosque Of OAU and OUI Central Mosque</v-col>
      </v-row>
    </v-card-title>
    <v-card-subtitle>
      <v-row>
        <v-col cols="12" align="center">
          The HAlqah where we admonish Students on how to live a life worth of praise for Allah. Holds
          every sunday.
        </v-col>
      </v-row>
    </v-card-subtitle>
  </v-card>
</template>

<script>
// import AvatarPicker from '~/components/AvatarPicker'
export default {
  pageTitle: "My Profile",
  // components: { AvatarPicker },
  data() {
    return {
      loading: false,
      form: {
        firstName: "John",
        lastName: "Doe",
        contactEmail: "john@doe.com",
        avatar: "MALE_CAUCASIAN_BLOND_BEARD"
      },
      showAvatarPicker: false
    };
  },
  methods: {
    openAvatarPicker() {
      this.showAvatarPicker = true;
    },
    selectAvatar(avatar) {
      this.form.avatar = avatar;
    }
  }
};
</script>
