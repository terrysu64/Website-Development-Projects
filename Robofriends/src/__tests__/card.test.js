import Card from "../Card";
import { shallow } from "enzyme";
import React from "react"

//shallow is just the component itself, no children
//mount needs full DOM API and affects the whole tree
//render -> to static html

it('should render Card component', () => {
    expect(shallow(<Card/>)).toMatchSnapshot() 
})

