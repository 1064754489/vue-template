import Vue from 'vue'
import App from './App.vue'
import router from './router'
import plugins from './plugins'
import './assets/styles/global.less'

Vue.use(plugins)

new Vue({
  el: '#app',
  components: {
    App,
  },
  router,
  render: (h) => h(App),
})
