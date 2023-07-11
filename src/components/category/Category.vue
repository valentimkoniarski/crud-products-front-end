<template>
  <Loading :is-loading="loading"></Loading>
  <v-container style="margin-top: 100px !important;">
    <v-breadcrumbs :items="itemsLinks" large></v-breadcrumbs>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h1 class="pb-4">Categories</h1>
          </v-card-title>
          <router-link to="new-category">
            <v-card-actions>
              <v-btn color="primary">New Category</v-btn>
            </v-card-actions>
          </router-link>
          <v-card-text>
            <v-table>
              <thead>
              <tr>
                <th class="text-left">ID</th>
                <th class="text-left">Name</th>
                <th class="text-left">Description</th>
                <th class="text-left">Actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="category in categories" :key="category.id">
                <td>{{ category.id }}</td>
                <td>{{ category.name }}</td>
                <td>{{ category.description }}</td>
                <td>
                  <v-btn color="error" @click="deletDialog(category)">Delete</v-btn>
                </td>
              </tr>
              </tbody>
            </v-table>

            <v-dialog v-model="dialog" width="400" height="400">
              <v-card>
                <v-card-title>Delete Item</v-card-title>
                <v-card-text>Are you sure you want to delete this item?</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { getCategories, deleteCategory } from '@/services/category/category.service'
import { mapActions } from 'vuex'
import Loading from '@/components/loading/Loading.vue'

export default {
  name: 'Category',
  components: { Loading },
  data () {
    return {
      loading: false,
      categories: [],
      dialog: false,
      dialogItem: null,
      itemsLinks: [
        {
          text: 'Home',
          disabled: false,
          href: '/home',
        },
        {
          text: 'Categories',
          disabled: false,
          href: '/category',
        },
        {
          text: 'Novo Produto',
          disabled: true,
        },
      ],
    }
  },
  methods: {
    ...mapActions('snackbar', ['showSnackbar']),
    async loadCategories () {
      this.loading = true
      await getCategories().then((response) => {
        this.categories = response.data
      }).catch((error) => {
        this.showSnackbar({ message: error.request.response, color: 'error' })
      })
      this.loading = false
    },
    async deleteItemConfirm () {
      try {
        this.loading = true
        await deleteCategory(this.dialogItem.id)
        this.categories = this.categories.filter((e) => e.id !== this.dialogItem.id)
        this.dialog = false
        await this.showSnackbar({ message: 'Category deleted successfully', color: 'success' })
      } catch (error) {
        await this.showSnackbar({ message: error.request.response, color: 'error' })
      } finally {
        this.loading = false
      }
    },
    deletDialog (item) {
      this.dialogItem = item
      this.dialog = true
    },
  },
  mounted () {
    this.loadCategories()
  }
}
</script>

<style scoped>

</style>