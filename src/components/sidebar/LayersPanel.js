import React from 'react';
import AnimateHeight from 'react-animate-height';
import Slider from 'react-slider';
import { Accordion, Checkbox } from 'semantic-ui-react';
import DropdownIcon from '../ui/DropdownIcon';

const themes = {
	lcv: 'Landcover, landuse and administrative data',
	dtm: 'Relief / geology',
	veg: 'Vegetation indices',
	clm: 'Climatic layers',
	ldg: 'Land degradation indices',
	pnv: 'Potential natural vegetation',
	sol: 'Soil properties and classes',
	hyd: 'Hydrology and water dynamics'
}

class LayersPanel extends React.Component {
	state = {
		activeIndex: -1,
		search: '',
		layers: this.props.layers,
		filter: ''
	}

	constructor(props) {
		super(props);
		this.active = {}
	}

	componentDidUpdate(prevProps) {
		if(this.props.layer !== prevProps.layer) {
			let layerObj = this.props.layers.filter(l => l.name === this.props.layer)[0];
			if(!layerObj.has_points) {
				this.props.onUpdateState({training_points: false});
			}

			// if(!layerObj.uncertainty) {
			// 	this.props.onUpdateState({uncertainty: false});
			// }
		}
	}

	componentDidMount() {
		setTimeout(() => {
			let groups = {};

			for(let i = 0; i < this.props.layers.length; i++) {
				groups[this.props.layers[i].theme] = false;
				if(this.props.layers[i].name === this.props.layer) {
					groups[this.props.layers[i].theme] = true;
					break;
				}
			}
	
			Object.values(groups).map((val, i) => {
				if(val) {
					this.setState({activeIndex: i})
				}
			});

			let contentEl = Object.values(this.active).filter(v => v)[0];
			let activeEl = this.list.querySelector('.active');

			activeEl.scrollIntoView(false);

		}, 200);
	

		
	}

	handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }
	
	renderGroups = () => {
		let groups = {};

		let filtered = this.props.layers.filter(layer => {
			if(this.state.filter === '') return true;

			return this.compareValues(layer.title, this.state.filter) || this.compareValues(layer.description, this.state.filter)

		})

		filtered.map(layer => {
			if(!groups.hasOwnProperty(layer.theme)) {
				groups[layer.theme] = [layer];
			} else {
				groups[layer.theme].push(layer);
			}
		})

		return Object.keys(groups).map((theme, key) => {
			return {
				key: key,
				title: (
					<Accordion.Title
						style={{margin: '0 auto', width: 'calc(100% - 15px)'}}
						active={this.state.activeIndex === key}
						index={key}
						onClick={this.handleClick}>
							<DropdownIcon style={{display: this.state.activeIndex !== key ? 'inline-block' : 'none'}} dropdown="icon dropdown-right" />
							<DropdownIcon style={{display: this.state.activeIndex === key ? 'inline-block' : 'none'}} dropdown="icon dropdown-down" />
							<label>{theme}</label>
					</Accordion.Title>
				),
				content: (
					<div>
						<AnimateHeight animateOpacity duration={300} height={this.state.activeIndex === key ? 'auto' : 0}>
							<div ref={ref => this.active[key] = this.state.activeIndex === key ? ref : null} className="content">
								<ul>
									{this.renderLayers(groups[theme])}
								</ul>
							</div>
						</AnimateHeight>
					</div>
				)
			}
            
					
				
			
		})
	}

	renderLayers = (layers) => {
		if(layers.length === 0) {
			return (
				<li className="no-hover">
					<p className="layer-title text_description">Search query doesn't match any of the results
</p>
				</li>
			)
		}
		return layers.map((layer, key) => {
			let description = layer.description.split(' ');
			let descriptionLength = description.length;
      return (
        <li id={layer.name} onClick={() => {
						let layerObj = this.props.layers.filter(l => l.name === layer.name)[0];
						if(this.props.layer !== layer.name) {
							let uncert = !layerObj.uncertainty ? {uncertainty: false} : {}

							this.props.onUpdateState({layer: layer.name, ...uncert})
						}	
					}} className={(this.props.layer === layer.name ? 'active' : '') } key={key}>
					<div>
						<p className="layer-title">{layer.title}</p>
						<p title={layer.description} className="layer-description">{descriptionLength > 14 ? description.filter((e, i) => i <= 14).join(' ') + '...' : layer.description}</p>
					</div>
				</li>
      )
    })
	}

	compareValues = (a,b) => {
		return a.trim().toLowerCase().indexOf(b.trim().toLowerCase()) > -1
	}

	searchLayers = (evt, layerObj) => {

		let layers = this.props.layers;

		if(evt.target.value !== '') {
			layers = this.props.layers.filter((l) => this.compareValues(l.title, evt.target.value) || this.compareValues(l.description, evt.target.value))
		}


		this.setState({
			search: evt.target.value, 
			layers: layers
	})
}

	render() {
		let layerObj = this.props.layers.filter(l => l.name === this.props.layer)[0];


		return (
			<div className="sidebar-panel layers-panel">
				<div className="search-layers-container">
				
					<input placeholder="Search layers" type="text" className="search-layers" onChange={(evt) => {this.setState({filter: evt.target.value})}} />
				</div>
				<div style={{paddingRight: 10,paddingLeft: 10, paddingTop: 10, paddingBottom: 20}} className="opacity-container">
					<p style={{color: '#fff', fontWeight: 'normal', marginBottom: 20}}>Opacity {this.props.opacity} %</p>
					<Slider 
					 max={100}
					 min={0}
					 value={this.props.opacity}
					 onChange={(val) => {this.props.onUpdateState({opacity: val < 0 ? 0 : val})}}/>
				</div>
				{/* <ul ref={ref => this.list = ref}>
					{this.renderLayers(this.state.layers)}
				</ul> */}

				<Accordion
					activeIndex={this.state.activeIndex}
					panels={this.renderGroups()}>

				</Accordion>

			

				<div style={{paddingRight: 5, paddingLeft: 10, paddingTop: 30, paddingBottom: 20}} className="uncertainty-container">
					<p style={{color: '#fff', fontWeight: 'bold', marginBottom: 20}}>Uncertainty</p>
					<Checkbox disabled={!layerObj.uncertainty} className={!layerObj.uncertainty ? 'is-disabled' : ''}  onChange={(evt, data) => {this.props.onUpdateState({uncertainty: data.checked})}} checked={this.props.uncertainty} toggle label={this.props.uncertainty ? 'Turn off' : 'Turn on'}/>
				</div>

				<div style={{paddingRight: 5, paddingLeft: 10, paddingTop: 30, paddingBottom: 20}} className="training-container">
					<p style={{color: '#fff', fontWeight: 'bold', marginBottom: 20}}>Training points</p>
					<Checkbox className={!layerObj.has_points ? 'is-disabled' : ''} disabled={!layerObj.has_points} onChange={(evt, data) => {this.props.onUpdateState({training_points: data.checked})}} checked={this.props.training_points} toggle label={this.props.training_points ? 'Turn off' : 'Turn on'}/>
					{this.props.zoom < 12 && this.props.training_points && <p style={{color: 'orange', fontWeight: 'bold', marginTop: 10}}>Training points are visible at zoom level 12 or higher!</p>}
				</div>
			</div>
		)
	}
}

export default LayersPanel;