import { mount } from '@vue/test-utils'
import Icon from '../src'
import { FONT_ICON_CLASSNAME, SVG_ICON_CLASSNAME } from '../src/constant'

const assertHTML = (template, html) => expect(
  mount({ template }, {
    components: { Icon }
  }).html()
).toBe(html)

test('没引入图标时渲染为空白', () => {
  assertHTML(
    '<icon />',
    undefined
  )
})

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

test('正确合并 class', () => {
  assertHTML(
    '<icon class="y-icon" name="ok" />',
    `<i class="${FONT_ICON_CLASSNAME} icon icon-ok y-icon"></i>`
  )
  assertHTML(
    '<icon class="y-icon" prefix="x-icon" name="ok" />',
    `<i class="${FONT_ICON_CLASSNAME} x-icon x-icon-ok y-icon"></i>`
  )
  assertHTML(
    '<icon class="x-icon" name="ok" type="svg" />',
    `<svg aria-hidden="true" class="${SVG_ICON_CLASSNAME} x-icon"><use xlink:href="#icon-ok"></use></svg>`
  )
})
