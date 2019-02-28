import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, ZoomControl } from 'react-leaflet';

class Areas extends Component {

	state = {
		areas : null,
		restaurants : null,
		id : null,
		zoom: 12
	}

	getAreas = () => {
		axios
			.get('http://localhost:3002/api/areas/')
			.then(res => {
				this.setState({ areas : res.data})
			})
	}

	FindRestaurantsByAreas = (id) => {
		axios
			.get(`http://localhost:3002/api/areas/${id}`)
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
				<div style={{height:500, width:600,float:"right"}}>
					<Map center={[48.8534, 2.3488]} zoom={this.state.zoom} zoomControl={false} style={{height:500}}>
						<TileLayer
							attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						{this.state.restaurants.map(e => (
							<Marker position={[e.latitude, e.longitude]}>
							</Marker>
						))}
						<ZoomControl position="topright" />
					</Map>
				</div>
				<div style={{width:400, float:"left"}}>
				{this.state.restaurants.map((e,i) => (
					<div key={i} style={{}}>
						<Link to={`/resto/${e.id}`} style={{textDecoration:'none'}}>
							<h3>{e.name}</h3>
						</Link>
						<img src={e.image_url} alt={e.image_url} style={{width:200, height:100}}/>
						<br />
						<p>{e.description}</p>
					</div>
				))}
				</div>
				<div style={{clear:"both"}}></div>
			</div>
		);
	}
}

export default Areas;