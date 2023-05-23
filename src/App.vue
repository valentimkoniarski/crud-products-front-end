<template>
  <v-app style="background-color: #f8f8f8">
    <header class="header">
      <Header/>
    </header>
    <main style="padding-top: 50px;">
      <!-- Conteúdo -->
      <v-container class="container">
        <router-view></router-view>
      </v-container>

      <Snackbar/>

    </main>
  </v-app>
</template>

<script>

import Header from '@/components/header/Header.vue'
import Login from '@/components/login/Login.vue'

import { mapGetters } from 'vuex'

import Snackbar from '@/components/events/Snackbar.vue'

export default {
  name: 'App',
  components: {
    Snackbar,
    Login,
    Header
  },
  computed: {
    ...mapGetters('snackbar', ['snackbar'])
  },
}

</script>

<style scoped>
/*header {*/
/*  line-height: 1.5;*/
/*}*/

/*.logo {*/
/*  display: block;*/
/*  margin: 0 auto 2rem;*/
/*}*/

/*@media (min-width: 1024px) {*/
/*  header {*/
/*    display: flex;*/
/*    place-items: center;*/
/*    padding-right: calc(var(--section-gap) / 2);*/
/*  }*/

/*  .logo {*/
/*    margin: 0 2rem 0 0;*/
/*  }*/

/*  header .wrapper {*/
/*    display: flex;*/
/*    place-items: flex-start;*/
/*    flex-wrap: wrap;*/
/*  }*/
/*}*/
</style>
