import React from 'react';
import { Icon } from 'semantic-ui-react';
import PinIcon from '../ui/PinIcon';
import ErrorMap from './ErrorMap';

class Wrapper extends React.Component {
	state = {
		error: false
	}

	static getDerivedStateFromError(error) {
		return {error: true}
	}

	constructor(props) {
		super(props)
	}

	renderType = (type) => {
		switch (type) {
			case 'map': return <ErrorMap />		
			default: return (
				<div className="error-container container">
					<div className="row">
						<div className="col s12">
							<Icon name="warning sign" className="error-icon" />
						</div>
						<div className="col s12">
							<h3>Something went wrong with rendering the content! Please, contact our technical support!</h3>
						</div>
					</div>
				</div>
			)
		}
	}

	render() {
		if(this.state.error) {
			return this.renderType(this.props.type);
			
		}

		return this.props.children
	}
}

export default Wrapper;