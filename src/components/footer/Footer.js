import React from 'react';
import moment from 'moment';
import { Popup } from 'semantic-ui-react';

const Footer = (props) => {
	return (
		<div className={"footer-container" + (props.sidebar ? ' sidebar-opened' : '')}>
				<span style={{display: 'flex', fontSize: '12px', lineHeight: '11px'}} className="text_description">© Open Environmental Data Cube</span>
			{/* <span style={{display: 'flex'}} className="text_description desktop">&copy; Copyright &nbsp;<a target="_blank" href="https://opengeohub.org">OpenGeoHub</a> &&nbsp; <a  target="_blank" href="http://geomatics.fsv.cvut.cz/department-of-geomatics/">CVUT Prague</a> &&nbsp; <a  target="_blank" href="https://www.mundialis.de">mundialis</a> &&nbsp; <a target="_blank" href="http://www.terrasigna.com/">Terrasigna</a> &&nbsp; <a  target="_blank" href="https://multione.hr/">MultiOne</a> 2020-2022</span>
			<Popup on='click' trigger={<span style={{cursor: 'pointer'}} className="text_description mobile">&copy; Copyright</span>}>	<span style={{}} className="text_description">&copy; Copyright &nbsp;<a target="_blank" href="https://opengeohub.org">OpenGeoHub</a> & <a  target="_blank" href="http://geomatics.fsv.cvut.cz/department-of-geomatics/">CVUT Prague</a> & <a  target="_blank" href="http://www.terrasigna.com/">Terrasigna</a> &  <a  target="_blank" href="https://www.mundialis.de">mundialis</a> &&nbsp;<a  target="_blank" href="https://multione.hr/">MultiOne</a> 2020-2022</span>
</Popup> */}
			<span style={{display: 'flex'}}>
				<a className="text_link" target="_blank" href="https://stac.ecodatacube.eu/">STAC</a>
				<a className="text_link desktop" target="_blank" href="https://data.opendatascience.eu/geonetwork/">Metadata</a>
				<a onClick={() => props.onUpdateState({aboutModal: true})} className="text_link" style={{cursor: 'pointer'}}>About</a>
				<a onClick={() => props.onUpdateState({creditsModal: true})} className="text_link" style={{cursor: 'pointer'}}>Credits</a>

				<a href="https://gilab.rs/" target="_blank" className="text_description">Powered by: <span className="text_link">GiLAB</span></a>

			</span>
		</div>
	)
}

export default Footer;