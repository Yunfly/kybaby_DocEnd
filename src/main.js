import Vue from 'vue'
import VueResource from 'vue-resource'
import router from './router/router'
import publicJs from './public.js'
/*引入axios*/
import './util'
import axios from 'axios'
import vueEventCalendar from 'vue-event-calendar'
import 'vue-event-calendar/dist/style.css'
import filters from './filters'
import stores from './store/store'
import Loading from './component/Loading'

filters(Vue);

Vue.use(Loading);
Vue.use(vueEventCalendar, {locale: 'zh'}); //locale can be 'zh' or 'en'
Vue.use(VueResource);
Vue.use(publicJs);

axios.interceptors.request.use(function (config) {  //配置发送请求的信息
  stores.dispatch('showLoading');
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) { //配置请求回来的信息
  stores.dispatch('hideLoading');
  return response;
}, function (error) {

  return Promise.reject(error);
});

Vue.prototype.$ajax = axios;
import App from './App.vue'




const app = new Vue({
  router,
  store:stores,
  render: h => h(App),
}).$mount('#app');

