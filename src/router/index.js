 import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login/login'

import AdminApp from '@/components/adminApp'
import Clinicas from '@/components/admin/clinicas'
import Users from '@/components/admin/users'

import UserApp from '@/components/UserApp'
import Dashboard from '@/components/dashboard'
import Clinica from '@/components/clinicas/clinica'
import Paciente from '@/components/pacientes/paciente'
import Perfil from '@/components/perfil/user'
import ClinicaPacientes from '@/components/pacientes/listado'
import PerfilPaciente from '@/components/pacientes/perfilPaciente'
import ClinicaInternaciones from '@/components/clinicas/internaciones'
import Internacion from '@/components/internacion/internacion'

// crear User
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
      redirect: to => {
        let user = localStorage.getItem('user')
        if (!user) {
          return '/login'
        } else {
          let parsed_user = JSON.parse(user);
          if (parsed_user.role === 'admin') {
            return '/admin';
          }
          else {
            return '/user'
          }
        }
      }
    },
    {
      path: '/admin',
      component: AdminApp,
      meta: { requiresAuth: true, requireAdmin: true },
      children: [
        {
          path: '',
          name: 'Users',
          component: Users
        },
        {
          path: 'clinicas',
          name: 'Clinicas',
          component: Clinicas
        }
      ]
    },
    {
      path: '/user',
      component: UserApp,
      meta: { requiresAuth: true, requireAdmin: false },
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'clinica/:id/pacientes',
          name: 'ClinicaPacientes',
          component: ClinicaPacientes
        },
        {
          path: 'clinica/:id/internaciones/:internacion_id',
          name: 'Internacion',
          component: Internacion
        },
        {
          path: 'clinica/:id/internaciones',
          name: 'ClinicaInternaciones',
          component: ClinicaInternaciones
        },
        {
          path: 'clinica/:id',
          name: 'Clinica',
          component: Clinica
        },
        {
          path: 'paciente/:id',
          name: 'Paciente',
          component: Paciente
        },
        {
          path: '/perfil',
          name: 'UserProfile',
          component: Perfil
        }
      ]
    }
  ]
});

const checkAdminRole = (to, next) => {
  let user = localStorage.getItem('user')

  if (user && to.meta.requireAdmin) {
    let parsed_user = JSON.parse(user);
    if (parsed_user.role === 'admin') next()
    else next({ name: 'Forbidden' });
  } else {
    next();
  }
}

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    let token = localStorage.getItem("token") || "";
    const data = JWTDecode(token);
    let now = new Date();
    if (token) {
      const exp_ts = Number(data.exp) * 1000;
      if (exp_ts >= now.getTime()) {
        checkAdminRole(to, next)
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