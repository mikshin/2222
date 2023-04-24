import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '../components/pages/authorization/login'
import registration from '../components/pages/authorization/registration'
import passwordRecovery from '../components/pages/authorization/passwordRecovery'
import mainForm from '../components/pages/form/index'
import configuration from '../components/pages/form/configuration'
import direction from '../components/pages/form/direction'
import USE from '../components/pages/form/USE'
import profile from '../components/pages/form/profile'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: mainForm,
    children: [{
        path: '/configuration',
        component: configuration
    },{
        path: '/direction',
        component: direction
    },{
        path: '/USE',
        component: USE
    },{
        path: '/profile',
        component: profile
    }]
}, {
    path: '/login',
    component: login
}, {
    path: '/registration',
    component: registration
}, {
    path: '/password_recovery',
    component: passwordRecovery
},]


export default new VueRouter({
    routes
})