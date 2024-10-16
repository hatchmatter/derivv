import Enzyme, { shallow, render, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import toJson from 'enzyme-to-json'

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() })

// Make Enzyme functions available in all test files without importing
global.shallow = shallow
global.render = render
global.mount = mount
global.toJson = toJson
global.renderer = renderer

// Fail tests on any warning
console.error = message => {
  throw new Error(message)
}
