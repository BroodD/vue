import Vue from 'vue'
import App from './App'
import router from './router'

import('@/assets/libs/bootstrap-grid.css')
import('@/assets/libs/fontello.css')
import('@/assets/libs/slick.css')
import('@/assets/css/style.css')
import('@/assets/css/media.css')


import('@/assets/js/script.js')

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
