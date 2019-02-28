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
			<div style={{marginLeft : '20px'}}>
				<h1
				style={{fontFamily: 'Bad Script',    
				color: '#404254'}}>Choisir un lieu :</h1>
				<select onChange={this.setId} style={{
					marginBottom : '30px'
				}}>
					<option>Lieu</option>
					{this.state.areas.map((e,i) => (
						<option value={e.id} key={i}>{e.name}</option>
					))}
				</select>
				<div style={{height:500, width:700, float : "right"}}>
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
					<Link to={`/resto/${e.id}`} style={{textDecoration:'none'}}>
					<div key={i} style={{
						boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
						transition: '0.3s',
						paddingBottom : '20px',
						marginBottom : '30px',
						width : 500
					}}>
						<img src={e.image_url} alt={e.image_url} style={{maxWidth : '100%'}}/>
						
							<h3 style={{
								fontFamily: 'Bad Script',    
								color: '#404254', 
								fontSize: '2em'}}>{e.name}</h3>
						<p style={{
							textAlign : 'center',
							textDecoration:'none',
							fontSize : '1,5em',
							color : '#404254'
						}}>{e.description}</p>
					</div>
					</Link>

				))}
				</div>
				<div style={{clear:"both"}}></div>
			</div>
		);
	}
}

export default Areas;