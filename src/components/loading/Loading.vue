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


/* Fica por cima de todos os elementos */
.loading {
  position: fixed;
  z-index: 9999;


  /* Centraliza na tela */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
}

/* Ocupa toda a tela */
.loading::before {
  content: '';
  position: absolute;
  /* Cor de fundo */
  background-color: rgba(155, 144, 144, 0.5);
}

</style>