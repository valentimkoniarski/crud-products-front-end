<template>
  <v-app-bar color="primary">
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>
      <router-link class="link" to="/home">CRUD Products</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-menu v-if="showMenuLogout">
        <template v-slot:activator="{ props }">
          <v-btn color="black" v-bind="props">
            <v-avatar size="32" color="grey"
                      image="https://cdn-icons-png.flaticon.com/512/634/634012.png?w=740&t=st=1689043928~exp=1689044528~hmac=d7729437e233f31dfd9e52277fdf875a4b3c0e2f52e1cbda8d226ac8dc20996f">
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title @click="logout()">Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

    </v-toolbar-items>

  </v-app-bar>
</template>

<script>

import { logout } from '@/services/auth'

export default {
  name: 'Header',
  data: () => ({
    drawer: false,
    showMenuLogout: true
  }),
  methods: {
    logout () {
      logout()
      this.$router.push({ name: 'login' })
    }
  },
  watch: {
    // se estiver na rotas de login ou registro, não exibe o menu
    $route (to, from) {
      this.showMenuLogout = !(to.name === 'login' || to.name === 'register')
    }

  }
}
</script>

<style scoped>

</style>