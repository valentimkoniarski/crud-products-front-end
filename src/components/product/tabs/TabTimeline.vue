<template>
  <Loading :is-loading="loading"></Loading>
  <v-card-title>Timeline</v-card-title>
  <v-card-text>
    <v-timeline v-for="timeline in productHistory" side="end" align="start">
      <v-timeline-item :dot-color="dotColor(timeline.productStatusEnum)" size="small">
        <strong>{{ formatDate(timeline.date) }}</strong>
        <div class="pt-2">
          <strong>{{ timeline.productStatusEnum }}</strong>
          <div class="text-caption">
            {{ timeline.responseUser }}
          </div>
        </div>
      </v-timeline-item>
    </v-timeline>
  </v-card-text>
</template>

<script>
import { getProductsTimeline } from '@/services/product/product'
import Loading from '@/components/loading/Loading.vue'

export default {
  name: 'TabTimeline',
  components: { Loading },
  data () {
    return {
      loading: false,
      productHistory: [],
    }
  },
  methods: {
    async loadProductsHistory () {
      try {
        this.loading = true

        const productId = this.$route.params.id
        const timeline = await getProductsTimeline(productId)

        this.productHistory = timeline.data

      } catch (e) {
        await this.showSnackbar({
          message: 'Error loading timeline!',
          color: 'error'
        })
      } finally {
        this.loading = false
      }
    },
    formatDate (date) {
      const dateFormated = new Date(date)
      return dateFormated.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })

    },
    dotColor (status) {
      switch (status) {
        case 'NEW':
          return 'primary'
        case 'MODYFIED':
          return 'warning'
        case 'DELETED':
          return 'error'
        default:
          return 'primary'
      }
    },
  },
  async mounted () {
    await this.loadProductsHistory()
  }
}
</script>

<style scoped>

</style>