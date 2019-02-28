import React, { Component } from 'react';
import { Map, TileLayer, Marker, ZoomControl } from 'react-leaflet';
import axios from 'axios'

class MapAll extends Component {

	state = {
		restaurants: null,
		zoom: 13
	}

	componentDidMount = () => {
		axios
			.get(`http://localhost:3002/api/restaurants/`)
			.then(res => {
				this.setState({restaurants : res.data})
			})
	}

	render() {
		if(this.state.restaurants === null)
			return "loading..."
		return (
			<div style={{height:500}}>
				<Map center={[48.862659, 2.36371]} zoom={this.state.zoom} zoomControl={false} style={{height:500}}>
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
		);
	}

}

export default MapAll;