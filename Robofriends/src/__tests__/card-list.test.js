import { shallow } from "enzyme";
import React from "react";
import CardList from "../CardList";

const mock = [
    {
        id:1,
        name:"terry",
        email:"limace@gmail.com"
    },
    {
        id:2,
        name:"terr",
        email:"limac@gmail.com"
    },
    {
        id:3,
        name:"ter",
        email:"lima@gmail.com"
    },
]

it("renders the card list with the right cards", () => {
    expect(shallow(<CardList robots={mock}/>)).toMatchSnapshot()
})
