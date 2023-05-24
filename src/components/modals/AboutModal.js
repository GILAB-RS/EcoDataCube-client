import React from 'react';
import Dialog from 'rc-dialog';
import { Icon, Tab, Table } from 'semantic-ui-react';
import { toLonLat } from 'ol/proj';
import moment from 'moment';
import { Hidden } from 'react-grid-system';


const ALink = (props) => {
	return <a href={props.href} target="_blank" className="text_link text_bold">{props.children}</a>
} 

const AboutContent = (
	<div>
		<div className="row">
			<div className="col s12 text_center ">
				<ALink href="https:/ecodatacube.eu/"><img src="/assets/ecodatacube_logo_europe.svg" style={{maxWidth: '260px', width: '100%'}}/></ALink><br/>
			</div>
		</div>
		<div className="row">
			<div className="col s12">
				<p style={{fontWeight: 'bold', marginBottom: 25}} className="text_link text_center">
					Version: 0.0.1-1
				</p>						
			</div>
		</div>
		<div className="row">
			<div className='col s12'>
				<p className='text_white'>
				The
Open-Earth-Monitor Cyberinfratructure project has received funding from
the European Union's Horizon Europe research and innovation programme
under grant agreement <a href="https://cordis.europa.eu/project/id/101059548" target="_blank">No. 101059548</a>.
				</p>
				<br/>
			</div>
			<div className="col s12">
				<p className="text_white">
				<ALink href="https://ecodatacube.eu/"><strong>Open Environmental Data Cube</strong> hosted at ecodatacube.eu</ALink> comprises environmental, land cover, terrain, climatic, soil and vegetation layers covering the continental Europe at relatively fine spatial resolutions (30-m to 1-km). It has been produced within the CEF Telecom project <ALink href="https://ec.europa.eu/inea/en/connecting-europe-facility/cef-telecom/2018-eu-ia-0095">2018-EU-IA-0095</ALink>: <strong>“Geo-harmonizer: EU-wide automated mapping system for harmonization of Open Data based on FOSS4G and Machine”</strong>. Use it to visualize and serve spatiotemporal datasets for the periods 2000–2020 and beyond and share it with your colleagues. Predictions are typically based on using Ensemble Machine Learning applied to large spatiotemporal training datasets, often derived through other European Commission funded projects such as the <ALink href="https://ec.europa.eu/eurostat/web/lucas">LUCAS</ALink> (Land Use and Coverage Area frame Survey), and the <ALink href="https://land.copernicus.eu/">Copernicus Land Monitoring Service</ALink>. The Earth Observation data used to generate predictions is primarily based on the <ALink href="https://www.glad.umd.edu/ard/home">GLAD Landsat ARD imagery</ALink> and <ALink href="https://sentinel.esa.int/web/sentinel/sentinel-data-access">ESA Sentinel</ALink> products. To report an issue or a bug please use <ALink href="https://gitlab.com/geoharmonizer_inea/spatial-layers">gitlab</ALink>. Have a new similar data set that you would like to publish on the ecodatacube.eu data portal? Please <ALink href="https://opendatascience.eu/contact-us/">contact us.</ALink>				</p>
			</div>
		</div>

		<br/>

		{/* <a href="https://www.revolvermaps.com/livestats/5o8uf3wcmku/"><img src="//rf.revolvermaps.com/h/m/a/5/ff0000/128/40/5o8uf3wcmku.png" width="256" height="128" alt="Map" style={{border:0,textAlign: 'center', display: 'block', margin: '0 auto'}}/></a> */}
		<a href="https://www.revolvermaps.com/livestats/5jppoi7gq93/"><img src="//rf.revolvermaps.com/h/m/a/5/ff0000/128/35/5jppoi7gq93.png" width="256" height="128" alt="Map" style={{border:0,textAlign: 'center', display: 'block', margin: '0 auto'}}/></a>
			{/* <a target="_blank" style={{textAlign: 'center', width: '100%', display: 'block'}} href="https://clustrmaps.com/site/1bgit" title="Visit tracker"><img style={{maxWidth: 450, width: '100%'}} src="//clustrmaps.com/map_v2.png?cl=080808&w=450&t=n&d=LNR3np23K94W4FhhKRab9J_o0oFT1yMYRrVNTkUn-hk&co=ffffff&ct=808080" /></a>	 */}

	</div>
)



const LegalContent = (
	<div>
		<div className="row">
			<div className="col s12">
				<p className="text_white">
					EcoDataCube.eu is an  is an Open Data portal, mainly inspired by the <ALink href="https://openlandmap.org">OpenLandMap.org</ALink> and <ALink href="https://openstreetmap.org">OpenStreetMap.org</ALink> projects. If not otherwise specified, the data available on this portal is licensed under the <ALink href="https://opendatacommons.org/licenses/odbl/">Open Data Commons Open Database License</ALink> (ODbL) and/or <ALink href="https://creativecommons.org/licenses/by-sa/4.0/legalcode">Creative Commons Attribution-ShareAlike 4.0</ALink> and/or <ALink href="https://creativecommons.org/licenses/by/4.0/legalcode">Creative Commons Attribution 4.0</ALink> International license (CC BY). This means that you are free to use OpenDataScience.eu data for any purpose as long as you credit OpenDataScience.eu and its contributors. If the data is available under the CC BY-SA license, this implies that if you alter or build upon the data in certain ways, you may distribute the result only under the same licence. 			
				</p>
				<p className="text_white">
					To access data for operational projects we recommend using the EcoDataCube.eu <strong>Cloud-Optimized GeoTIFF service</strong>. This allows you to query, subset, overlay and download smaller chunks of data without a need to download Terabytes. Please refer to this <ALink href="https://gitlab.com/geoharmonizer_inea/spatial-layers">tutorial</ALink> to learn how to access and use the data in an optimal manner. 			
				</p>
				<p className="text_white">
					This site and many other related services are formally operated by the GeoHarmonizer project consortium on behalf of the community. Use of all OpenGeoHub Foundation operated services is subject to our <ALink href="https://opengeohub.org/about/">Terms & Conditions</ALink> and our <ALink href="https://opengeohub.org/privacy-policy/">Privacy Policy</ALink>.	
				</p>
				<p className="text_white">
					Please contact the <ALink href="https://opengeohub.org/about/">OpenGeoHub Foundation</ALink> and <ALink href="http://geomatics.fsv.cvut.cz/department-of-geomatics/">CVUT Prague</ALink> if you have any licensing, copyright or other legal questions.			
				</p>
				<p className="text_white">
					© Copyright <ALink href="https://opengeohub.org">OpenGeoHub</ALink> & <ALink href="http://geomatics.fsv.cvut.cz/department-of-geomatics/">CVUT Prague</ALink> & <ALink href="https://mundialis.de/en/">mundialis</ALink> & <ALink href="http://www.terrasigna.com/">Terrasigna</ALink> & <ALink href="http://www.multione.hr/eng.html">MultiOne 2020–2022</ALink>.
 			
				</p>

				<p className="text_white">
					The back-end and front-end solution for ecodatacube.eu was co-developed jointly with <ALink href="https://gilab.rs/">GiLAB</ALink>.
 			
				</p>
			</div>
		</div>
	</div>
)

const DataAccessContent = (
	<div>
		{/* <div className="row">
			<div className="col s12">
				<h2 className="text_white text_center">Data access and download</h2><br/>
			</div>
		</div> */}

		<div className="row">
			<div className="col s12">
				<p className="text_white">
					Accessing data through a file service (Cloud-Optimized GeoTIFFs): majority of layers available on <ALink href="https://ecodatacube.eu">https://ecodatacube.eu</ALink> are also available seamlessly through our Wasabi.com S3 file service as Cloud-Optimized GeoTIFFs under the <ALink href="https://opendatacommons.org/licenses/odbl/">Open Data Commons Open Database License</ALink> (ODbL) license. This means that you can (a) visualize the data and run processing directly using <ALink href="https://ecodatacube.eu/tutorial/GeoHarmonizer-acceesing-geospatial-data">QGIS or similar</ALink> (see short <ALink href="https://www.youtube.com/watch?v=BxUlpsRE-qI">video tutorial</ALink>), (b) import, subset, crop and overlay parts of data for the local area. <strong>We do not however recommend downloading whole data sets by using Wasabi.com</strong>. To download the complete datasets (whole of European continent) you should use zenodo.org or similar. The data is currently being uploaded to public data repositories.				
				</p>

				<p className="text_white">
					Vector data can be imported into QGIS in a standard way through WFS service using URL:
				</p>

				<ul>
					<li className="text_white"><ALink href="https://geoserver.opendatascience.eu/geoserver/wfs">https://geoserver.opendatascience.eu/geoserver/wfs</ALink></li>
				</ul>

				<p className="text_white">
					Raster layers (see <ALink href="https://gitlab.com/geoharmonizer_inea/eumap/-/blob/master/gh_raster_layers.csv">complete list</ALink>) can be accessed through HTTP service using QGIS (see also the COG <ALink href="https://www.cogeo.org/qgis-tutorial.html">tutorial</ALink>). These are example of layers:
				</p>

				<ul>
					<li style={{wordBreak: 'break-all'}} className="text_white">Landsat RGB (2019): <ALink href="http://s3.eu-central-1.wasabisys.com/eumap/lcv/lcv_rgb_landsat.glad.ard_p50_30m_0..0cm_2019_eumap_epsg3035_v1.0.tif">http://s3.eu-central-1.wasabisys.com/eumap/lcv/lcv_rgb_landsat.glad.ard_p50_30m_0..0cm_2019_eumap_epsg3035_v1.0.tif</ALink></li>
					<li  style={{wordBreak: 'break-all'}} className="text_white">Land Cover (2019): <ALink href="http://s3.eu-central-1.wasabisys.com/eumap/lcv/lcv_landcover.hcl_lucas.corine.rf_p_30m_0..0cm_2019_eumap_epsg3035_v0.1.tif
">http://s3.eu-central-1.wasabisys.com/eumap/lcv/lcv_landcover.hcl_lucas.corine.rf_p_30m_0..0cm_2019_eumap_epsg3035_v0.1.tif</ALink></li>
				</ul>

				<p className="text_white">
					<strong>File naming convention is explained in detail <ALink href="https://gitlab.com/geoharmonizer_inea/spatial-layers">here</ALink>. Download the style file (QML) <ALink href="http://s3.eu-central-1.wasabisys.com/eumap/lcv/lcv_landcover.hcl_lucas.corine.rf_p_30m_0..0cm_2000_eumap_epsg3035_v0.1.qml
">here</ALink>.
					</strong>
				</p>				

			</div>

			<div className="col s12">
				<p></p>
				<h3 className="text_white text_italic">GDAL Access</h3>
					<p className="text_white">
						The <ALink href="https://gdal.org/programs/gdal_translate.html">gdal_translate</ALink> can be used to download data directly from a COG URL. You just need to pass the bounding box information via the "-projwin" parameter, informing the COG url prefixed by "/vsicurl/":
					</p>

					<p className="text_white">
						<code>
							gdal_translate -co COMPRESS=LZW -projwin 3949019.319534085 3274684.0278522763 3997655.528969183 3247994.5591947753 /vsicurl/http://s3.eu-central-1.wasabisys.com/eumap/lcv/lcv_landcover.hcl_lucas.corine.rf_p_30m_0..0cm_2019_eumap_epsg3035_v0.1.tif lcv_landcover_amsterdam.tif
						</code>
					</p>

					<h3 className="text_white text_italic">Python Access</h3>
					<p className="text_white">
						To query the data for any coordinate/point of EU check this <ALink href="https://gitlab.com/geoharmonizer_inea/eumap/-/blob/master/demo/python/05_cloud_optimized_geotiff.ipynb
">Jupyter notebook tutorial</ALink>
					</p>

					<h3 className="text_white text_italic">R Access</h3>
					<p className="text_white">
						To access data from R using the terra package please use e.g.:
					</p>

					<p className="text_white">
						<code>
						library(terra)
in.tif = "/vsicurl/http://s3.eu-central-1.wasabisys.com/eumap/lcv/lcv_landcover.hcl_lucas.corine.rf_p_30m_0..0cm_2019_eumap_epsg3035_v0.1.tif"
tif = rast(in.tif)
						</code>
					</p>

					<p className="text_white">
					From here you can use any native operation e.g. to crop some polygon or resample / aggregate values.					</p>

					<p className="text_white">
					If you experience any technical problems or if you discover a bug, please report <ALink href="https://gitlab.com/geoharmonizer_inea/spatial-layers/-/issues">here</ALink>.					</p>



			</div>
		</div>

		
	</div>
)



const DisclaimerContent = (
	<div>
		<div className="row">
			<div className="col s12">
				<p className="text_white">
					The data is provided “as is”. GeoHarmonizer project consortium and its suppliers and licensors hereby disclaim all warranties of any kind, express or implied, including, without limitation, the warranties of merchantability, fitness for a particular purpose and non-infringement. Neither OpenGeoHub foundation nor its suppliers and licensors, makes any warranty that the Website will be error free or that access thereto will be continuous or uninterrupted. You understand that you download from, or otherwise obtain content or services through, the Website at your own discretion and risk.
				</p>
				<p className="text_white">
					Users are advised to contact the original data providers for original copies of point / tabular data indicated in the text above each imported dataset. If your data set is not cited correctly or you think is not imported and used correctly, please contact us (e-mail: <ALink href="mailto:support@opendatascience.eu">support@opendatascience.eu</ALink>) and we will do our best to adjust and correct. This site and many other related services are formally operated by the OpenGeoHub Foundation and CVUT Prague on behalf of the project consortium and community. Use of all OpenGeoHub Foundation operated services is subject to our <ALink href="https://opengeohub.org/general-terms-and-conditions">Terms & Conditions</ALink> and our <ALink href="https://opengeohub.org/privacy-policy/">Privacy Policy</ALink>.
				</p>
				<p className="text_white">
					This is a <strong>pre-beta release of Open Environmental Data Cube</strong>. To report an issue or a bug please use <ALink href="https://gitlab.com/geoharmonizer_inea/spatial-layers">gitlab</ALink>.
				</p>

				<img src="/assets/disclaimer_image.png" width="100%" />
			</div>
		</div>
	</div>
)

const panes = [
	{menuItem: 'About', render: () => <Tab.Pane>{AboutContent}</Tab.Pane>},
	{menuItem: 'Legal', render: () => <Tab.Pane>{LegalContent}</Tab.Pane>},
	{menuItem: 'Disclaimer', render: () => <Tab.Pane>{DisclaimerContent}</Tab.Pane>},
	{menuItem: 'Data access', render: () => <Tab.Pane>{DataAccessContent}</Tab.Pane>},
]

const AboutModal = (props) => {
	

	return (
		<Dialog className="about-modal" animation="zoom" maskAnimation="fade" title="Info" onClose={props.cancel} visible={props.visible}>
			<div className="dialog-content about-content">
				<div className="dialog-body container">
					<Tab panes={panes} />
				</div>
			</div>
		</Dialog>
	)
}


export default AboutModal;
