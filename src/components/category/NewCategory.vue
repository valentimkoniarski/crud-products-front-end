<template>
  <v-container>
    <v-breadcrumbs :items="itemsLinks" large></v-breadcrumbs>
    <v-card>
      <v-card-title>Categories Form</v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="category.name" label="Name" :rules="nameRules"/>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="category.description" label="Description" required multi-line/>
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
    </v-card>
  </v-container>
</template>

<script>
import { createCategory } from '@/services/category/category.service'
import { mapActions } from 'vuex'

export default {
  name: 'NewCategory',
  data () {
    return {
      loading: false,
      valid: false,
      category: {
        name: '',
        description: ''
      },
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      itemsLinks: [
        {
          text: 'Home',
          disabled: false,
          href: '/home',
        },
        {
          text: 'Categories',
          disabled: false,
          href: '/category',
        },
        {
          text: 'Nova Categoria',
          disabled: false,
          href: '/new-category',
        },
      ],
    }
  },
  methods: {
    ...mapActions('snackbar', ['showSnackbar']),
    async submitForm () {
      try {
        const response = await createCategory(this.category)
        await this.showSnackbar({
          message: 'Category registered successfully',
          color: 'success',
        })
        this.$router.push('/category')
      } catch (error) {
        await this.showSnackbar({
          message: 'Error registering category',
          color: 'error',
        })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>

</style>