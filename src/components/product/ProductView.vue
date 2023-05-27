<template>
  <Loading :is-loading="isLoading"/>
  <v-col cols="12" sm="6" md="12">
    <v-card style="margin-top: 100px !important;">

      <v-card-title>
        <v-row>
          <v-col cols="8" sm="8" md="6">
            <router-link to="/new">
              <v-btn text color="primary">
                <v-icon>mdi-plus</v-icon>
                New Product
              </v-btn>
            </router-link>
          </v-col>

          <v-col cols="8" sm="8" md="6">
            <router-link to="/category">
              <v-btn text color="blue">
                <v-icon>mdi-wrench</v-icon>
                Category Settings
              </v-btn>
            </router-link>
          </v-col>
        </v-row>
      </v-card-title>

      <v-tabs v-model="tab" bg-color="primary">
        <v-tab value="one">All products</v-tab>
        <v-tab value="two">Deleted products</v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="one">
            <v-data-table
                :headers="headers"
                :items="products"
                item-value="name"
                class="elevation-1"
                :footer-props="{ 'items-per-page-text':'products per page',}">

              <template v-slot:item.actions="{ item }">
                <v-icon small color="primary" class="mr-2" @click="editItem(item.props.title)">mdi-pencil</v-icon>
                <v-icon small color="red" @click="deletDialog(item.props.title)">mdi-delete</v-icon>
              </template>

              <!-- template for image -->
              <template v-slot:item.productImageDto="{ item }">
                <v-img :src="item.props.title?.productImageDto?.[0]?.url" width="200" height="200"></v-img>
              </template>

            </v-data-table>

            <v-dialog v-model="dialog" width="400" height="400">
              <v-card>
                <v-card-title>Delete Item</v-card-title>
                <v-card-text>Are you sure you want to delete this item?</v-card-text>
                <v-card-actions>
                  <v-btn color="green" text @click="dialog = false">Cancel</v-btn>
                  <v-btn color="red" text @click="deleteItem(dialogItem)">Delete</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>


          </v-window-item>

          <v-window-item value="two">
            <ProductDeletedView/>
          </v-window-item>

        </v-window>
      </v-card-text>
    </v-card>
  </v-col>
</template>
<script>

import { getProducts, deleteProduct } from '@/services/product/product'
import Loading from '@/components/loading/Loading.vue'
import { mapActions } from 'vuex'
import ProductDeletedView from '@/components/product/ProductDeletedView.vue'

export default {
  name: 'ProductView',
  components: {
    Loading,
    ProductDeletedView
  },
  methods: {
    ...mapActions('snackbar', ['showSnackbar']),
    editItem (item) {
      this.$router.push({ name: 'edit', params: { id: item.id } })
    },
    deletDialog (item) {
      this.dialogItem = item
      this.dialog = true
    },
    deleteItem (item) {
      this.isLoading = true

      try {
        deleteProduct(item.id)
        this.products = this.products.filter((e) => e.id !== item.id)

        this.showSnackbar({
          message: 'Deleted successfully!',
          color: 'success'
        })

        this.dialog = false
      } catch (e) {
        this.showSnackbar({
          message: 'Error deleting!',
          color: 'error'
        })

      } finally {
        this.isLoading = false
      }
    },
    async loadProducts () {
      try {
        this.isLoading = true
        const products = await getProducts()
        this.products = products.data
      } catch (e) {
        await this.showSnackbar({
          message: 'Error loading products!',
          color: 'error'
        })
      } finally {
        this.isLoading = false
      }
    },
  },
  async mounted () {
    await this.loadProducts()
  },
  data: () => ({
    tab: 'one',
    isLoading: false,
    dialog: false,
    dialogItem: {},
    headers: [
      // {
      //   title: 'Dessert (100g serving)',
      //   align: 'start',
      //   key: 'name',
      //   sortable: false,
      // },
      { title: 'id', key: 'id' },
      { title: 'name', key: 'name' },
      { title: 'description', key: 'description' },
      { title: 'price', key: 'price' },
      { title: 'image', key: 'productImageDto' },
      // actions
      {
        title: 'Actions',
        key: 'actions',
        value: 'actions',
        align: 'center',
        sortable: false,
      },
    ],
    products: [],
  }),
}
</script>

<style scoped>
</style>