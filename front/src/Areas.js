import React, { Component } from 'react';
import axios from 'axios';

class Areas extends Component {

	state = {
		areas : null,
		restaurants : null,
		id : null
	}

	getAreas = () => {
		axios
			.get('http://localhost:3002/areas/')
			.then(res => {
				this.setState({ areas : res.data})
			})
	}

	FindRestaurantsByAreas = (id) => {
		axios
			.get(`http://localhost:3002/areas/${id}`)
			.then(res => {
				this.setState({ restaurants : res.data})
			})
	}

	setId = (event) => {
		const id = event.target.value;
		this.setState({ id });
		this.FindRestaurantsByAreas(id);
	}

	componentDidMount = () => {
		this.getAreas();
		this.FindRestaurantsByAreas();
	}

	render() {
		console.log(this.state.areas);
		if(this.state.areas === null){
			return "loading...";
		}
		console.log(this.state.restaurants);
		if(this.state.restaurants === null){
			return "loading...";
		}

		return (
			<div>
				<select onChange={this.setId}>
					<option>Choisissez un lieu</option>
					{this.state.areas.map((e,i) => (
						<option value={e.id} key={i}>{e.name}</option>
					))}
				</select>
				{this.state.restaurants.map((e,i) => (
					<div key={i}>
						<h3>{e.name}</h3>
						<img src={e.image_url} alt={e.image_url} style={{width:200, height:100}}/>
						<br />
						<p>{e.description}</p>
						<a target="_blank" rel="noopener noreferrer" href={e.to_website}>Page TimeOut du restaurant</a>
					</div>
				))}
			</div>
		);
	}
}

export default Areas;