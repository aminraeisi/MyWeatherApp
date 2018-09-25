import Vue from 'vue'
import App from './App.vue'
import Home from './components/Home.vue'
import SearchResult from './components/SearchResult.vue'
import WeatherShow from './components/WeatherShow.vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/search/:keyword',
      name: 'search-result',
      component: SearchResult
    },
    {
      path: '/weather/:woeid',
      name: 'weather-show',
      component: WeatherShow
    }
  ]
})

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
