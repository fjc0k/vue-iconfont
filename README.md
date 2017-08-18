# vue-iconfont

iconfont.cn --> symbol引用 --> vue组件

## 如何使用

### 安装

```shell
yarn add vue-iconfont

// 或者
npm install vue-iconfont -S
```

### 使用

```javascript
// main.js

import './assets/iconfont.js'; // Symbol 代码
import 'vue-iconfont/style/icon.css'; // 样式文件
import vueIconfont from 'vue-iconfont'; // icon 组件

Vue.use(vueIconfont);
// 或者
Vue.component('icon', vueIconfont);

```

```html
<!-- App.vue -->
<icon name="star" size="20"></icon>
```
