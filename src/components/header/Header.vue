<template>
  <v-app-bar color="primary">
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>
      <router-link class="link" to="/home">CRUD Products</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- Dark mode switch -->
    <v-toolbar-items class="hidden-sm-and-down">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn color="black" v-bind="props">
            <v-avatar size="32" color="grey" image="https://cdn.vuetifyjs.com/images/lists/1.jpg"
            ></v-avatar>
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
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' },
    ],
  }),
  methods: {
    logout () {
      logout()
      this.$router.push({ name: 'Login' })
    }

  }
}
</script>

<style scoped>

</style>