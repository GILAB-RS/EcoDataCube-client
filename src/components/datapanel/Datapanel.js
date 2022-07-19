import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Icon, Loader, Table } from 'semantic-ui-react';

import config from '../../config/linechart';

class Datapanel extends React.Component {
	constructor(props) {
		super(props)
	}

	shouldComponentUpdate(nextProps) {
		return true
	}

	renderTables = () => {
		let layerObj = this.props.layers.filter(l => l.name === this.props.layer)[0];
		let groups = { }

		let data = this.props.data;
	

		data.map((obj,key) => {
			if(groups[Math.floor(key/10) + 1]) {
				groups[Math.floor(key/10) + 1].push(obj);
			} else {
				groups[Math.floor(key/10) + 1]= [obj];
			}
		})

		return Object.values(groups).map((arr,key) => {
			
			

			return (
				<Table unstackable singleLine key={key * -12} className="datapanel-table">
					<Table.Body>
					{arr.map((obj,i) => {
						
						let units = layerObj.units;
						let value = layerObj.title.indexOf('NDVI Landsat') > -1 ? ((obj.value - 100)/100).toFixed(2) : obj.value;


					return (<Table.Row key={i}>
							<Table.Cell>{obj.year}</Table.Cell>
							<Table.Cell>{!layerObj.isClass ? value : obj.label} {layerObj.isClass ? null : units}</Table.Cell>
						</Table.Row>)
					})}
					</Table.Body>
				</Table>
			)
		})
	}


	renderChart = () => {
		let layerObj = this.props.layers.filter(l => l.name === this.props.layer)[0];
		let range = null;
		switch(layerObj.units) {
			case '%': range = [0, 100]; break;
			default: range = null;
		}
		

		let data = this.props.data.map(obj => ({x: obj.year, y: obj.value, label: obj.label, depth: obj.depth}));
		let layerName = layerObj.title;
		let colors = this.props.colors;

		return ( 
			<Bar 
				ref={ref => this.chart = ref}
				data={config.formatData(data, layerName, colors, layerObj.isClass, layerObj.timeScale, layerObj.depthRange ? this.props.depth : null)}
				options={config.formatOptions(layerName , layerObj.isClass, {units: layerObj.isClass ? null : layerObj.units, min: range}, this.props.colors, this.props.data)} />
		)
	}

	renderContent = () => {
		let layerObj = this.props.layers.filter(l => l.name === this.props.layer)[0];

		if(this.props.loading) {
			return <Loader active={true} size="massive" />
		}

		if(this.props.error) {
			return <p style={{fontWeight: 'bold', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} className="text_danger"><Icon name="warning sign" /> Error occured while trying to retrieve data for selected location!</p>
		}

		if(!this.props.data) {
			return 'CLICK'
		}

		console.log(layerObj)

		return (
			
			<div className="content">
			{layerObj.timeScale !== 'day' && !layerObj.depthRange && layerObj.timeScale !== 'season-3' && <div className="tabular-data">
					{this.renderTables()}
				</div>}
				<div className={"chart-data" + (layerObj.timeScale === 'day' || layerObj.timeScale === 'season-3' || layerObj.depthRange ? ' isDaily' : '')}>
					{this.renderChart()}
				</div>
			</div>
		)
	}

	render() {
		return (
			<div className={"datapanel-container" + (this.props.visible ? ' opened' : ' closed') + (this.props.sidebar ? ' sidebar-opened' : ' sidebar-closed')}>
				<div  onClick={() => {this.props.close()}}  className="close-icon">
					<Icon onClick={() => {this.props.close()}} style={{cursor: 'pointer', color: '#fff', position: 'absolute', zIndex: 10, right: 5, top: 5}} name="times" />
				</div>
				<div className="datapanel-content">
					{this.renderContent()}
				</div>
			</div>
		)
	}
}

export default Datapanel;