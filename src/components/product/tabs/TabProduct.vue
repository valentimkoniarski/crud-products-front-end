<template>
  <Loading :is-loading="loading"></Loading>
  <v-card-title>Product Form</v-card-title>
  <v-card-text>
    <v-form v-model="valid">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="product.name" label="Name" :rules="nameRules" required/>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="product.price" :rules="priceRules" label="Price" required type="number"
                        v-on:blur="formatPrice"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="product.description" :rules="descriptionRules" label="Description" required
                        multi-line/>
        </v-col>
        <v-col cols="12" md="6">
          <v-select v-model="product.categoryDto" label="Category" :rules="categoriesRules" :items="categories"
                    required/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn color="primary" :disabled="!valid" @click="submitForm">
            Send
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card-text>
</template>

<script>
import { createProduct, getProductById, updateProduct } from '@/services/product/product'
import { mapActions } from 'vuex'
import { getCategories } from '@/services/category/category.service'
import Loading from '@/components/loading/Loading.vue'

export default {
  name: 'TabProduct',
  components: {
    Loading
  },
  data () {
    return {
      valid: false,
      loading: false,
      product: {
        name: '',
        price: null,
        description: '',
        categoryDto: []
      },
      categories: [],
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length >= 5) || 'Name must be more than 5 characters',
        v => (v && v.length <= 15) || 'Name must be less than 15 characters'
      ],
      priceRules: [
        v => !!v || 'Price is required',
        v => /^[0-9]+(\.[0-9]{1,2})?$/.test(v) || 'Price must be a number',
        v => (v && v >= 0) || 'Price must be greater than zero'
      ],
      descriptionRules: [
        v => !!v || 'Description is required',
        v => (v && v.length >= 5) || 'Description must be more than 5 characters',
        v => (v && v.length <= 80) || 'Description must be less than 80 characters'
      ],
      categoriesRules: [
        v => !!v || 'Category is required',
      ]
    }
  },
  methods: {
    ...mapActions('snackbar', ['showSnackbar']),
    formatPrice () {
      const price = this.product.price
      if (price) {
        const priceFormatted = parseFloat(price).toFixed(2)
        this.product.price = priceFormatted
      }
    },
    async loadProduct () {
      try {
        this.loading = true
        const { id } = this.$route.params
        const response = await getProductById(id)
        this.product = response.data
      } catch (error) {
        await this.showSnackbar({
          message: 'Error loading product',
          color: 'error',
        })
      } finally {
        this.loading = false
      }
    },
    async loadCategories () {
      try {
        this.loading = true
        const response = await getCategories()
        const allCategories = response.data
        allCategories.forEach(category => {
          this.categories.push({
            title: category.name,
            value: {
              id: category.id,
              name: category.name,
              description: category.description
            }
          })
        })
      } catch (error) {
        await this.showSnackbar({
          message: 'Error loading categories',
          color: 'error',
        })
      } finally {
        this.loading = false
      }
    },
    async submitForm () {
      this.loading = true

      const product = { ...this.product }

      try {
        const { id } = this.$route.params || null
        product.id = id

        if (id) {
          await updateProduct(product)
          await this.showSnackbar({
            message: 'Product updated successfully',
            color: 'success',
          })
        } else {
          await createProduct(product)
          await this.showSnackbar({
            message: 'Product registered successfully',
            color: 'success',
          })
        }

      } catch (error) {
        await this.showSnackbar({
          message: 'Error registering product',
          color: 'error',
        })
      } finally {
        this.loading = false
      }

      this.$router.push('/home')
    }
  },
  async mounted () {
    if (this.$route.params.id) {
      await this.loadProduct()
      this.formatPrice()
    }
    await this.loadCategories()
  }
}
</script>

<style scoped>

</style>