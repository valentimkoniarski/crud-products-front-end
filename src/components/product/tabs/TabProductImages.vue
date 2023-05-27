<template>
  <Loading :is-loading="loading"></Loading>
  <v-row>
    <v-col cols="12">
      <v-file-input
          v-model="selectedFiles"
          accept="image/*"
          label="Select images"
          multiple
          @change="previewImages"
      ></v-file-input>
      <v-row>
        <v-col v-for="(previewUrl, index) in previewUrls" :key="index" cols="6">

          <v-img :src="previewUrl.url" contain width="400" height="250"></v-img>

          <v-col cols="12" class="d-flex justify-center align-center" style="max-height: 30px !important;">
            <v-icon @click="deleteImage(previewUrl.id)">mdi-delete</v-icon>
            <v-checkbox v-model="previewUrl.principal" @click="setPrincipalImage(index)" class="pt-6" label="Principal">
            </v-checkbox>
          </v-col>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
import { createProductImage } from '@/services/product/product'
import { deleteImage, getAllByProductId, setPrincipalImage } from '@/services/product-image/product-image'
import Loading from '@/components/loading/Loading.vue'

export default {
  name: 'TabProductImages',
  components: {
    Loading
  },
  data () {
    return {
      tab: 1,
      valid: false,
      loading: false,
      productImageId: null,
      images: null,
      selectedFiles: [],
      previewUrls: [],
      maxFiles: 4
    }
  },
  methods: {
    ...mapActions('snackbar', ['showSnackbar']),
    getAllByProductId () {
      const { id } = this.$route.params
      getAllByProductId(id).then(response => {
        this.previewUrls = response.data
        this.selectedFiles = response.data
      })
      this.loading = false
    },
    setPrincipalImage (index) {
      this.selectedFiles.forEach((image, i) => {
        if (i === index) {
          image.principal = true
        } else {
          image.principal = false
        }
      })

      try {
        this.loading = true
        const productImageId = this.previewUrls[index].id
        const productId = this.$route.params.id
        setPrincipalImage(productId, productImageId)
        this.showSnackbar({
          message: 'Main image changed successfully',
          color: 'success',
        })
      } catch (error) {
        this.showSnackbar({
          message: 'Error when changing main image',
          color: 'error',
        })
      }
      this.loading = false
    },
    async deleteImage (id) {
      try {
        this.loading = true
        await deleteImage(id)
        await this.showSnackbar({
          message: 'Successfully deleted image',
          color: 'success',
        })
        this.getAllByProductId()
      } catch (error) {
        await this.showSnackbar({
          message: 'Error deleting image',
          color: 'error',
        }).finally(() => {
          this.loading = false
        })
      }
    },
    async submitFormImages () {
      // Create a new form data object
      const formData = new FormData()

      // Loop through each selected file
      for (let i = 0; i < this.selectedFiles.length; i++) {
        // Add the file to the request

        if (!this.selectedFiles[i].id) {
          formData.append('productImage', this.selectedFiles[i], this.selectedFiles[i].name)
        }
      }

      try {
        this.loading = true
        const { id } = this.$route.params

        const response = await createProductImage(id, formData)
        await this.showSnackbar({
          message: 'Imagens cadastradas com sucesso',
          color: 'success',
        })
      } catch (error) {
        await this.showSnackbar({
          message: 'Erro ao cadastrar imagens',
          color: 'error',
        })
      } finally {
        this.loading = false
        this.getAllByProductId()
      }
    },
    async previewImages () {

      // Check if the number of selected files exceeds the maximum
      if (this.selectedFiles.length > this.maxFiles) {
        alert(`Please select no more than ${this.maxFiles} images.`)
        this.selectedFiles = this.selectedFiles.slice(0, this.maxFiles)
      }

      // Loop through each selected file and create a preview URL
      for (let i = 0; i < this.selectedFiles.length; i++) {
        const file = this.selectedFiles[i]

        // Create a file reader object
        const reader = new FileReader()

        // Set up the reader to load the image as a data URL
        reader.readAsDataURL(file)

        // When the reader has loaded the image, add the preview URL to the array
        reader.onload = () => {
          this.previewUrls.push(
              {
                // url: reader.result,
                nome: file.name,
                principal: false
              }
          )
        }

        await this.submitFormImages()
      }
    },
  },
  async mounted () {
    await this.getAllByProductId()
  }
}
</script>

<style scoped>

</style>