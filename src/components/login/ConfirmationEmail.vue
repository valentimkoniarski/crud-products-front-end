<template>
  <v-container style="padding-top: 100px">
    <v-row>
      <v-col cols="12" sm="12">
        <v-card>
          <v-card-title>
            <h2>Confirmation Email</h2>
          </v-card-title>
          <v-card-text class="pt-10">
            <p>
              A confirmation email has been sent to your email address.
              Please confirm your email address to complete your registration.
            </p>
            <div class="mx-auto d-block">
              <img class="mx-auto d-block" width="300" src="../../assets/paddlock.png">
              <router-link to="login">
                <v-btn color="primary" class="mx-auto d-block">
                  Back to Login
                </v-btn>
              </router-link>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ConfirmationEmail'
}
</script>

<style scoped>

</style>