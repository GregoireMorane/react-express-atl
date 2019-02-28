import React, { Component } from 'react';
import axios from 'axios';
import SingleMap from './SingleMap'

export default class Resto extends Component {

	state = {
		restaurants : null,
	}

	componentDidMount = () => {
		axios
			.get(`http://localhost:3002/api/restaurants/single/${this.props.match.params.id}`)
			.then(res => {
				this.setState({restaurants : res.data})
			})
	}

	render() {
		console.log(this.state.restaurants)
		console.log(this.props.match.params.id)
		if(this.state.restaurants === null)
			return "loading..."
			return(
				<div>
					<img src={this.state.restaurants[0].image_url} alt={this.state.restaurants[0].image_url} style={{width:400, height:200}}/>
					<h3>{this.state.restaurants[0].name}</h3>
					<p>{this.state.restaurants[0].description}</p>
					<p>{this.state.restaurants[0].address}</p>
					<p>{this.state.restaurants[0].city}</p>
					<SingleMap longitude={this.state.restaurants[0].longitude} latitude={this.state.restaurants[0].latitude} />
				</div>
			)
	}
} 