import Vue from 'vue'
import App from './App.vue'
import router from './router'
import plugins from './plugins'
import './assets/styles/global.less'
import html2pdf from './utils/html2pdf'
import './public-path'

Vue.use(plugins)
Vue.use(html2pdf)

let instance = null

function render() {
  instance = new Vue({
    el: '#app',
    components: {
      App,
    },
    router,
    render: (h) => h(App),
  })
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap() {
  console.log('vue app bootstraped')
}

export async function mount(props) {
  console.log('props from main app', props)
  render()
}

export async function unmount() {
  instance.$destroy()
  instance = null
  router = null
}
