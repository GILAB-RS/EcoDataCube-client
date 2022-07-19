import React from 'react'
import { Dropdown } from "semantic-ui-react";
import Timeline from '../timeline/Timeline';


class LayerSelector extends React.Component {
	constructor(props) {
		super(props);
	}	

	componentDidUpdate(prevProps) {
	
	}
	
	render() {
		return (
			<div className={"layer-selector-container" + (this.props.isSecond ? ' second' : '')}>
				<Dropdown search selectOnNavigation={false} onChange={(evt, data) => {this.props.onUpdateState({[this.props.isSecond ? 'layer2' : 'layer']: data.value})}} value={this.props.isSecond ? this.props.layer2 : this.props.layer} placeholder="Select layer" selection options={this.props.layers.map(layer => ({
					key: layer.name,
					value: layer.name,
					text: layer.title
				}))} />
				
				<Timeline noAnimation isComparison depth2={this.props.depth2} depth={this.props.isSecond ? this.props.depth2 : this.props.depth} time={this.props.isSecond ? this.props.time2 : this.props.time}  isSecond={this.props.isSecond} layer={this.props.isSecond ? this.props.layer2 : this.props.layer} layers={this.props.layers} onUpdateState={this.props.onUpdateState} />
				{/* <div className="time-label-container">
					<div>Selected: {this.props.isSecond ? this.props.time2 : this.props.time}</div>
				</div> */}
			</div>
		)
	}

}
export default LayerSelector;