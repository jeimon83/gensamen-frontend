import Vue from 'vue'
import Router from 'vue-router'
import Clinicas from '@/components/clinicas/clinicas'
import Dashboard from '@/components/dashboard'
Vue.use(Router)
const router = new Router({
  routes: [
		{
			path: '/',
			name: 'Dashboard',
			component: Dashboard
		},
		{
			path: '/clinicas',
			name: 'Clinicas',
			component: Clinicas
		}
	]
})

export default router;