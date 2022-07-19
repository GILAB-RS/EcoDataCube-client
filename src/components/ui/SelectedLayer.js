import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const SelectedLayer = (props) => {
	let layer = props.layers.filter(l => l.name === props.layer)[0];
	if(!layer) {
		return null
	}
	let seasons = {
		'03': 'Spring',
		'06': 'Summer',
		'09': 'Autumn',
		'12': 'Winter',
	}

	let wasabi_link = layer.wasabi_link || '';
	let timeLabel = null;

	if(layer.timeScale === 'year' || layer.timeScale === 'season') {
		timeLabel = layer.timeScale === 'year' ? props.time : props.time.slice(0, 4) + ' - ' + seasons[props.time.slice(4,6)]
		wasabi_link = wasabi_link.replace('_*_', `_${props.time}_`);
	}

	return (
		<div className="selected-layer-container">
			<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
				<p className="layer-title">{layer.title}</p>
				{!props._3d && <div className="compare-btn" onClick={() => {props.onUpdateState({comparison: true})}} style={{display: window.innerWidth < 768 ? 'none' : 'flex', cursor: 'pointer'}}>
					<Icon name="columns" style={{color: "#fff"}}/>
					<label style={{fontSize: '11px', fontWeight: 'bold', color: '#fff', cursor: 'pointer'}}>COMPARE</label>
				</div>}
			</div>
			<p title={layer.description} className="layer-description">{layer.description.split(' ').length > 14 ? layer.description.split(' ').filter((e,i) => i <= 14).join(' ') + '...' : layer.description}</p>
			<p className="layer-links">
				<a style={{marginTop: 5, display: 'inline-block'}} href={layer.gn_url || 'https://data.opendatascience.eu/geonetwork/'} target="_blank">
					<Button className="btn-link"><Icon name="info circle"/>Metadata</Button>
				</a>
				<a style={{marginTop: 5, display: 'inline-block'}} href={wasabi_link} target="_blank">
					<Button className="btn-link"><Icon name="download"/>Download {timeLabel}</Button>
				</a>
			
				{/* &nbsp;|&nbsp;  */}
				{/* <a href={layer.layer_download_url} target="_blank">Download dataset</a> */}
			</p>
		</div>
	)
}

export default SelectedLayer;