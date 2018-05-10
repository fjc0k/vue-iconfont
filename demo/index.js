import Vue from 'vue'
import VueIconfont from '../src'
import App from './app.vue'

// 引入上面下载得到的使用 font-class 图标必须的 css 文件
import './iconfont/iconfont.css'

// 引入上面下载得到的使用 SVG 图标必须的 js 文件
import './iconfont/iconfont.js'

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
  }
])

// eslint-disable-next-line
new Vue({
  el: '#app',
  render: h => h(App)
})
