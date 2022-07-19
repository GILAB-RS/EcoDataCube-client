import React from 'react';
import olMap from 'ol/Map';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
import $map from '../../services/$map';


class ErrorMap extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		console.log('START')
		this.basemaps = $map.createBasemaps('OpenTopoMap');

		this.map = new olMap({
			target: this.el,
			layers: this.basemaps,
			view: new View({
				center: fromLonLat([20.5, 45]),
				zoom: 4
			})
		})
	}

	render() {
		return (
			<div ref={ref => this.el = ref} className="map-wrapper"></div>
		)
	}

	
}

export default ErrorMap;