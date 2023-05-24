import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { Button, Icon, Loader } from 'semantic-ui-react';

class TwitterPanel extends React.Component {
	state = {
		hidden: true,
		twitterError: false
	}

	constructor (props) {
		super(props);
	}

	onLoad = (iframe) => {
		let newState = {
			hidden: false
		}
		if(!iframe) {
			newState.twitterError = true;
		}
		this.setState(newState)
	}

	refresh = () => {
		this.setState({
			hidden: true,
			twitterError: false
		})
	}

	render() {
		if(this.state.twitterError) {
			return (
				<div className={"twitter-container"}>
				
					<div className="twitter-error">
						<p className="twitter-error-message">Couldn't load tweets!</p>
						<Icon onClick={this.refresh} name="refresh" size={'large'} />
					</div>	
				</div>
			)
		}

		return (
			<div>
				<div className={"twitter-container" + (this.state.hidden ? ' hidden' : '') }>
					<TwitterTimelineEmbed
						sourceType="profile"
						screenName="opengeohub"
						transparent={true}
						theme={'dark'}
						noBorders
						noFooter
						noHeader
						onLoad={this.onLoad}/>
				</div>

				{this.state.hidden && <Loader active={true} size={'massive'}/>}
			</div>
		)
	}
	
}

export default TwitterPanel;