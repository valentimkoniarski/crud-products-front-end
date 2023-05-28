import ProductView from '@/components/product/ProductView.vue'
import Login from '@/components/login/Login.vue'
import Register from '@/components/login/Register.vue'
import ConfirmationEmail from '@/components/login/ConfirmationEmail.vue'
import NewProduct from '@/components/product/NewProduct.vue'
import EditProduct from '@/components/product/EditProduct.vue'
import Category from '@/components/category/Category.vue'
import NewCategory from '@/components/category/NewCategory.vue'
import { createRouter, createWebHistory } from 'vue-router'

export const routes = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/confirmation-email', name: 'confirmation-email', component: ConfirmationEmail },
    { path: '/home', name: 'home', component: ProductView, meta: { requiresAuth: true } },
    { path: '/new', name: 'new', component: NewProduct, meta: { requiresAuth: true } },
    { path: '/category', name: 'category', component: Category, meta: { requiresAuth: true } },
    { path: '/new-category', name: 'new-category', component: NewCategory, meta: { requiresAuth: true } },
    { path: '/edit/:id', props: true, name: 'edit', component: EditProduct, meta: { requiresAuth: true } },
    { path: '/:pathMatch(.*)*', redirect: '/login' }
  ]
})

// TODO Revisar para melhorar a segurança
routes.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('user')

    if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
      next('/login')
    } else {
      next()
    }
  }
)






