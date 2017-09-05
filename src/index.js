import icon from './icon';

const installed = [];

icon.install = function(Vue, { label = 'icon' } = {}) {
  if (installed.indexOf(label) === -1) {
    Vue.component(label, icon);
    installed.push(label);
  }
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  icon.install(window.Vue);
};

export default icon;
