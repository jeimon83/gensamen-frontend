import Vue from 'vue'
import Router from 'vue-router'
import Clinicas from '@/components/clinicas/clinicas'
import Dashboard from '@/components/dashboard'
import Clinica from '@/components/clinicas/clinica'
import Paciente from '@/components/pacientes/paciente'
import Login from '@/components/login/login'
import PrivateApp from '@/components/privateApp'
import User from '@/components/perfilUser/user'

Vue.use(Router)

const router = new Router({
  routes: [
		{
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      component: PrivateApp,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: '/clinicas',
          name: 'Clinicas',
          component: Clinicas
        },
        {
          path: '/clinica/:id',
          name: 'Clinica',
          component: Clinica
        },
        {
          path: '/paciente/:id',
          name: 'Paciente',
          component: Paciente
        },
        {
          path: '/user',
          name: 'UserProfile',
          component: User
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    let token = localStorage.getItem("token") || "";
    const data = JWTDecode(token);
    let now = new Date();
    if (token) {
      const exp_ts = Number(data.exp) * 1000;
      if (exp_ts >= now.getTime()) {
        next();
      } else {
        next({ name: "Login" });
      }
    } else {
      next({ name: "Login" });
    }
  } else {
    next();
  }
});

export default router;