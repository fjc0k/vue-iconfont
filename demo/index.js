import Vue from 'vue'
import VueIconfont from '../src'
import App from './app.vue'

// 引入上面下载得到的使用 font-class 图标必须的 css 文件
import './iconfont/iconfont.css'

// 引入上面下载得到的使用 SVG 图标必须的 js 文件
import './iconfont/iconfont.js'

// 引入 fontawesome5
import './fontawesome5/css/fontawesome-all.css'

// 引入 ionicons4
import 'ionicons/dist/css/ionicons.min.css'

// 引入 material-design-icons3
import './material-design-icons3/material-icons.css'

Vue.use(VueIconfont, [
  // 定义 v-icon 组件以使用 font-class 图标
  {
    tag: 'v-icon',
    prefix: 'v-icon',
    type: 'font'
  },

  // 定义 v-svg-icon 组件以使用 SVG 图标
  {
    tag: 'v-svg-icon',
    prefix: 'v-icon',
    type: 'svg'
  },

  {
    tag: 'fa-icon',
    prefix: 'fa'
  },

  {
    tag: 'fab-icon',
    family: 'fab',
    prefix: 'fa'
  },

  {
    tag: 'ion-icon',
    family: 'ion',
    prefix: 'ion-ios'
  },

  {
    tag: 'ion-md-icon',
    family: 'ion',
    prefix: 'ion-md'
  },

  {
    tag: 'ion-logo-icon',
    family: 'ion',
    prefix: 'ion-logo'
  },

  {
    tag: 'md-icon',
    family: 'material-icons'
  }
])

// eslint-disable-next-line
new Vue({
  el: '#app',
  render: h => h(App)
})
