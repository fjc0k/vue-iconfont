import { mount, createLocalVue } from '@vue/test-utils'
import Icon from '../src'
import { FONT_ICON_CLASSNAME, SVG_ICON_CLASSNAME } from '../src/constant'

const assertHTML = (template, options, html) => {
  const localVue = createLocalVue()
  localVue.use(Icon, options)
  expect(
    mount(
      { template },
      { localVue }
    ).html()
  ).toBe(html)
}

test('默认选项正确', () => {
  assertHTML(
    '<icon name="ok" />',
    null,
    `<i class="${FONT_ICON_CLASSNAME} icon icon-ok"></i>`
  )
})

test('正确设置 tag', () => {
  assertHTML(
    '<fa-icon name="ok" />',
    { tag: 'fa-icon' },
    `<i class="${FONT_ICON_CLASSNAME} icon icon-ok"></i>`
  )
})

test('正确设置 prefix', () => {
  assertHTML(
    '<fa-icon name="ok" />',
    { tag: 'fa-icon', prefix: 'fa-icon' },
    `<i class="${FONT_ICON_CLASSNAME} fa-icon fa-icon-ok"></i>`
  )
})

test('正确设置 type', () => {
  assertHTML(
    '<fa-icon name="ok" />',
    { tag: 'fa-icon', prefix: 'fa-icon', type: 'svg' },
    `<svg aria-hidden="true" class="${SVG_ICON_CLASSNAME}"><use xlink:href="#fa-icon-ok"></use></svg>`
  )
})
