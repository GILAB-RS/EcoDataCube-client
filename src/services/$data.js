import axios from 'axios';
import URL from 'urls';
import $map from './$map';

let seasonMap =  {
	'03': ' - Spring',
	'06': ' - Summer',
	'09': ' - Autumn',
	'12': ' - Winter'
}

class $data {
	getLayers() {
		return axios.get(URL.LAYERS)
			.then(result => {

				try {
					// let list = result.data.filter(l => l.title !== 'AQ PM2.5' && l.title !== 'AQ PM2.5 count pixels').map(layer => {
						console.table(result.data.map(layer => ({title: layer.title, name: layer.gs_name})).filter(obj => obj.title.indexOf('NDVI') > -1))

					let list = result.data.filter(layer => layer.title !== null).map(layer => {
							let range = null;
							let depthRange = null;
						if(layer.range) {
							let years = layer.range.toString().split(',');

							if(layer.scale === 'year') {
								range = years;

								if(layer.description.indexOf('(ANV)') > -1) {
									range = layer.range.toString().split(',').map(y => y.replace('-', '..'))
								}
							}

							if(layer.scale === 'year-depth') {
								range = years;

								depthRange = layer['4d_range'] ? layer['4d_range'].toString().split(',') : null;
							}

							if(layer.scale === 'season') {
								range = layer.range;
							}
							
							if(layer.scale === 'day') {
								let splitted = layer.range.split('-');
			
								let first = `${splitted[0].slice(4, 8)}-${splitted[0].slice(2, 4)}-${splitted[0].slice(0, 2)}`;
								let second = `${splitted[1].slice(4, 8)}-${splitted[1].slice(2, 4)}-${splitted[1].slice(0, 2)}`;

								range = [first, second];

							}

							if(layer.scale === 'season-3') {
								range = years;
							}

							if(layer.scale === 'month') {
								range = years;
								console.log(years)
							}
						
						}
						if(layer.scale === 'season-3') {
							// console.log('=====================================')
							// console.log(layer)
							// console.log(layer.filename_pattern);
							// console.log(layer.scale)
						}
						

						return {
							no: layer.id,
							code: layer.code,
							theme: layer.theme,
							theme_id: layer.theme_number,
							query_name: layer.filename_pattern.split('/')[layer.filename_pattern.split('/').length - 1],
							name: layer.title,
							title: layer.title,
							description: layer.description,
							sld: layer.style + '.sld',
							geoserver_name: layer.gs_name,
							isClass: layer.unit === 'class',
							timeScale: layer.scale, //MENJACE SE
							timeRange: range,
							depthRange,
							defaultTime: range ? range[range.length - 1] : null,
							// timeRange: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
							timeParam: layer.scale === 'day' ? 'DIM_DATE' : 'DIM_YEAR',
							uncertainty: layer.uncertainty || layer.uncertainty === 1,
							units: layer.unit === 'index' ? null : layer.unit,
							has_points: layer.has_points === 1,
							gn_url: layer.gn_url,
							wasabi_link: layer.wasabi_link,
							seasonMap: seasonMap,
							stac_url: layer.stac_url,
							transformation: layer.scale_factor 
						}
					});	

					let filtered = list.filter(l => l.geoserver_name !== 'gh:lcv-ndvi-landsatXgladXard-p50-30m-0XX0cm--eumap-epsg3035-v1X0' && l.geoserver_name !== 'gh:lcv-rgb-landsatXgladXard-p50-30m'  && l.geoserver_name !== 'gh:lcv_point_samples')
					let ndvi = list.filter(l => l.geoserver_name === 'gh:lcv-ndvi-landsatXgladXard-p50-30m-0XX0cm--eumap-epsg3035-v1X0')[0];

					let ndviRange = ndvi.timeRange.split(",");
					
					filtered.push(Object.assign({}, {...ndvi, geoserver_name: 'gh:lcv-ndvi-landsatXgladXard-p50-30m',filter: '&season=03',timeRange: ndviRange.map(v => v + '03'), name: ndvi.title + ' - spring', title: ndvi.title + ' - Spring', suffix: ' - Spring'}));
					filtered.push(Object.assign({}, {...ndvi, geoserver_name: 'gh:lcv-ndvi-landsatXgladXard-p50-30m',filter: '&season=06',timeRange: ndviRange.map(v => v + '06'), name: ndvi.title + ' - summer', title: ndvi.title + ' - Summer', suffix: ' - Summer'}));
					filtered.push(Object.assign({}, {...ndvi, geoserver_name: 'gh:lcv-ndvi-landsatXgladXard-p50-30m',filter: '&season=09',timeRange: ndviRange.map(v => v + '09'), name: ndvi.title + ' - autumn', title: ndvi.title + ' - Autumn', suffix: ' - Autumn'}));
					filtered.push(Object.assign({}, {...ndvi, geoserver_name: 'gh:lcv-ndvi-landsatXgladXard-p50-30m',filter: '&season=12',timeRange: ndviRange.map(v => v + '12'), name: ndvi.title + ' - winter', title: ndvi.title + ' - Winter', suffix: ' - Winter'}));
					return filtered
				} catch(err) {
					let layers = window.localStorage.getItem('layers');
					console.log(err)
					if(layers) {
						return JSON.parse(layers);
					}
					return [];
				}
			})
			.catch(err => { throw err })
	}

	formatForUncertainty(name, splitter = "_") {
		let arr = name.split(splitter);
		arr.splice(3, 1, 'md');
		return arr.join(splitter);
	}

	getSld(sld, token) {
		return axios.get(URL.SLD + sld,  {cancelToken: token})
			.then(result => {
				return $map.formatLegend(result.data);
			})
			.catch(err => {throw err})
	}

	query(filter, token, func) {
		
		return axios.get(URL.QUERY + (filter ? filter : ''), {cancelToken: token})
			.then(result => {
				if(result.data.constructor === Object) {
					throw result.data.message
				}

				try {
					let f = new Function('x', 'return ' + func);

					let transformed = result.data.map(obj => {
						obj.value = f(obj.value).toFixed(2);
						return obj
					})

					return transformed;

				} catch(e) {
					console.log(e);
					return result.data
				}
			})
			.catch(err => {throw err})
	}
}

export default new $data();