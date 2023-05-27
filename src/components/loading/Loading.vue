<template>
  <v-progress-circular class="loading" v-if="isLoading" indeterminate :size="310"></v-progress-circular>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

.loading {
  position: fixed;
  z-index: 9999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loading::before {
  content: '';
  position: absolute;
  background-color: rgba(155, 144, 144, 0.5);
}

</style>