import Vue from "vue";
import router from './router/router'
import App from "./App.vue";
import vuetify from '@/plugins/vuetify'
import store from './store'
import Axios from 'axios'
Vue.prototype.$http = Axios;
Vue.config.productionTip = false;
Vue.use(router, vuetify);

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}
new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
