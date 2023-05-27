<template>
  <Loading :isLoading="loading"></Loading>
  <v-row align="center" justify="center" class="pt-10">
    <v-col cols="12" sm="6" md="6">
      <v-card>
        <v-toolbar dark color="gray">
          <v-toolbar-title>Register form</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                    v-model="login.firstName"
                    :rules="nameRules"
                    label="First Name"
                    required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                    v-model="login.lastName"
                    :rules="nameRules"
                    label="Last Name"
                    required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="12">
                <v-text-field
                    v-model="login.email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                    v-model="login.password"
                    :rules="passwordRules"
                    label="Password"
                    type="password"
                    required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                    v-model="login.passwordConfirmation"
                    :rules="passwordRules && passwordConfirmationRules"
                    label="Password"
                    type="password"
                    required
                ></v-text-field>
              </v-col>

            </v-row>
            <v-card-actions>

              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <router-link to="/login">
                    <v-btn color="primary">
                      Already have an account?
                    </v-btn>
                  </router-link>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-btn color="primary" :disabled="!valid" @click="register">
                    Register
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-form>

        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

import { register } from '@/services/auth'
import Loading from '@/components/loading/Loading.vue'

import { mapActions } from 'vuex'

export default {
  name: 'Register',
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
      passwordConfirmationRules: [
        v => !!v || 'Password Confirmation is required',
        v => v.length >= 6 || 'Password Confirmation must be more than 6 characters',
        v => v === this.login.password || 'Password Confirmation must be equal to Password'
      ],
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length >= 3 || 'Name must be more than 3 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      login: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      }
    }
  },
  methods: {
    ...mapActions('snackbar', ['showSnackbar']),
    register () {
      this.loading = true
      try {
        register(this.login)
        this.showSnackbar({ message: 'User registered successfully', color: 'success' })
      } catch (error) {
        this.showSnackbar({ message: error.message, color: 'error' })
      }
      this.loading = false
      this.$router.push('/confirmation-email')
    }

  }
}
</script>

<style scoped>


</style>