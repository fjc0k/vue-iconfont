import { mount, createLocalVue } from '@vue/test-utils'
import Icon from '../src'
import { FONT_ICON_CLASSNAME, SVG_ICON_CLASSNAME } from '../src/constant'

const assertHTML = (template, html) => {
  const localVue = createLocalVue()
  localVue.use(Icon, [
    {
      tag: 'Icon',
      type: 'font'
    },
    {
      tag: 'SvgIcon',
      type: 'svg'
    }
  ])
  expect(
    mount(
      { template },
      { localVue }
    ).html()
  ).toBe(html)
}

test('正确渲染 Font Icons', () => {
  assertHTML(
    '<Icon name="ok" />',
    `<i class="${FONT_ICON_CLASSNAME} ok"></i>`
  )
})

test('正确渲染 SVG Icons', () => {
  assertHTML(
    '<SvgIcon name="ok" />',
    `<svg aria-hidden="true" class="${SVG_ICON_CLASSNAME}"><use xlink:href="#ok"></use></svg>`
  )
})
