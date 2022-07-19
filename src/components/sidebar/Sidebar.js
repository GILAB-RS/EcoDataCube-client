import React from 'react';
import BasemapPanel from './BasemapPanel';
import BookmarkPanel from './BookmarkPanel';
import GitlabPanel from './GitlabPanel';
import HelpPanel from './HelpPanel';
import LayersPanel from './LayersPanel';
import SharePanel from './SharePanel';
import TwitterPanel from './TwitterPanel';

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
	}

	renderPanel = () => {
		switch (this.props.panel) {
			case 'basemaps': return <BasemapPanel base={this.props.base} onUpdateState={this.props.onUpdateState}/>;
			case 'gitlab': return <GitlabPanel />;
			case 'twitter': return <TwitterPanel />;
			case 'layers': return <LayersPanel uncertainty={this.props.uncertainty} zoom={this.props.zoom} training_points={this.props.training_points} layer={this.props.layer} layers={this.props.layers} opacity={this.props.opacity} onUpdateState={this.props.onUpdateState} />;
			case 'help': return <HelpPanel />
			case 'share': return <SharePanel />
			case 'bookmark': return <BookmarkPanel onUpdateState={this.props.onUpdateState}/>
			default:
				return;
		}
	}

	render() {
		return (
			<div className={"sidebar-container" + (this.props.opened ? ' opened' : '')}>
				{this.renderPanel()}
			</div>
		)
	}
}

export default Sidebar;