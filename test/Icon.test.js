import { mount } from '@vue/test-utils'
import Icon from '../src'
import { FONT_ICON_CLASSNAME, SVG_ICON_CLASSNAME } from '../src/constant'

const assertHTML = (template, html) => expect(
  mount({ template }, {
    components: { Icon }
  }).html()
).toBe(html)

test('正确渲染 class-icon', () => {
  assertHTML(
    '<icon name="ok" />',
    `<i class="${FONT_ICON_CLASSNAME} icon icon-ok"></i>`
  )
  assertHTML(
    '<icon prefix="x-icon" name="right" />',
    `<i class="${FONT_ICON_CLASSNAME} x-icon x-icon-right"></i>`
  )
})

test('正确渲染 svg-icon', () => {
  assertHTML(
    '<icon name="ok" type="svg" />',
    `<svg aria-hidden="true" class="${SVG_ICON_CLASSNAME}"><use xlink:href="#icon-ok"></use></svg>`
  )
  assertHTML(
    '<icon prefix="x-icon" name="right" type="svg" />',
    `<svg aria-hidden="true" class="${SVG_ICON_CLASSNAME}"><use xlink:href="#x-icon-right"></use></svg>`
  )
})
