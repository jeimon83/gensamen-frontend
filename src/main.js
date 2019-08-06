import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/es'

Vue.config.productionTip = false

Vue.use(ElementUI, { locale })

new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
});