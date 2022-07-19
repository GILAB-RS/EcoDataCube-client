import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import BingSource from 'ol/source/BingMaps';
import WMS from 'ol/source/TileWMS';
import xmlparser from 'xml2json-light';
import URL from 'urls';

import {createXYZ} from 'ol/tilegrid';
import {fromLonLat, get as getProj} from 'ol/proj';
import Overlay from 'ol/Overlay';
import VectorImage from 'ol/layer/VectorImage';
import Cluster from 'ol/source/Cluster';
import VectorSource from 'ol/source/Vector';
import {bbox as bboxStrategy} from 'ol/loadingstrategy';
import GeoJSON from 'ol/format/GeoJSON';
import Style from 'ol/style/Style';
import CircleStyle from 'ol/style/Circle';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Text from 'ol/style/Text';
import $data from './$data';

class $map {
	constructor() {
		this.styles = {}
	}

	createBasemaps(active, time, isNdvi, isDaily) {
		if(isNdvi || isDaily) {
			time = time.slice(0, 4);	
		}

		return [
			new TileLayer({
				name: 'OpenTopoMap',
				className: 'ol-layer grayscale',
				zIndex: 0,
				preload: Infinity,
				source: new XYZ({
					url: 'https://a.tile.opentopomap.org/{z}/{x}/{y}.png',
					// url: 'http://ns3112260.ip-54-36-111.eu:38080/tiles/1.0.0/otmg/osm_grid/{z}/{x}/{y}.png',
					crossOrigin: 'anonymous'
				}),
				visible: 'OpenTopoMap' === active
			}),
			new TileLayer({
				name: 'BingMaps (Aerial)',
				zIndex: 0,
				preload: Infinity,
				source: new BingSource({
					key: 'Am5pr8Q-dkmubEMkSwAsIfSkH8UrJjTHt-rMwQUfjjaG5ioU5prI9XSVfT9hjA8G',
					imagerySet: 'AerialWithLabels',
					// hidpi: OL_HAS.DEVICE_PIXEL_RATIO >= 2
				}),
				visible: 'BingMaps (Aerial)' === active
			}),
			new TileLayer({
				name: 'OpenStreetMap',
				className: 'ol-layer',
				zIndex: 0,
				preload: Infinity,
				source: new XYZ({
					url: 'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
					// url: 'http://ns3112260.ip-54-36-111.eu:38080/tiles/1.0.0/otmg/osm_grid/{z}/{x}/{y}.png',
					crossOrigin: 'anonymous'
				}),
				visible: 'OpenStreetMap' === active
			}),
			new TileLayer({
				name: 'OpenStreetMap (grayscale)',
				className: 'ol-layer grayscale',
				zIndex: 0,
				preload: Infinity,
				source: new XYZ({
					url: 'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
					// url: 'http://ns3112260.ip-54-36-111.eu:38080/tiles/1.0.0/otmg/osm_grid/{z}/{x}/{y}.png',
					crossOrigin: 'anonymous'
				}),
				visible: 'OpenStreetMap (grayscale)' === active
			}),
			new TileLayer({
				preload: Infinity,
				name: 'RGB Landsat (yearly)',
				timeParam: 'DIM_YEAR',
				zIndex: 1,
				source: new WMS({
					url: URL.WMS,
				// url: 'https://geoserver.opengeohub.org/landgisgeoserver/wms',
					params: {
						'LAYERS': 'gh:lcv-rgb-landsatXgladXard-p50-30m',
						'DIM_YEAR': time
					},
					serverType: 'geoserver',
					tileGrid: createXYZ({
						extent: getProj('EPSG:3857').getExtent(),
						tileSize: 512
					}),
				
				}),
				visible: 'RGB Landsat (yearly)' === active
			}),
		]
	}

	createTilelayers(layers, isComparison, layerName, opacity, time) {

		return layers.map(l => {
			let layer = Object.assign({}, l);
			let params = {
				'LAYERS': layer.geoserver_name,
				// 'FORMAT': 'image/png'
				// 'STYLES': layer.name
			}

			if(l.timeRange) {
	
				if(l.timeScale === 'day') {
					params[l.timeParam] =( layerName === l.name ? time.toString().split('-').join('') : l.defaultTime.split('-').join(''));
				} else {
					params[l.timeParam] =( layerName === l.name ? time : l.timeRange[l.timeRange.length - 1]);
				}
			}

			return new TileLayer({
				preload: Infinity,
				isComparison: isComparison ? true : false,
				name: layer.name,
				timeParam: layer.timeParam,
				timeScale: layer.timeScale,
				depthRange: layer.depthRange,
				defaultTime: layer.defaultTime,
				zIndex: 2,
				source: new WMS({
					url: URL.WMS,
				// url: 'https://geoserver.opengeohub.org/landgisgeoserver/wms',
					params: params,
					serverType: 'geoserver',
					tileGrid: createXYZ({
						extent: getProj('EPSG:3857').getExtent(),
						tileSize: 512
					}),
				
					transition: 0
				}),
				opacity: opacity / 100,
				visible: layer.name === layerName && !isComparison
			})
		})
	}

	createUncertaintyLayers(layers, opacity, time) {
		try {
			return layers.filter(l => l.uncertainty === true).map(layer => {
				let underscore = layer.geoserver_name.split('_').length > 1;

				let params = {
					// 'LAYERS': layer.geoserver_name.replace('_p_','_md_').replace('-p-', '-md-').replace('_mf_', '_md_').replace('-mf-', '-md-'),
					'LAYERS': underscore ? $data.formatForUncertainty(layer.geoserver_name) : $data.formatForUncertainty(layer.geoserver_name, '-'),
					// 'FORMAT': 'image/png'
					// 'STYLES': layer.name
				}
	
				if(layer.timeRange) {
					params[layer.timeParam] =( time ? time : layer.timeRange[layer.timeRange.length - 1]);
				}

				return new TileLayer({
					preload: Infinity,
					name: layer.name,
					timeScale: layer.timeScale,
					timeParam: layer.timeParam,
					defaultTime: layer.defaultTime,
					depthRange: layer.depthRange,
					zIndex: 2,
					source: new WMS({
						url: URL.WMS,
					// url: 'https://geoserver.opengeohub.org/landgisgeoserver/wms',
						params: params,
						serverType: 'geoserver',
						tileGrid: createXYZ({
							extent: getProj('EPSG:3857').getExtent(),
							tileSize: 512
						}),
					
						transition: 0
					}),
					opacity: opacity / 100,
					visible: false
				})
			})
		} catch(e) {
			console.log(e)
		}
		
	}

	createTrainingPoints(name) {
		return new VectorImage({
			preload: Infinity,
			minZoom: 11.9999,
			source: new Cluster({
				distance: 40,
				source: new VectorSource({
					format: new GeoJSON(),
					url: (extent) => {
						return URL.WFS + `&typeName=${name}&` + 'bbox=' + extent.join(',') + ',EPSG:3857'
						return URL.WFS + '&typeName=gh:tree_species_occ_harmonized_final&' + 'bbox=' + extent.join(',') + ',EPSG:3857'
					},
					strategy: bboxStrategy
				})
			}),
			zIndex: 5,
			visible: false,
			style: (feature) => {
				let size = feature.get('features').length;
				let style = this.styles[size];
				if(!style) {

					if(size === 1) {
						style = new Style({
							image: new CircleStyle({
								radius: 7,
								stroke: new Stroke({
									color: '#fff',
									width: 2,
								}),
								fill: new Fill({
									color: 'rgba(0,0,0,0.9)'
								}),
								
							}),
						})
					} else {
						style = new Style({
							image: new CircleStyle({
								radius: 12,
								stroke: new Stroke({
									color: '#fff'
								}),
								fill: new Fill({
									color: 'rgba(0,0,0,0.9)'
								}),
								
							}),
							text: new Text({
								text: size.toString(),
								offsetY: 1,
								fill: new Fill({
									color: '#fff'
								})
							})
						})
					}

					
				}
				return style;
			}
		})
	}

	

	createOverlay(elem) {
		let el = new Image();
		el.src = "/assets/pinicon.svg";
		el.className = "pin-icon-container";

		return new Overlay({
			position: null,
			positioning: 'bottom-center',
			element: el,
			stopEvent: false
		})
	}

	updateTime(time, layerName, layers) {
		let layer = layers.filter(l => l.get('name') === layerName)[0];
		if(layer) {

			if(layer.get('timeScale') === 'day') {
				
				layer.getSource().updateParams({[layer.get('timeParam')]: time.toString().split('-').join('')})
			} else {
				layer.getSource().updateParams({[layer.get('timeParam')]: time})
			}
		
		}
	}

	updateDepth(depth, layerName, layers) {
		console.log(depth)
		let layer = layers.filter(l => l.get('name') === layerName)[0];
		if(layer) {

			if(layer.get('depthRange')) {
				
				layer.getSource().updateParams({ 'dim_depth': depth})
			} 
		}
	}

	updateRGB(time, rgb, isNdvi, isDaily) {
		console.log(isDaily)
		rgb.getSource().updateParams({DIM_YEAR: isNdvi || isDaily ? time.toString().slice(0, 4) : time});
	}

	setLayer(layerName, layers) {
		try {
			let layer = layers.filter(l => {
				if(l.get('name') === layerName) {
					this.updateTime(l.get('defaultTime'), layerName, layers);
					return true
				} else {
					l.setVisible(false);
					return false
				}
			})[0];
	
			layer.setVisible(true);
	
		} catch(e) {
			console.log(e)
		}
	
	}

	changeBaseMap(time, layerName, layers){
		try {
			let layer = layers.filter(l => {
				if(l.get('name') === layerName) {
					if(layerName=== 'RGB Landsat (yearly)'){
						this.updateTime(time, layerName, layers);
					}
					return true
				} else {
					l.setVisible(false);
					return false
				}
			})[0];
	
			layer.setVisible(true);
	
		} catch(e) {
			console.log(e)
		}
	
	}

	setOpacity(val, layers) {
		layers.map(l => l.setOpacity(val/100))
	}

	centerTo(coordinates, isWgs, view) {
		view.animate({center: isWgs ? fromLonLat(coordinates) : coordinates, duration: 500})
	}

	formatLegend(xml) {
		try {
			let formated = xml
				.replace(/<sld:/g, '<')
				.replace(/<\/sld:/g, '</')
				.replace(/<se:/g, '<')
				.replace(/<\/se:/g, '</')
				.replace(/<ns0:/g, '<')
				.replace(/<\/ns0:/g, '</')
		

			let sliced = formated.slice(formated.indexOf('<ColorMapEntry'), formated.indexOf('</ColorMap>'));
			let json = xmlparser.xml2json(sliced);
			
			if(json.ColorMapEntry.constructor === Object) {
				json.ColorMapEntry = [Object.assign({}, json.ColorMapEntry)]
			}

			return json.ColorMapEntry.reverse().map(obj => {
				obj.label = obj.label.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
				return obj
			});
	
		} catch (error) {
			console.log(error)
			return []
		}
	}

	// 	return parser.readStyle(xml)
	// 		.then(sldObj => {
	// 			try {
	// 				return sldObj.rules[0].symbolizers[0].colorMap.colorMapEntries.reverse()
	// 			} catch(e) {
	// 				throw e
	// 			}

	// 		})
	// 		.catch(e => { throw e })
	// }



}

export default new $map();