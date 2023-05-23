<template>
  <div v-if="snackbar">
    <v-snackbar
        v-model="snackbar.show"
        :color="this.snackbar.color"
        :timeout="this.snackbar.timeout"
        :top="top"
        :bottom="bottom"
        :left="left"
        :right="right"
    >
      {{ this.snackbar.message }}
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Snackbar',
  computed: {
    ...mapGetters('snackbar', ['snackbar'])
  },
  data () {
    return {
      snackbar2: false,
      message: '',
      color: 'success',
      timeout: 3000,
      top: false,
      bottom: true,
      left: false,
      right: true
    }
  },
  methods: {
    showSnackbar () {
      this.message = this.snackbar.message
      this.color = this.snackbar.color
      this.timeout = this.snackbar.timeout
      this.snackbar2 = true
    }
  },
  mounted () {
    this.showSnackbar()
  }
}
</script>

<style scoped>

</style>