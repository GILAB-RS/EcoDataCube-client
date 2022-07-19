import React from 'react';
import Dialog from 'rc-dialog';
import { Icon, Table } from 'semantic-ui-react';
import { toLonLat } from 'ol/proj';
import moment from 'moment';

class TrainingModal extends React.Component {
	
	constructor(props) {
		super(props);
	}

	renderHeader = () => {
		return (
			<Table striped>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>No.</Table.HeaderCell>
						<Table.HeaderCell>Class</Table.HeaderCell>
						<Table.HeaderCell>Confidence</Table.HeaderCell>											
						<Table.HeaderCell>Year</Table.HeaderCell>
						<Table.HeaderCell>Survey date</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{this.renderFeatures()}
				</Table.Body>
			</Table>
		)
	}

	renderFeatures = () => {
		return this.props.features.map((feature, key) => {
			let properties = feature.getProperties();
			return (
				<Table.Row key={key}>
					<Table.Cell>{key + 1}</Table.Cell>
					<Table.Cell>{properties.landcover_class}</Table.Cell>
					<Table.Cell>{properties.confidence}</Table.Cell>
					<Table.Cell>{properties.year}</Table.Cell>
					<Table.Cell>{properties.survey_date}</Table.Cell>
				</Table.Row>
			)
		})


	}

	renderForestHeader = () => {
		return (
			<Table striped>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>No.</Table.HeaderCell>
						<Table.HeaderCell>ID</Table.HeaderCell>
						<Table.HeaderCell>Class</Table.HeaderCell>											
						<Table.HeaderCell>Year</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{this.renderForestFeatures()}
				</Table.Body>
			</Table>
		)
	}

	renderForestFeatures = () => {

		return this.props.features.map((feature, key) => {
			let properties = feature.getProperties();
			console.log(properties)
			return (
				<Table.Row key={key}>
					<Table.Cell>{key + 1}</Table.Cell>
					<Table.Cell>{properties.id}</Table.Cell>
					<Table.Cell>{properties.atlas_class}</Table.Cell>
					<Table.Cell>{properties.year}</Table.Cell>
				</Table.Row>
			)
		})
	}

	render() {
		let coords = null;
		if(this.props.features[0]) {
			coords = toLonLat(this.props.features[0].getGeometry().getCoordinates()).map(c => c.toFixed(4)).reverse().join(', '); 
		}

		let layerObj = this.props.layers.filter(l => l.title === this.props.layer)[0];

		if(!layerObj) layerObj = {};
		
		return (
			<Dialog animation="zoom" maskAnimation="fade" title="Feature(s) information" onClose={this.props.cancel} visible={this.props.visible}>
				<div className="dialog-content">
					<div className="dialog-body container">
						<div className="row">
							<div className="col s12">
								<p style={{color: '#fff'}}><Icon name="map marker alternate" />{coords}</p>
							</div>
						</div>
						<div className="row">
							<div className="col s12">
								{
									layerObj.code === 'veg' ? this.renderForestHeader() : this.renderHeader()
								}
								
							</div>
						</div>
					</div>
				</div>
			</Dialog>
		)
	}
}

export default TrainingModal;
