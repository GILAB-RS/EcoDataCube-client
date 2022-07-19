import React from 'react';
import {  
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import { Button, Icon, Popup } from 'semantic-ui-react';


class SharePanel extends React.Component {
	constructor(props) {
		super(props)
	}

	state = {
		copyUrl: ''
	}

	render() {
		return (
			<div className="sidebar-panel share-panel">
				<h3 className="text_white text_center">Share via social networks</h3>
	
				<div className="social-btns">
					<Popup position="bottom left" trigger={<Button onClick={() => {
						let input = document.createElement('input');
						let text = 'https://maps.opendatascience.eu/' + window.location.search;
						this.setState({copyUrl: text})
						document.body.appendChild(input);
						input.value = text;
						input.select();
						document.execCommand('copy');
						document.body.removeChild(input);
					}} icon={'copy'}></Button>}>Copy URL</Popup>
					
					<Popup  position="bottom center" trigger={<FacebookShareButton url={'https://maps.opendatascience.eu/' + window.location.search} children={<Icon size="big" name="facebook" style={{color: '#016AE3'}} />} />}>Share via Facebook</Popup>
					<Popup  position="bottom center"trigger={<LinkedinShareButton url={'https://maps.opendatascience.eu/' + window.location.search} children={<Icon size="big" name="linkedin" style={{color: '#0A66C2'}}/>} />}>Share via Linkedin</Popup>
					<Popup  position="bottom right"trigger={<TwitterShareButton url={'https://maps.opendatascience.eu/' + window.location.search} children={<Icon size="big" name="twitter" style={{color: '#32A1F2'}} />} />}>Share via Twitter</Popup>
				</div>

				{this.state.copyUrl !== '' && <div>
					<p style={{marginTop: 20, marginBottom: 0, paddingLeft: 10}} className="text_white text_bold">Copied URL</p>
					<p className="text_description" style={{wordBreak: 'break-all', padding: 10}}>{decodeURIComponent(this.state.copyUrl)}</p>
				</div>}
	
			</div>
		)
	}
	
}

export default SharePanel;