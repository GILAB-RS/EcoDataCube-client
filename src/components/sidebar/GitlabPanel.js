import axios from 'axios';
import React from 'react';
import { Icon, Loader } from 'semantic-ui-react';
import moment from 'moment';

class GitlabPanel extends React.Component {
	state = {
		loading: true,
		issues: [],
		error: false
	}

	constructor(props) {
		super(props)
	}

	componentDidMount() {
		axios.get('https://gitlab.com/api/v4/projects/21286348/issues')
		// axios.get('https://gitlab.com/api/v4/projects/20330939/issues')
			.then(result => {
				this.setState({
					loading: false,
					issues: result.data
				})
			})
			.catch(err => {
				this.setState({
					loading: false,
					issues: [],
					error: true
				})
			})
	}

	getTime = (date) => {
		let today = moment();
		let issueDate = moment(date);

		let miliseconds = today.diff(issueDate);

		let seconds = miliseconds/1000;
		if(seconds < 60) {
			return 'moment ago'
		}

		let minutes = seconds/60;
		if(minutes < 60) {
			return `${Math.round(minutes)} minute(s) ago`
		}

		let hours = minutes/60;
		if(hours < 24) {
			return `${Math.round(hours)} hour(s) ago`
		}

		let days = hours/24;
		if(days < 31) {
			return `${Math.round(days)} day(s) ago`
		}

		let months = days/31;
		if(months < 12) {
			return `${Math.round(months)} months(s) ago`
		}

		let years = months/12;
		return `${Math.round(years)} year(s) ago`
		

	}

	renderContent() {
		if(this.state.loading) {
			return <Loader active size="huge" />
		}

		if(this.state.error) {
			return <p className="text_danger"><Icon name="warning sign" /> Error occured while trying to retrieve issues from Gitlab!</p>
		}

		if(this.state.issues.length === 0) {
			return <p style={{textAlign: 'center'}} className="text_white">There are no issues reported!</p>
		}

		return this.state.issues.map((obj, key) => {
			return (
				<div key={key} className="issue-item">
					<a href={obj.web_url} target="_blank">
						<p style={{fontWeight: 'bold'}} className="text_white">{obj.title}</p>
						<p title={obj.description} className="text_description">{obj.description.slice(0, 200)} ...</p>

						<p className="text_description">
							{this.getTime(obj.created_at)}
						</p>
					</a>
				</div>
			)
		})
	}

	render() {
		return (
			<div className="sidebar-panel gitlab-panel">
				<div className="issues-title">
					<br/>
						<a href="https://gitlab.com/geoharmonizer_inea/spatial-layers/-/issues" target="_blank"><h2 style={{textAlign: 'center'}} className="text_white">Support</h2>
						<p style={{marginTop: 10, marginBottom: 10, padding: '0 10px 0 10px'}} className="text_white">We provide support on our Gitlab repository. Please, feel free to use it for issue reporting.</p>
						</a>
				</div>
				{this.renderContent()}
			</div>
		)
	}
}

export default GitlabPanel;