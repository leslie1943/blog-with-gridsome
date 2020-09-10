// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import './assets/css/index.css'

import DefaultLayout from '~/layouts/Default.vue'
import dayjs from 'dayjs'

export default function (Vue, { router, head, isClient }) {
  Vue.mixin({
    data() {
      return {
        GRIDSOME_API_URL: process.env.GRIDSOME_API_URL
      }
    }
  })
  Vue.filter('date', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
    return dayjs(value).format(format)
  })
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}
