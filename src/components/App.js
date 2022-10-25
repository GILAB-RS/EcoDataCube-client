import React from 'react';

import { getRenderPixel } from 'ol/render';

import '../styles/main.scss';
import { unByKey } from 'ol/Observable';

import Wrapper from './wrapper/Wrapper';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import $params from '../services/$params';
import { Button, ButtonGroup, Loader, Search } from 'semantic-ui-react';

import Map from './map/Map';
import axios from 'axios';
import Toolbar from './toolbar/Toolbar';
import Timeline from './timeline/Timeline';
import LayerSelector from './toolbar/LayerSelector';
import Sidebar from './sidebar/Sidebar';
import defaults from '../config/defaults';
import Legend from './legend/Legend';
import $data from '../services/$data';
import $interceptor from '../services/$interceptor';

import logo from '../images/geoharmonizer_logo.png';
import SearchLocation from './search/SearchLocation';
import Footer from './footer/Footer';
import AboutModal from './modals/AboutModal';
import BookmarkModal from './modals/BookmarkModal';
import CreditsModal from './modals/CreditsModal';

class App extends React.Component {
	state = {
		sidebar: window.innerWidth >= 768 ? true : false,
		loading: true,
		layer: defaults.defaultState.layer,
		layer2: defaults.defaultState.layer,
		comparison: false,
		time: '2019',
		time2: '2019',
		depth: '0',
		depth2: '0',
		training_points: false,
		uncertainty: false,
		uncertainty2: false,
		aboutModal: false,
		bookmarkModal: false,
		bookmarkValue: '',
		panel: window.innerWidth >= 768 ? 'twitter' : null,
		_3d: false

	}

	constructor(props) {
		super(props)
	}

	updateState = (newState, callback) => {
		if (newState.hasOwnProperty('layer')) {
			this.pauseTimeAnimation();
			let layerObj = this.state.layers.filter(l => l.name === newState.layer)[0];

			newState.time = layerObj.timeRange ? layerObj.timeRange[layerObj.timeRange.length - 1] : null;

			newState.timeParam = layerObj.timeParam;

			newState.depth = layerObj.depthRange ? layerObj.depthRange[0] : null;
			// console.log(newState)
			console.log(newState)
		}

		if (newState.hasOwnProperty('layer2')) {
			let layerObj = this.state.layers.filter(l => l.name === newState.layer2)[0];

			newState.time2 = layerObj.timeRange ? layerObj.timeRange[layerObj.timeRange.length - 1] : null;
			newState.depth2 = layerObj.depthRange ? layerObj.depthRange[0] : null;

		}

		if (newState.layer) {
			console.log(newState)
		}

		this.setState(newState, () => {
			$params.change(this.state);
		});
	}

	componentDidUpdate(prevProps, prevState) {

	}

	initHotKeys = () => {
		document.addEventListener('keypress', (evt) => {

			//COMPARE HOT KEY
			if (evt.key === 'c') {
				if (window.innerWidth >= 768 && document.activeElement.tagName !== 'INPUT') {
					this.setState({ comparison: !this.state.comparison });
					return
				}
			}

			//SEARCH HOT KEY
			if (evt.key === '/') {
				if (!this.state.comparison) {
					if (document.activeElement.tagName === 'INPUT' && document.activeElement.class !== 'prompt') {

					} else {
						setTimeout(() => {
							document.querySelector('.prompt').focus()

						})
					}

					return
				}
			}

			//SIDEBAR HOT KEY
			if (evt.key === 'b') {
				if (!this.state.comparison && document.activeElement.tagName !== 'INPUT') {
					this.setState({
						sidebar: this.state.sidebar && this.state.panel === 'basemaps' ? false : true,
						panel: this.state.panel !== 'basemaps' ? 'basemaps' : null
					})
					return
				}
			}

			if (evt.key === 'l') {
				if (!this.state.comparison && document.activeElement.tagName !== 'INPUT') {
					this.setState({
						sidebar: this.state.sidebar && this.state.panel === 'layers' ? false : true,
						panel: this.state.panel !== 'layers' ? 'layers' : null
					})
					return
				}
			}

			if (evt.key === 's') {
				if (!this.state.comparison && document.activeElement.tagName !== 'INPUT') {
					this.setState({
						sidebar: this.state.sidebar && this.state.panel === 'gitlab' ? false : true,
						panel: this.state.panel !== 'gitlab' ? 'gitlab' : null
					})
					return
				}
			}

			if (evt.key === 't') {
				if (!this.state.comparison && document.activeElement.tagName !== 'INPUT') {
					this.setState({
						sidebar: this.state.sidebar && this.state.panel === 'twitter' ? false : true,
						panel: this.state.panel !== 'twitter' ? 'twitter' : null
					})
					return
				}
			}

			if (evt.key === 'h') {
				if (!this.state.comparison && document.activeElement.tagName !== 'INPUT') {
					this.setState({
						sidebar: this.state.sidebar && this.state.panel === 'help' ? false : true,
						panel: this.state.panel !== 'help' ? 'help' : null
					})
					return
				}
			}
		})
	}



	componentDidMount() {
		this.initHotKeys();
		// $params.format(window.location.search);
		window.addEventListener('resize', (evt) => {
			if (window.innerWidth < 768) {
				this.setState({
					comparison: false
				})
			}
		})

		$interceptor.init()

		$data.getLayers()
			.then(data => {

				let params = $params.format(window.location.search, data);

				window.localStorage.setItem('layers', JSON.stringify(data));

				this.setState({
					...params,
					layers: data,

				})

				setTimeout(() => {
					this.setState({ loading: false })
				}, 1500)
			})
			.catch(err => {

				let layers = JSON.parse(window.localStorage.getItem('layers') || '[]');

				let params = $params.format(window.location.search, layers);

				this.setState({ layers: layers, ...params })
				setTimeout(() => {
					this.setState({ loading: false })
				}, 1500)
			})
	}

	startTimeAnimation = () => {
		this.pauseTimeAnimation();

		let timeRange = this.state.layers.filter(l => l.name === this.state.layer)[0].timeRange;
		let startIndex = timeRange.indexOf(this.state.time ? this.state.time.toString() : timeRange[timeRange.length - 1]);
		this.setState({ time: (timeRange.length - 1) === startIndex ? timeRange[0] : timeRange[startIndex + 1], animation: true }, () => {
			this.timeInterval = setInterval(() => {
				let index = timeRange.indexOf(this.state.time);
				if (timeRange.length - 1 === index) {
					this.pauseTimeAnimation();
				} else {
					this.setState({ time: timeRange[index + 1] }, () => {
						$params.change(this.state)
					})
				}
			}, 1000)
		});


	}

	startReverseAnimation = () => {
		this.pauseTimeAnimation();

		let timeRange = this.state.layers.filter(l => l.name === this.state.layer)[0].timeRange;
		let startIndex = timeRange.indexOf(this.state.time ? this.state.time.toString() : timeRange[timeRange.length - 1]);

		this.setState({ time: startIndex === 0 ? timeRange[timeRange.length - 1] : timeRange[startIndex - 1], animation: true }, () => {
			this.timeInterval = setInterval(() => {
				let index = timeRange.indexOf(this.state.time);
				if (index === 0) {
					this.pauseTimeAnimation();
				} else {
					this.setState({ time: timeRange[index - 1] }, () => {
						$params.change(this.state)
					})
				}
			}, 1000)
		});
	}

	pauseTimeAnimation = () => {
		if (this.timeInterval) {
			clearInterval(this.timeInterval);
			this.setState({ animation: false });
		}
	}

	renderContent = () => {
		if (this.state.loading) {
			return (
				<div className="app-loading">
					<img width={300} src={'/assets/ecodatacube_logo_europe.svg'} />
					<Loader size="massive" active />
					<p>Loading data</p>
				</div>
			)
		}

		const mapType = !this.state._3d ? "geoh-cesium" : "geoh-cesium";

		if (this.state.comparison && !this.state._3d) {
			return (
				<div className="app-container">

					<Map className={mapType}
						comparison={this.state.comparison}
						base={this.state.base}
						layers={this.state.layers}
						layer={this.state.layer}
						layer2={this.state.layer2}
						time={this.state.time}
						time2={this.state.time2}
						depth={this.state.depth}
						depth2={this.state.depth2}
						zoom={this.state.zoom}
						eye={this.state.eye}
						center={this.state.center}
						opacity={this.state.opacity}
						onUpdateState={this.updateState} />

					<LayerSelector
						isSecond={false}
						layer={this.state.layer}
						time={this.state.time}
						depth={this.state.depth}
						layers={this.state.layers}
						onUpdateState={this.updateState} />

					<LayerSelector
						isSecond
						layer2={this.state.layer2}
						time2={this.state.time2}
						depth2={this.state.depth2}
						layers={this.state.layers}
						onUpdateState={this.updateState} />

					<Legend isComparison layer={this.state.layer} layers={this.state.layers} onUpdateState={this.updateState} />

					<Legend isComparison right layer={this.state.layer2} layers={this.state.layers} onUpdateState={this.updateState} />

					<Footer sidebar={this.state.sidebar} onUpdateState={this.updateState} />

					<AboutModal visible={this.state.aboutModal} cancel={() => this.setState({ aboutModal: false })} />
					<CreditsModal visible={this.state.creditsModal} cancel={() => this.setState({ creditsModal: false })} />

				</div>
			)
		}

		return (
			<div className="app-container">
				<Map className={mapType}
					sidebar={this.state.sidebar}
					comparison={this.state.comparison}
					base={this.state.base}
					layers={this.state.layers}
					layer={this.state.layer}
					layer2={this.state.layer2}
					time={this.state.time}
					time2={this.state.time2}
					depth={this.state.depth}
					training_points={this.state.training_points}
					uncertainty={this.state.uncertainty}
					zoom={this.state.zoom}
					eye={this.state.eye}
					center={this.state.center}
					opacity={this.state.opacity}
					pinCoordinates={this.state.pinCoordinates}
					_3d={this.state._3d}
					onUpdateState={this.updateState} />

				{/* <Legend layer={this.state.layer} uncertainty={this.state.uncertainty} layers={this.state.layers} onUpdateState={this.updateState} /> */}


				<SearchLocation sidebar={this.state.sidebar} onUpdateState={this.updateState} />

				<Toolbar sidebar={this.state.sidebar} panel={this.state.panel} onUpdateState={this.updateState} />

				<Timeline
					animation={this.state.animation}
					time={this.state.time}
					depth={this.state.depth}
					layer={this.state.layer}
					layer2={this.state.layer2}
					layers={this.state.layers}
					sidebar={this.state.sidebar}
					start={this.startTimeAnimation}
					startReverse={this.startReverseAnimation}
					pause={this.pauseTimeAnimation}
					onUpdateState={this.updateState} />

				<Legend layer={this.state.layer} uncertainty={this.state.uncertainty} layers={this.state.layers} onUpdateState={this.updateState} />

				<Footer sidebar={this.state.sidebar} onUpdateState={this.updateState} />

				<Sidebar
					panel={this.state.panel}
					opened={this.state.sidebar}
					base={this.state.base}
					layer={this.state.layer}
					layers={this.state.layers}
					training_points={this.state.training_points}
					uncertainty={this.state.uncertainty}
					opacity={this.state.opacity}
					zoom={this.state.zoom}
					eye={this.state.eye}
					onUpdateState={this.updateState} />

				<AboutModal visible={this.state.aboutModal} cancel={() => this.setState({ aboutModal: false })} />
				<CreditsModal visible={this.state.creditsModal} cancel={() => this.setState({ creditsModal: false })} />
				<BookmarkModal visible={this.state.bookmarkModal} currentUrl={window.location} cancel={() => this.setState({ bookmarkModal: false })} onUpdateState={this.updateState} />

			</div>
		)
	}



	render() {
		return (
			<Wrapper>
				<Router>
					<Switch>
						<Route exact path="/" render={() => { return this.renderContent() }} />
					</Switch>
				</Router>

			</Wrapper>
		)
	}
}

export default App;