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
				<div style={{margin:'30px'}}>
					<h1 style={{
						fontFamily: 'Bad Script',    
						color: '#404254', }}>
						{this.state.restaurants[0].name}  
						<span style={{
							fontSize: '1em', 
							color: '#9494a6', 
							marginLeft : '20px'}}>
							{this.state.restaurants[0].address}, {this.state.restaurants[0].city}</span>
					</h1>
					<img src={this.state.restaurants[0].image_url} alt={this.state.restaurants[0].image_url} style={{maxWidth:'500px', float : 'left', margin : '30px auto'}}/>
					<p style={{}}>{this.state.restaurants[0].description}</p>
					<SingleMap style={{}} longitude={this.state.restaurants[0].longitude} latitude={this.state.restaurants[0].latitude} />
				</div>
			)
	}
} 