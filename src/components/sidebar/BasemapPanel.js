import React from 'react';
import { Image } from 'semantic-ui-react';
import bing from '../../images/bing_overview.png';
import otm from '../../images/opentopomap_overview_grayscale.png';
import osm from '../../images/osm_overview.png';
import rgb from '../../images/rgb.png';
import moment from 'moment';

const BasemapBox = (data) => {
	return (
		<div className={"basemap-box" + (data.base === data.title ? ' active' : '')}>
			<img style={{filter: data.grayscale ? 'grayscale(100)' : 'none'}} onClick={() => data.onUpdateState({base: data.title})} width="80"  src={data.img} size={'tiny'}/>
			<div className="basemap-text">
				<p  onClick={() => data.onUpdateState({base: data.title})} className="basemap-title">{data.title}</p>
				<p className="basemap-description">{data.description}</p>
			</div>
		</div>
	)
}


const BasemapPanel = (props) => {
	return (
		<div className="sidebar-panel basemap-panel">
			<BasemapBox 
				{...props} 
				img={otm} 
				title='OpenTopoMap' 
				description={<span><a target="_blank" href="https://openstreetmap.org/copyright">&copy; OpenStreetMap</a> contributors, <a target="_blank" href="http://viewfinderpanoramas.org/">SRTM</a>, <a target="_blank" href="https://opentopomap.org/">&copy; OpenTopoMap</a>, (<a target="_blank" href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)</span>} />
			<BasemapBox 
				{...props} 
				img={osm} 
				title='OpenStreetMap' 
				description={<span><a target="_blank" href="https://openstreetmap.org/copyright">&copy; OpenStreetMap</a> contributors</span>} />
			<BasemapBox 
				{...props} 
				img={osm} 
				grayscale
				title='OpenStreetMap (grayscale)' 
				description={<span><a target="_blank" href="https://openstreetmap.org/copyright">&copy; OpenStreetMap</a> contributors</span>} />
			<BasemapBox 
				{...props} 
				img={bing} 
				title='BingMaps (Aerial)' 
				description={<span>&copy; {moment().format('YYYY')} Microsoft Corporation &copy; {moment().format('YYYY')} Maxar &copy; CNES({moment().format('YYYY')}) Distribution Airbus DS &copy; {moment().format('YYYY')} TomTom <a href="https://www.microsoft.com/maps/product/terms.html" target="_blank">Terms of Use</a></span>} />
			<BasemapBox 
				{...props} 
				img={rgb} 
				title='RGB Landsat (yearly)' 
				description={<span>Landsat RGB time-series, derived by the median pixel values obtained between June 25 and September 12 on a specific year.</span>} />
		
		</div>
	)
}

export default BasemapPanel;