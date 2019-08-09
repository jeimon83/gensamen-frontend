import Vue from 'vue'
import Router from 'vue-router'
import Clinicas from '@/components/clinicas/clinicas'
import Dashboard from '@/components/dashboard'
import Clinica from '@/components/clinicas/clinica'
import Paciente from '@/components/pacientes/paciente'
Vue.use(Router)
const router = new Router({
    routes: [{
            path: '/',
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
        }
    ]
})

export default router;