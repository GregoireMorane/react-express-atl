import React, { Component } from 'react';
import { Map, TileLayer, Marker, ZoomControl } from 'react-leaflet';

class SingleMap extends Component {

	state = {
		zoom: 15
	}

	render() {
		const position = [this.props.latitude, this.props.longitude]
	  return (
		<div style={{height:200,width:400}}>
			<Map center={position} zoom={this.state.zoom} zoomControl={false} style={{height:200,width:400}}>
				<TileLayer
					attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={position}>
				</Marker>
				<ZoomControl position="topright" />
			</Map>
		</div>
	  );
	}
}
  
export default SingleMap;