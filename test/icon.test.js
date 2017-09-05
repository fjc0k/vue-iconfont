import Vue from 'vue';
import Icon from '../src';

function renderAndGetElement(component, propsData = {}) {
  const el = new (Vue.extend(component))({ propsData }).$mount().$el;
  el.attr = function(name) {
    return this.getAttribute(name);
  };
  return el;
}

describe('<icon name="vue" />', () => {

  const el = renderAndGetElement(Icon, { name: 'vue' });

  test(`tagName = "svg"`, () => {
    expect(el.tagName).toBe('svg');
  });

  test(`class = "icon"`, () => {
    expect(el.attr('class')).toBe('icon');
  });

  test(`xlink:href = "#icon-vue"`, () => {
    const useEl = el.children[0];
    expect(useEl.tagName).toBe('use');
    expect(useEl.getAttribute('xlink:href')).toBe('#icon-vue');
  });

});

describe('<icon name="qq" :size="10" />', () => {

  const el = renderAndGetElement(Icon, { name: 'qq', size: 10 });

  test(`tagName = "svg"`, () => {
    expect(el.tagName).toBe('svg');
  });

  test(`class = "icon"`, () => {
    expect(el.attr('class')).toBe('icon');
  });

  test(`width, height = "10px"`, () => {
    expect(el.style.width).toBe('10px');
    expect(el.style.height).toBe('10px');
  });

  test(`xlink:href = "#icon-qq"`, () => {
    const useEl = el.children[0];
    expect(useEl.tagName).toBe('use');
    expect(useEl.getAttribute('xlink:href')).toBe('#icon-qq');
  });

});
