import React, { Component} from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import { robots } from './robots';

class App extends Component {

	constructor() {
		super()
		this.state = {
			'robots': robots,
			'searchfield': ''
		}
	}

	//any methods that arent prebuilt need the special => syntax
	onSearchChange = (event) => {
		this.setState({ 'searchfield' : event.target.value})
	}

	render() {
		const filteredRobots = this.state.robots.filter(robot => {
			return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
		})
		return (
			<div className='tc'>
				<h1>Robofriends</h1>
				<SearchBox searchChange={this.onSearchChange}/>
				<CardList robots={filteredRobots}/>
			</div>
		);
	};
};

export default App;
