
import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Menu from '../components/menu/index'

Enzyme.configure({ adapter: new Adapter() })

function setup() {
    const props = {
        addTodo: jest.fn(),
        category: [{ name: "first", id: 1 }, { name: "second", id: 2 }],
        selectedCategory: 1,
        onClick: jest.fn(),
        isLoading: false
    }

    const enzymeWrapper = shallow(<Menu {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('components', () => {
    describe('Menu', () => {
        it('should render self and subcomponents', () => {
            const { enzymeWrapper } = setup()
            expect(enzymeWrapper.find('div').at(0).hasClass('sidebar')).toBe(true)
            expect(enzymeWrapper.find('div').at(1).hasClass('menu')).toBe(true)

            expect(enzymeWrapper.find('b').at(0).text()).toBe('first')
            expect(enzymeWrapper.find('b').at(1).text()).toBe('second')

            const firstAProps = enzymeWrapper.find('a').at(0).props()
            expect(firstAProps.className).toBe('active')
            expect(firstAProps.href).toBe('#first')

            const secondAProps = enzymeWrapper.find('a').at(1).props()
           
            expect(secondAProps.className).toBe(null)
            expect(secondAProps.href).toBe('#second')
        })

        it('should call onClick if click on one of the categories', () => {
            const { enzymeWrapper, props } = setup()
            const firstCategory = enzymeWrapper.find('a').at(0)
            
            firstCategory.simulate('click', { preventDefault() { } })


            const secondCategory = enzymeWrapper.find('a').at(1)
            secondCategory.props().onClick('2')
            //props.onClick.mock.calls.length return the number of calls
            expect(props.onClick.mock.calls.length).toBe(1)
        })
    })
})