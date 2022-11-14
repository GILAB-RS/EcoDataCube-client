import axios from 'axios';
import React from 'react';
import { Icon, Loader, Popup } from 'semantic-ui-react';
import $map from '../../services/$map';
import URL from 'urls';
import $data from '../../services/$data';

class Legend extends React.Component {
	state = {
		loading: true,
		data: [],
		units: ''
	}
	
	constructor(props) { super(props); }

	componentDidMount() {
		this.getLegend(this.props.layer)
	}

	componentDidUpdate(prevProps) {
		if(prevProps.layer !== this.props.layer) {
			//UPDATE LEGEND
			this.getLegend(this.props.layer)
		}

		if(prevProps.uncertainty !== this.props.uncertainty) {
			this.getLegend(this.props.layer)
		}
	}

	getLegend = (layerName) => {
		this.setState({loading: true});
		//GET AND PARSE LEGEND
		let layer = this.props.layers.filter(l => l.name === layerName)[0];
		if(layer) {
			let units = layer.units;
			// let style = this.props.uncertainty ? layer.sld.replace('_p_', '_md_').replace('_mf_', '_md_')  : layer.sld;
			let style = this.props.uncertainty ?  $data.formatForUncertainty(layer.sld)  : layer.sld;
	
			$data.getSld(style.indexOf('.sld') === -1 ? style + '.sld' : style)
				.then(data => {
					this.setState({ loading: false, data, units })
				})
				.catch(err => {
					this.setState({loading: false, data: [], units})
				})
				
				return
		}

		this.setState({loading: false, data: [], units: null})
		
	}

	

	renderLegend = () => {
		if(this.state.loading) {
			return <Loader active={true} size={'small'} />
		}

		if(this.state.data.length === 0) {
			return (
				<div className="error-legend">
					<Icon name="warning sign" />
				</div>
			)
		}

		return this.state.data.map((colorObj, key) => {
			return (
				<div key={key} className="color-row">
					<Popup position={this.props.right ? "right center" : "left center"} trigger={
						<div style={{background: colorObj.color, cursor: 'pointer'}} className="color-cell">
						</div>
					}>{colorObj.label}</Popup>
					
				</div>
			)
		})
	}

	render() {
		if(this.props.layer === 'RGB Sentinel-2 (3 months)') {
			return null
		}

		return (
			<div className={"legend-container" + (this.props.right ? ' is-right' : '') + (this.props.isComparison ? ' comparison' : '')}>
				<div style={{position: 'relative'}}>
					<div className={"units" + (this.state.units && this.state.units !== 'class' ? '' : ' hidden')}>
						{this.state.units}
					</div>
				</div>
				
				<div className={"color-table" + (this.state.units && this.state.units !== 'class'? '' : ' units-hidden')}>
				{this.renderLegend()}
				</div>
			
			</div>
		)
	}
}

export default Legend;