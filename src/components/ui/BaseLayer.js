import React from 'react';

import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Stamen from 'ol/source/Stamen';
import XYZ from 'ol/source/XYZ';

import PropTypes from 'prop-types';


const getType = (base, isGrayscale, active) => {
	switch(base) {
		case 'osm': return (
			new TileLayer({
				preload: Infinity,
				zIndex: 1,
				className: isGrayscale ? 'ol-layer grayscale' : 'ol-layer',
				source: new OSM(),
				visible: active
			})
		);

		case 'stamen': return (
			new TileLayer({
				preload: Infinity,
				zIndex: 1,
				className: isGrayscale ? 'ol-layer grayscale' : 'ol-layer',
				source: new Stamen({
					layer: 'toner-lite'
				}),
				visible: active
			})
		);

		case 'opentopomap': return (
			new TileLayer({
				preload: Infinity,
				zIndex: 1,
				className: isGrayscale ? 'ol-layer grayscale' : 'ol-layer',
				source: new XYZ({url: 'https:a.tile.opentopomap.org/{z}/{x}/{y}.png'}),
				visible: active
			})
		)

		default: return null;
	}
}


class BaseLayer extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidUpdate(prevProps) {
		if(prevProps.visible !== this.props.visible) {
			this.instance.setVisible(this.props.visible);
		}
	}

	componentDidMount() {
		this.instance = getType(this.props.base, this.props.grayscale, this.props.visible);

		if(this.instance) {
			this.props.map.addLayer(this.instance);
		}
	}

	componentWillUnmount() {
		this.props.map.removeLayer(this.instance)
	}

	render() {
		return null;
	}
}

BaseLayer.propTypes = {
	base: PropTypes.string
}

export default BaseLayer;
