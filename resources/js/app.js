


require('./bootstrap');

import Vue from 'vue'
import { Form, HasError, AlertError } from 'vform'
import VueProgressBar from 'vue-progressbar'
import Snotify, { SnotifyPosition } from 'vue-snotify'
window.Form= Form
const options = {
    color: '#28B463',
    failedColor: '#874b4b',
    thickness: '3px',
    transition: {
      speed: '2.8s',
      opacity: '0.9s',
      termination: 300
    },
    autoRevert: true,
    location: 'top',
    inverse: false
  }



const Snotifyoptions = {
  toast: {
    position: SnotifyPosition.rightTop
  }
}

Vue.use(Snotify, Snotifyoptions)
Vue.use(VueProgressBar,options);
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

Vue.component('customer', require('./components/CustomerComponent.vue').default);
Vue.component('Pagination', () => import('./components/partial/Pagination.vue'));




const app = new Vue({
    el: '#app'
});
