import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../containers/ErrorBoundary';
import '../containers/App.css';

const App = () => {
	const [robots, setRobots] = useState([]);
	const [searchfield, setSearchField] = useState('');

	useEffect(() => {
		console.log();
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(json => setRobots(json))
			.catch(err => console.log('an error occured: ', err))
	}, []);

	const onSearchChange = (event) => {
		setSearchField(event.target.value);
	}
 
	const filteredRobots = robots.filter(robot =>{
		return robot.name.toLowerCase().includes(searchfield.toLowerCase());
	})

	return !robots.length ? 
		<h1 className='tc'>Loading...</h1> :
		(
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<SearchBox searchChange={onSearchChange} />
				<Scroll>
					<ErrorBoundary>
						<CardList robots={filteredRobots} />
					</ErrorBoundary>
				</Scroll>
			</div>
		);
}

export default App;