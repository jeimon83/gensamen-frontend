import Vue from 'vue'
import Router from 'vue-router'
import clinica from 'vue'

Vue.use(Router)
const router = new Router({
    router: [{
     path: 'clinica',
     name: 'clinica',
     component: clinica
   }]
})

export default router;