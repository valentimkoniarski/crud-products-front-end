<template>
  <Loading :is-loading="loading"></Loading>
  <v-container>
    <v-breadcrumbs :items="itemsLinks" large></v-breadcrumbs>

    <v-card>
      <v-tabs v-model="tab" bg-color="primary">
        <v-tab value="one">Product</v-tab>
        <v-tab value="three">Timeline</v-tab>
      </v-tabs>

      <v-card-text>

        <v-window v-model="tab">

          <!-- Product Tab -->
          <v-window-item value="one">
            <TabProduct/>
          </v-window-item>

          <!-- Timeline Tab -->
          <v-window-item value="three">
            <TabTimeline/>
          </v-window-item>

        </v-window>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>

import Loading from '@/components/loading/Loading.vue'
import TabProduct from '@/components/product/tabs/TabProduct.vue'
import TabTimeline from '@/components/product/tabs/TabTimeline.vue'

export default {
  name: 'FormProduct',
  components: {
    Loading,
    TabProduct,
    TabTimeline
  },
  data () {
    return {
      tab: 1,
      valid: false,
      loading: false,
      itemsLinks: [
        {
          text: 'Home',
          disabled: false,
          href: '/home',
        },
        {
          text: 'Produtos',
          disabled: false,
          href: `${this.$route.params.id}`,
        }
      ],
    }
  }
}
</script>

<style scoped>

</style>