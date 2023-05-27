<template>
  <Loading :is-loading="isLoading"/>
  <v-row align="center" justify="center" class="pt-10">
    <v-col cols="12" sm="12" md="12">
      <v-card-text>
        <v-data-table
            :headers="headers"
            :items="products"
            :items-per-page="10"
            class="elevation-1"
            item-key="id"
        >
        </v-data-table>
      </v-card-text>
    </v-col>
  </v-row>
</template>

<script>

import { getProductsDeleted } from '@/services/product/product'
import Loading from '@/components/loading/Loading.vue'

export default {
  name: 'ProductDeletedView',
  components: {
    Loading
  },
  data () {
    return {
      products: [],
      isLoading: false,
      headers: [
        { title: 'id', key: 'id' },
        { title: 'name', key: 'name' },
        { title: 'description', key: 'description' },
        { title: 'price', key: 'price' },
        { title: 'image', key: 'productImageDto' }
      ],
    }
  },
  methods: {
    async loadProductsDeleted () {
      try {
        this.isLoading = true
        const products = await getProductsDeleted()
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
  mounted () {
    this.loadProductsDeleted()
  }

}
</script>

<style scoped>

</style>