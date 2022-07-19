import { fromLonLat } from 'ol/proj';
import React from 'react';
import { Button } from 'semantic-ui-react';
import defaultValues from '../../config/defaults';


const MapTools = (props) => {
	let {onUpdateState, zoom, center, geolocation, _3d} = props;
	return (
		<div className="map-tool-buttons">
			<Button onClick={() => {window.location.assign('https://maps.opendatascience.eu/')}} icon="home"></Button>
			<Button onClick={() => {onUpdateState({zoom: 4, center: defaultValues.defaultState.center})}} icon="globe"></Button>
			<Button onClick={() => {onUpdateState({zoom: zoom + 0.5})}} icon="plus"></Button>
			<Button onClick={() => {onUpdateState({zoom: zoom - 0.5})}} icon="minus"></Button>
			<Button onClick={() => {onUpdateState({geolocation: !geolocation})}} className={geolocation ? 'active-geolocation' : ''} icon="location arrow"></Button>
			{_3d ? 
				<Button onClick={() => {onUpdateState({_3d: false})}} className="three-d-icon">2D</Button>
				:
				<Button onClick={() => {onUpdateState({_3d: true})}} className="three-d-icon">3D</Button>				
			}
		</div>
	)
}

export default MapTools;