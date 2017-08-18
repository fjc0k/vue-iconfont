import icon from './icon';

export const install = function(Vue, { label = 'icon' }) {
  if (install.installed) return;
  Vue.components(label, icon);
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};
