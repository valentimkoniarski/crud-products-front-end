<template>
  <Loading :isLoading="loading"></Loading>
  <v-row align="center" justify="center" class="pt-10">
    <v-col cols="12" sm="6" md="6">
      <v-card>
        <v-toolbar dark color="gray">
          <v-toolbar-title>Login form</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
                v-model="login.email"
                :rules="loginRules"
                label="Login"
                required
            ></v-text-field>
            <v-text-field
                v-model="login.password"
                :rules="passwordRules"
                label="Password"
                type="password"
                required
            ></v-text-field>
            <v-card-actions>

              <v-btn class="text-center" color="primary" :disabled="!valid" @click="logar">
                Login
              </v-btn>
              <router-link to="register">
                <v-btn color="primary">
                  Register
                </v-btn>
              </router-link>
            </v-card-actions>
          </v-form>

        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

import { login } from '@/services/auth'
import Loading from '@/components/loading/Loading.vue'

import { mapActions } from 'vuex'

export default {
  name: 'Login',
  components: {
    Loading
  },
  data () {
    return {
      loading: false,
      valid: false,
      loginRules: [
        v => !!v || 'Login is required',
        v => v.length >= 3 || 'Login must be more than 3 characters'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be more than 6 characters'
      ],
      login: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions('snackbar', ['showSnackbar']),
    logar () {
      this.loading = true
      login(this.login)
          .then((response) => {
            if (response.data) {
              const userInfo = 'Bearer ' + response.data.token
              localStorage.setItem('user', JSON.stringify(userInfo))
              this.$router.push('/home')
            }
          })
          .catch((error) => {
            this.showSnackbar({
              message: error?.response?.data || error.message,
              color: 'error'
            })
          })
          .finally(() => {
            this.loading = false
          })
    }
  }
}
</script>

<style scoped>


</style>