import icon from './icon';

icon.install = function(Vue, { label = 'icon' }) {
  if (install.installed) return;
  Vue.components(label, icon);
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  icon.install(window.Vue);
};

export default icon;
