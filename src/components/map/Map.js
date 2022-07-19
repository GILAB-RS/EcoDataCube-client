import olMap from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat, toLonLat, transform } from 'ol/proj';
import React from 'react';
import Wrapper from '../wrapper/Wrapper';
import $map from '../../services/$map';
import { Button, Checkbox, Icon } from 'semantic-ui-react';
import CompareSlider from '../ui/CompareSlider';
import { getRenderPixel } from 'ol/render';
import { unByKey } from 'ol/Observable';
import _ from 'lodash';

import gh_logo from '../../images/geoharmonizer_logo.png';
import PinIcon from '../ui/PinIcon';
import { defaults, ScaleLine } from 'ol/control'
import $data from '../../services/$data';
import Datapanel from '../datapanel/Datapanel';
import axios from 'axios';
import TrainingModal from '../training-modal/TrainingModal';
import VectorSource from 'ol/source/Vector';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import Projection from 'ol/proj/Projection';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Geolocation from 'ol/Geolocation';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import defaultValues from '../../config/defaults';

import * as Cesium from 'cesium/Build/Cesium/Cesium';

window.Cesium = Cesium;

window.Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwMzgxNTZkOC0wNDlmLTQxNTItODQ3MS01Y2IxNzgwN2NiOTAiLCJpZCI6NTgzMDQsImlhdCI6MTYyMzA3NDkxN30.vONojkn72YI5ZkWjRS11aRvW4YOyyZoU4bkUzwtGKiY'

import OLCesium from 'olcs/OLCesium';


// proj4.defs("EPSG:3035","+proj=laea +lat_0=52 +lon_0=10 +x_0=4321000 +y_0=3210000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");

// register(proj4);

// const projection = new Projection({
//   code: 'EPSG:3035',
// });

const instance = axios.create();
instance.CancelToken = axios.CancelToken;
let querySource = instance.CancelToken.source();

import { defaults as interactionDefaults } from 'ol/interaction/';
import VectorLayer from 'ol/layer/Vector';
import moment from 'moment';

class Map extends React.Component {
	state = {
		swipe: 50,
		datapanel: false,
		pointData: null,
		pointDataLoading: false,
		pointDataError: false,
		trainingModal: false,
		trainingFeatures: [],
		geolocation: false
	}

	constructor(props) {
		super(props);
	}

	initMapHotKeys = (evt) => {
		if (evt.key === '+' && document.activeElement.tagName !== 'INPUT') {
			this.map.getView().animate({ zoom: this.map.getView().getZoom() + 0.5, duration: 250 })
		}

		if (evt.key === '-' && document.activeElement.tagName !== 'INPUT') {
			this.map.getView().animate({ zoom: this.map.getView().getZoom() - 0.5, duration: 250 })

		}
	}

	componentWillUnmount() {
		document.removeEventListener('keypress', this.initMapHotKeys)
	}

	componentDidMount() {
		document.addEventListener('keypress', this.initMapHotKeys);

		this.basemaps = $map.createBasemaps(this.props.base, this.props.time, this.props.layer.indexOf('NDVI Landsat') > -1, this.props.layer.indexOf('ERA5') > -1);

		this.layers = $map.createTilelayers(this.props.layers, false, this.props.layer, this.props.opacity, this.props.time);

		this.uncertainty = $map.createUncertaintyLayers(this.props.layers, this.props.opacity, this.props.time)

		this.comparison = $map.createTilelayers(this.props.layers.map(l => Object.assign({}, l)), true, this.props.layer2, this.props.opacity, this.props.time2);

		this.training_points = $map.createTrainingPoints('gh:lcv_point_samples');

		this.forest_points = $map.createTrainingPoints('gh:veg_point_samples');

		this.pin = $map.createOverlay(this.pinElement);

		this.map = new olMap({
			target: this.element,
			maxTilesLoading: 32,
			interactions: interactionDefaults({ altShiftDragRotate: false, pinchRotate: false }),
			layers: _.concat(this.basemaps, this.layers, this.comparison, this.uncertainty, this.training_points, this.forest_points),
			controls: defaults().extend([new ScaleLine()]),
			overlays: [this.pin],
			view: new View({
				center: transform(this.props.center, 'EPSG:4326', 'EPSG:3857'),
				zoom: this.props.zoom,
				maxZoom: 28
			})
		});

		this.geolocation = new Geolocation({
			trackingOptions: {
				enableHighAccuracy: true,
			},
			projection: this.map.getView().getProjection()
		})

		this.geolocation.on('error', () => {

		})

		this.positionFeature = new Feature();
		this.positionFeature.setStyle(new Style({
			image: new CircleStyle({
				radius: 6,
				fill: new Fill({
					color: '#EB4850',
				}),
				stroke: new Stroke({
					color: '#fff',
					width: 2,
				}),
			}),
		}));

		this.geolocation.on('change:position', () => {
			let coordinates = this.geolocation.getPosition();
			this.positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
		});

		this.geolocationLayer = new VectorLayer({
			source: new VectorSource({
				features: [this.positionFeature]
			})
		})

		this.map3d = new OLCesium({ map: this.map });

		let scene = this.map3d.getCesiumScene();
		scene.terrainProvider = Cesium.createWorldTerrain({ requestVertexNormals: true });

		if(this.props._3d) {
			this.map3d.setEnabled(this.props._3d);
		}

		this.map.on('moveend', (evt) => {
			this.props.onUpdateState({
				zoom: evt.map.getView().getZoom(),
				center: toLonLat(evt.map.getView().getCenter())
			})
		})

		this.map.on('pointermove', (evt) => {
			let features = this.map.getFeaturesAtPixel(evt.pixel);
			if (features.length > 0) {
				document.querySelector('body').style.cursor = 'pointer';
			} else {
				document.querySelector('body').style.cursor = 'initial'
			}
		})

		this.map.on('singleclick', (evt) => {
			if (!this.props.comparison) {


				let features = this.map.getFeaturesAtPixel(evt.pixel);
				let check = this.featureCheck(features);



				if (!check) {

					this.query(evt.coordinate, this.props.layer);
					this.pin.setPosition(evt.coordinate);
					// let layerObj = this.props.layers.filter(l => l.name === this.props.layer)[0];

					// let lonlat = toLonLat(evt.coordinate);
					// let filter = `?lon=${lonlat[0]}&lat=${lonlat[1]}&property=${layerObj.query_name}`
					// this.props.onUpdateState({pinCoordinates: lonlat});
					// this.props.onUpdateState({pinCoordinates: null});

					// this.setState({datapanel: true, pointDataLoading: true, pointDataError: false, toUpdatePointData: true});
					// axios.all([$data.query(filter), $data.getSld(layerObj.sld)])
					// 	.then(axios.spread((query, sld) => {
					// 		this.setState({colors: sld.reverse(), pointDataLoading: false, pointData: query, toUpdatePointData: true});
					// 	}))
					// 	.catch(err => {
					// 		this.setState({colors: null, pointDataLoading: false, pointData: null, pointDataError: true, toUpdatePointData: true}); 
					// 	})

					return
				}

				if (check.constructor === Object) {
					let src = new VectorSource();
					src.addFeatures(check.list);

					this.map.getView().fit(src.getExtent(), { duration: 500, padding: [200, 320, 200, 200] });

					return
				}

				this.setState({
					trainingModal: true,
					trainingFeatures: check
				})


				// $data.query(filter)
				// 	.then(data => { this.setState({pointDataLoading: false, pointData: data, toUpdatePointData: true}); })
				// 	.catch(err => { this.setState({pointDataLoading: false, pointData: null, pointDataError: true, toUpdatePointData: true}); })
			}
		})

	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.base !== this.props.base) {
			$map.changeBaseMap(this.props.time, this.props.base, this.basemaps)
			// $map.setLayer(this.props.base, this.basemaps)
		}

		if (prevProps.layer !== this.props.layer) {
			let layerObj = this.props.layers.filter(l => l.name === this.props.layer)[0];

			if (this.props.uncertainty) {

				this.training_points.setVisible(false);
				this.forest_points.setVisible(false);
				if (layerObj.code === 'veg') {
					this.forest_points.setVisible(this.props.training_points);
				} else {
					this.training_points.setVisible(this.props.training_points);
				}

				if (layerObj.uncertainty) {
					this.layers.map(l => l.setVisible(false))
					$map.setLayer(this.props.layer, this.uncertainty);
					if (this.pin.getPosition()) {
						this.query(this.pin.getPosition(), this.props.layer);
					}
					return
				}

			}
			this.layers.map(l => l.setVisible(false));

			if (this.props.comparison) {
				this.deactivateComparison();
				$map.setLayer(this.props.layer, this.layers);
				this.activateComparison();
			} else {

				this.training_points.setVisible(false);
				this.forest_points.setVisible(false);
				if (layerObj.code === 'veg') {
					this.forest_points.setVisible(this.props.training_points);
				} else {
					this.training_points.setVisible(this.props.training_points);
				}
				$map.setLayer(this.props.layer, this.layers);
				if (this.pin.getPosition()) {
					this.query(this.pin.getPosition(), this.props.layer);
				}
			}
		}

		if (prevProps.layer2 !== this.props.layer2) {
			this.deactivateComparison();
			$map.setLayer(this.props.layer2, this.comparison);
			this.activateComparison();
		}

		if (prevProps.time !== this.props.time) {
			$map.updateTime(this.props.time, this.props.layer, this.uncertainty);
			$map.updateTime(this.props.time, this.props.layer, this.layers);

			$map.updateRGB(this.props.time, this.basemaps.filter(b => b.get('name') === 'RGB Landsat (yearly)')[0], this.props.layer.indexOf('NDVI Landsat (quarterly)') > -1, this.props.layer.indexOf('ERA5') > -1)
		}

		if (prevProps.time2 !== this.props.time2) {
			$map.updateTime(this.props.time2, this.props.layer2, this.comparison);
			$map.updateRGB(this.props.time2, this.basemaps.filter(b => b.get('name') === 'RGB Landsat (yearly)')[0], this.props.layer2.indexOf('NDVI Landsat (quarterly)') > -1, this.props.layer2.indexOf('ERA5') > -1)

		}

		if(prevProps.depth !== this.props.depth) {
			$map.updateDepth(this.props.depth, this.props.layer, this.uncertainty);
			$map.updateDepth(this.props.depth, this.props.layer, this.layers);
		}

		if(prevProps.depth2 !== this.props.depth2) {
			$map.updateDepth(this.props.depth2, this.props.layer2, this.comparison);
		}

		if (prevProps.comparison !== this.props.comparison) {
			if (this.props.comparison) {
				this.comparison.filter(l => l.get('name') === this.props.layer2)[0].setVisible(true);
				this.activateComparison();


			} else {
				this.deactivateComparison();
				this.comparison.filter(l => l.get('name') === this.props.layer2)[0].setVisible(false);


			}
		}

		if (prevState.swipe !== this.state.swipe) {
			this.map.render();
		}

		if (prevProps.opacity !== this.props.opacity) {
			$map.setOpacity(this.props.opacity, _.concat(this.layers, this.comparison, this.uncertainty));
		}

		if (this.props.pinCoordinates) {
			this.props.onUpdateState({ pinCoordinates: null });
			$map.centerTo(this.props.pinCoordinates, true, this.map.getView());
			this.query(fromLonLat(this.props.pinCoordinates), this.props.layer)
			this.pin.setPosition(fromLonLat(this.props.pinCoordinates));
		}

		if (prevProps.training_points !== this.props.training_points) {
			this.training_points.setVisible(false);
			this.forest_points.setVisible(false);

			let layerObj = this.props.layers.filter(l => l.title === this.props.layer)[0];
			if (layerObj) {
				if (layerObj.code === 'veg') {
					this.forest_points.setVisible(this.props.training_points);
				} else {
					this.training_points.setVisible(this.props.training_points);
				}

			}
		}

		if (prevProps.uncertainty !== this.props.uncertainty) {
			let layerObj = this.props.layers.filter(l => l.name === this.props.layer)[0];

			if (this.props.uncertainty && layerObj.uncertainty) {
				if (this.props.comparison) {
					this.deactivateComparison();
					$map.setLayer(this.props.layer, this.uncertainty);
					this.activateComparison();
				} else {
					this.layers.map(l => l.setVisible(false))
					$map.setLayer(this.props.layer, this.uncertainty);
					if (this.pin.getPosition()) {
						this.query(this.pin.getPosition(), this.props.layer);
					}
				}
			} else {
				this.uncertainty.map(l => l.setVisible(false))
				$map.setLayer(this.props.layer, this.layers);
				if (this.pin.getPosition()) {
					this.query(this.pin.getPosition(), this.props.layer);
				}
			}
		}

		if (prevProps._3d !== this.props._3d) {
			if (this.props._3d) {
				this.props.onUpdateState({ base: 'BingMaps (Aerial)' });
			} else {
				// console.log(this.map.getView().getRotation())
				setTimeout(() => {
					this.map.getView().animate({ rotation: 0 });

				})
			}
			this.map3d.setEnabled(this.props._3d);
		}

		if (prevState.geolocation !== this.state.geolocation) {
			this.geolocation.setTracking(this.state.geolocation);

			if (this.state.geolocation) {
				this.geolocationLayer.setMap(this.map);
				setTimeout(() => { this.geolocation.getPosition() ? this.map.getView().animate({ center: this.geolocation.getPosition(), duration: 250 }, { zoom: 14, duration: 500 }) : null; }, 400)
			} else {
				this.geolocationLayer.setMap(null)
			}


		}
	}

	featureCheck = (arr) => {
		if (arr.length === 0) {
			return false
		}

		let features = arr[0].get('features');

		if (features.length === 1) {
			return features
		}

		let isSame = true;
		let coord = features[0].getGeometry().getCoordinates().map(v => v.toFixed(4)).toString();

		features.map(f => {
			if (f.getGeometry().getCoordinates().map(v => v.toFixed(4)).toString() !== coord) {
				isSame = false;
			}
		})

		if (isSame) {
			return features
		}

		return { list: features }

	}

	query = (coords, layerName) => {
		querySource.cancel('cancel');
		querySource = instance.CancelToken.source();

		let layerObj = this.props.layers.filter(l => l.name === layerName)[0];
		let lonlat = toLonLat(coords);
		let sld = layerObj.sld;
		if(this.props.uncertainty) {
			let formated = $data.formatForUncertainty(layerObj.sld);

			sld = formated.indexOf('.sld') > -1 ? formated : formated + '.sld';
		}
		// let filter = `?lon=${lonlat[0]}&lat=${lonlat[1]}&property=${this.props.uncertainty ? layerObj.query_name.replace('_p_', '_md_') : layerObj.query_name}`
		let filter = `?lon=${lonlat[0]}&lat=${lonlat[1]}&property=${this.props.uncertainty ? $data.formatForUncertainty(layerObj.query_name) : layerObj.query_name}`

		if (layerObj.filter) {
			filter += layerObj.filter;
		}

		if (layerObj.timeScale === 'day') {
			filter += `&time=${this.props.time.split('-')[0]}`
		}

		this.setState({ datapanel: true, pointDataLoading: true, pointDataError: false, toUpdatePointData: true });

		// axios.all([$data.query(filter), $data.getSld(this.props.uncertainty ? layerObj.sld.replace('_p_', '_md_') : layerObj.sld)])
		axios.all([$data.query(filter, querySource.token, layerObj.transformation), $data.getSld(sld, querySource.token)])
			.then(axios.spread((query, sld) => {
				this.setState({ colors: sld.reverse(), pointDataLoading: false, pointData: query, toUpdatePointData: true });
			}))
			.catch(err => {
				if (err.status !== -998) {
					this.setState({ colors: null, pointDataLoading: false, pointData: null, pointDataError: true, toUpdatePointData: true });
				}
			})
	}

	activateComparison = () => {
		let layer1 = this.layers.filter(l => l.get('name') === this.props.layer)[0];
		let layer2 = this.comparison.filter(l => l.get('name') === this.props.layer2)[0];

		this.prerender1 = layer1.on('prerender', evt => {
			let ctx = evt.context;
			let mapSize = this.map.getSize();
			let width = mapSize[0] * (this.state.swipe / 100);


			let tl = getRenderPixel(evt, [0, 0]);
			let tr = getRenderPixel(evt, [width, 0]);
			let bl = getRenderPixel(evt, [0, mapSize[1]]);
			let br = getRenderPixel(evt, [width, mapSize[1]]);

			ctx.save();
			ctx.beginPath();
			ctx.moveTo(tl[0], tl[1]);
			ctx.lineTo(bl[0], bl[1]);
			ctx.lineTo(br[0], br[1]);
			ctx.lineTo(tr[0], tr[1]);
			ctx.closePath();
			ctx.clip();
		})

		this.prerender2 = layer2.on('prerender', evt => {
			let ctx = evt.context;
			let mapSize = this.map.getSize();
			let width = mapSize[0] * (this.state.swipe / 100);
			let tl = getRenderPixel(evt, [width, 0]);
			let tr = getRenderPixel(evt, [mapSize[0], 0]);
			let bl = getRenderPixel(evt, [width, mapSize[1]]);
			let br = getRenderPixel(evt, mapSize);



			ctx.save();
			ctx.beginPath();
			ctx.moveTo(tl[0], tl[1]);
			ctx.lineTo(bl[0], bl[1]);
			ctx.lineTo(br[0], br[1]);
			ctx.lineTo(tr[0], tr[1]);
			ctx.closePath();
			ctx.clip();
		})


		this.postrender1 = layer1.on('postrender', (event) => {
			let ctx = event.context;
			ctx.restore();
		})

		this.postrender2 = layer2.on('postrender', (event) => {
			let ctx = event.context;


			ctx.restore();

			let mapSize = this.map.getSize();
			let width = mapSize[0] * (this.state.swipe / 100);
			let tl = getRenderPixel(event, [width, 0]);
			let bl = getRenderPixel(event, [width, mapSize[1]]);

			ctx.beginPath();
			ctx.lineWidth = 3;
			ctx.strokeStyle = "#1A1A1A";
			ctx.moveTo(tl[0], tl[1]);
			ctx.lineTo(bl[0], bl[1]);
			ctx.stroke();

			this.map.render();

		})

	}

	deactivateComparison = () => {
		unByKey(this.prerender1);
		unByKey(this.prerender2);
		unByKey(this.postrender1);
		unByKey(this.postrender2);
		this.map.render();
	}


	renderSelectedLayer = (layerName) => {
		let layer = this.props.layers.filter(l => l.name === layerName)[0];
		if (!layer) {
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

		if (layer.timeScale === 'year' || layer.timeScale === 'season') {
			timeLabel = layer.timeScale === 'year' ? this.props.time : this.props.time.slice(0, 4) + ' - ' + seasons[this.props.time.slice(4, 6)]
			wasabi_link = wasabi_link.replace('_*_', `_${this.props.time}_`);
		}

		if(layer.timeScale === 'season-3') {
			timeLabel = this.props.time.slice(0, 4) + ' - ' + seasons[this.props.time.slice(4, 6)];
			wasabi_link = wasabi_link.replace('_*_', `_${this.props.time.slice(0,4) + '.' + this.props.time.slice(4,6)}_`)
		}

		if (layer.timeScale === 'month') {
			console.log(layer)
			timeLabel = layer.timeScale === 'year' ? this.props.time : this.props.time.slice(0, 4) + ' - ' + moment(this.props.time.slice(4, 6)).format('MMMM')
			wasabi_link = wasabi_link.replace('_*_', `_${this.props.time.slice(0,4) + '.' + this.props.time.slice(4,6)}_`)
		}

		if(layer.depthRange) {

			timeLabel = this.props.time + ` [${this.props.depth} cm]`;
			wasabi_link = wasabi_link.replace('{estimation_type}', this.props.uncertainty ? 'md' : 'm').replace('{depth}', `s${this.props.depth}..${this.props.depth}cm`).replace('{year}', this.props.time);
		}
		return (
			<div className="selected-layer-container">
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
					<p className="layer-title">{layer.title}</p>
					<div className="compare-btn" onClick={() => { this.props.onUpdateState({ comparison: true }) }} style={{ display: window.innerWidth < 768 ? 'none' : 'flex', cursor: 'pointer' }}>
						<Icon name="columns" style={{ color: "#fff" }} />
						<label style={{ fontSize: '11px', fontWeight: 'bold', color: '#fff', cursor: 'pointer' }}>COMPARE</label>
					</div>
				</div>
				<p title={layer.description} className="layer-description">{layer.description.split(' ').length > 14 ? layer.description.split(' ').filter((e, i) => i <= 14).join(' ') + '...' : layer.description}</p>
				<p className="layer-links">
					<a style={{ marginTop: 5, display: 'inline-block' }} href={layer.stac_url} target="_blank">
						<Button className="btn-link"><Icon name="info circle" />Metadata</Button>
					</a>
					<a style={{ marginTop: 5, display: 'inline-block' }} href={wasabi_link} target="_blank">
						<Button className="btn-link"><Icon name="download" />Download {timeLabel}</Button>
					</a>

					{/* &nbsp;|&nbsp;  */}
					{/* <a href={layer.layer_download_url} target="_blank">Download dataset</a> */}
				</p>
			</div>
		)
	}


	render() {
		return (
			<Wrapper>
				<div className={`cesium-map ${this.props.className}`}>
					<div ref={ref => this.element = ref} className="map-wrapper"></div>

					{this.props.comparison && <div className="compare-mode">
						<Checkbox onChange={(evt, data) => { this.props.onUpdateState({ comparison: data.checked }) }} checked={this.props.comparison} toggle label={'Turn off comparison'} />
					</div>}

					{!this.props.comparison && this.renderSelectedLayer(this.props.layer)}

					{this.props.comparison && <div className="compare-slider">
						<CompareSlider swipe={this.state.swipe} onChange={(val) => { this.setState({ swipe: val }) }} />
					</div>}

					{/* <a className={"logo-container" + (this.props.comparison ? ' comparison' : '')} href="https://opendatascience.eu/" target="_blank">
					<img width="200" src={'/assets/ods_logo_dev.svg'} />
				</a> */}
					<div className={"map-tool-buttons" + (this.props.comparison ? ' comparison' : '')}>
						<Button onClick={() => { window.location.assign('https://maps.opendatascience.eu/') }} icon="home"></Button>
						<Button onClick={() => { this.map.getView().animate({ zoom: 4, center: fromLonLat(defaultValues.defaultState.center), duration: 500 }) }} icon="compass"></Button>
						<Button onClick={() => { this.map.getView().animate({ zoom: this.map.getView().getZoom() + 0.5, duration: 250 }) }} icon="plus"></Button>
						<Button onClick={() => { this.map.getView().animate({ zoom: this.map.getView().getZoom() - 0.5, duration: 250 }) }} icon="minus"></Button>
						<Button onClick={() => this.setState({ geolocation: !this.state.geolocation })} className={this.state.geolocation ? 'active-geolocation' : ''} icon="location arrow"></Button>
						{this.props._3d ?
							<Button onClick={() => { this.props.onUpdateState({ _3d: false, wwd_3d: false }) }} className="three-d-icon">2D</Button>
							:
							<Button onClick={() => { this.props.onUpdateState({ _3d: true, _wwd_3d: false }) }} className="three-d-icon"><img width="20" style={{color: '#fff'}} src="/assets/cesium.svg" /></Button>
						}

						{this.props._wwd_3d ? 
						<Button onClick={() => { this.props.onUpdateState({ _3d: false, _wwd_3d: false }) }} className="three-d-icon">2D</Button>:
						<Button onClick={() => { this.props.onUpdateState({ _3d: false, _wwd_3d: true }) }} className="three-d-icon"><img width="30" style={{color: '#fff'}} src="/assets/wwd.svg" /></Button>}
					</div>

					<div className="cesium-credits" id="cesium-credits"></div>

					<PinIcon className="pin-icon-container" elem={(ref) => { this.pinElement = ref }} />

					<Datapanel depth={this.props.depth} sidebar={this.props.sidebar} visible={this.state.datapanel} colors={this.state.colors} layer={this.props.layer} layers={this.props.layers} loading={this.state.pointDataLoading} data={this.state.pointData} error={this.state.pointDataError} close={() => { this.setState({ datapanel: false, pointData: null }); this.pin.setPosition(null) }} preventUpdate={() => { this.setState({ toUpdatePointData: false }) }} />

					<TrainingModal layer={this.props.layer} layers={this.props.layers} visible={this.state.trainingModal} features={this.state.trainingFeatures} cancel={() => { this.setState({ trainingModal: false }, () => { setTimeout(() => { this.setState({ trainingFeatures: [] }) }, 500) }) }} />
				</div>
			</Wrapper>
		)
	}


	componentDidCatch(err) {
		console.log(err)
	}
}

export default Map;