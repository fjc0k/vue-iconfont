# vue-iconfont

iconfont.cn --> Symbol引用(SVG字体) --> Vue组件

## 如何使用

### 安装

```shell
yarn add vue-iconfont
```
或
```shell
npm install vue-iconfont -S
```

### 使用

`main.js`：

```javascript
import './assets/iconfont.js'; // Symbol 代码
import 'vue-iconfont/style/icon.css'; // 样式文件
import vueIconfont from 'vue-iconfont'; // icon 组件

Vue.use(vueIconfont);
// 或
Vue.use(vueIconfont, {
  label: 'icon' // label 默认是 icon
});
// 或
Vue.component('icon', vueIconfont);
```

`App.vue`：

```html
<!-- // 不指定 size，图标大小依父元素而定 -->
<icon name="star"></icon>

<!-- // 指定 size，图标大小自己做主，单位：px -->
<icon name="star" :size="20"></icon>
<!-- // 这等价于 -->
<icon name="star" :width="20" :height="20"></icon>
```
