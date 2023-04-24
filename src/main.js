import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vSelect from 'vue-select'
import datePicker from 'vue2-datepicker';

import 'vue2-datepicker/locale/ru';
import './assets/js/validation'

import './assets/css/index.scss';
import 'vue-select/dist/vue-select.css';
import 'vue2-datepicker/index.css';

Vue.config.productionTip = false
Vue.component('v-select', vSelect)
Vue.component('datePicker', datePicker)

new Vue({
  store: store,
  router,
  render: h => h(App),
}).$mount('#app')