import React from 'react';

import TileLayer from 'ol/layer/Tile';
import WMS from 'ol/source/TileWMS';

import PropTypes from 'prop-types';


class WMSLayer extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidUpdate(prevProps) {
		if(prevProps.visible !== this.props.visible) {
			this.instance.setVisible(this.props.visible);
		}
	}

	componentDidMount() {
		this.instance = new TileLayer({
			preload: Infinity,
			zIndex: 2,
			source: new WMS({
				url: 'https://geoserver.opengeohub.org/landgisgeoserver/wms',
				params: {
					'LAYERS': this.props.layer,
					'TRANSPARENT': true,
					'TILED': true,
					'CRS': 3857
				}
			}),
			visible: this.props.visible
		})

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

WMSLayer.propTypes = {
	layer: PropTypes.string
}

export default WMSLayer;
