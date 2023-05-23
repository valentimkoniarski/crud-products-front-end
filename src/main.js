import { createApp } from 'vue'
import App from './App.vue'
import Vuex from 'vuex';
import store from './store/index';

// Estilos
import './assets/main.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { VDataTable } from 'vuetify/labs/VDataTable'
import pt from 'vuetify/lib/locale/pt'

const vuetify = createVuetify({
  directives,
  components: {
    VDataTable,
    ...components,
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  },
  theme: {
    themes: {
      light: {
        primary: '#9652ff',
      }
    }
  },
  breakpoint: {
    thresholds: {
      xs: 340,
      sm: 540,
      md: 800,
      lg: 1280,
    }
  },
  locale: {
    locales: { pt },
    current: 'pt',
  }

})

// Rotas
import { routes } from '@/routes/routes'

const app = createApp(App)

app.use(vuetify)

app.use(store)
app.use(routes)
app.mount('#app')
