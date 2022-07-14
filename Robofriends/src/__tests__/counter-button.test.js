import { shallow } from "enzyme";
import React from "react"
import { CounterButton } from "../CounterButton";

it('renders the button', () => {
    expect(shallow(<CounterButton/>)).toMatchSnapshot()
})

it('increments the button', () => {
    const wrapper = shallow(<CounterButton/>)
    wrapper.find('[id="counter"]').simulate('click')
    expect(wrapper.props().color).toEqual(undefined)
})