<template>
  <Loading :is-loading="loading"></Loading>
  <v-container>
    <v-breadcrumbs :items="itemsLinks" large></v-breadcrumbs>
    <v-card>
      <TabProduct/>
    </v-card>
  </v-container>
</template>

<script>

import Loading from '@/components/loading/Loading.vue'

import TabProduct from '@/components/product/tabs/TabProduct.vue'

export default {
  name: 'NewProduct',
  components: {
    Loading,
    TabProduct
  },
  data () {
    return {
      loading: false,
      itemsLinks: [
        {
          text: 'Home',
          disabled: false,
          href: '/home',
        },
        {
          text: 'Product',
          disabled: false,
          href: '/new',
        },
        {
          text: 'New Product',
          disabled: false,
          href: '',
        },
      ],
    }
  }
}
</script>

<style scoped>

</style>