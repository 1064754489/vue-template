import Vue from 'vue'
import App from './App.vue'
import router from './router'
import plugins from './plugins'
import './assets/styles/global.less'
import html2pdf from './utils/html2pdf'

Vue.use(plugins)
Vue.use(html2pdf)

new Vue({
  el: '#app',
  components: {
    App,
  },
  router,
  render: (h) => h(App),
})
