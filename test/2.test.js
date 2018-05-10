import { shallow } from '@vue/test-utils'
import Icon from '../src'

const getWrapper = ctx => shallow(Icon, { context: ctx })

test('test', () => {
  expect(
    getWrapper({
      props: {
        name: 'ok'
      }
    }).text()
  ).toBe(1)
})
