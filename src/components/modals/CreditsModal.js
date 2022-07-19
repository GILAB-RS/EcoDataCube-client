import React from 'react';
import Dialog from 'rc-dialog';
import { Icon, Table } from 'semantic-ui-react';
import { toLonLat } from 'ol/proj';
import moment from 'moment';

const ALink = (props) => {
	return <a href={props.href} target="_blank" className="text_link text_bold">{props.children}</a>
} 


const CreditsModal = (props) => {
	return (
		<Dialog animation="zoom" maskAnimation="fade" title="Credits" onClose={props.cancel} visible={props.visible}>
			<div className="dialog-content">
				<div className="dialog-body container">
					<div className="row" style={{marginBottom: '20px'}}>
						<div className='col s12 text_center'>
							<a href="https://ec.europa.eu/inea/en/connecting-europe-facility/cef-telecom/2018-eu-ia-0095" target="_blank">
								<img src="/assets/cef_logo.png" style={{width: '100%'}} />
							</a>
						</div>
						<div className='col s12 text_center'>
						<a href="https://ec.europa.eu/inea/en/connecting-europe-facility/cef-telecom/2018-eu-ia-0095" target="_blank">
						<h3>CEF Telecom project 2018-EU-IA-0095. This project is co-financed by the European Union.</h3>							</a>
								
						</div>
						</div>
					<div className="row">
						<div className="col s12">
							<p className="text_white">
								Open Environmental Data Cube is based on open-source software: <ALink href="http://geoserver.org">Geoserver</ALink>,  <ALink href="https://geonetwork-opensource.org/">Geonetwork</ALink>,  <ALink href="https://reactjs.org">React</ALink>,  <ALink href="https://gdal.org/">GDAL</ALink>, <ALink href="https://openlayers.org">OpenLayers</ALink> and many others. Predictions are based on python and R packages software for statistical modeling, machine learning and spatial analysis: <ALink href="https://scikit-learn.org/">sci-kit learn</ALink>, <ALink href="https://www.tensorflow.org/">tensorflow</ALink>, <ALink href="https://rasterio.readthedocs.io/">rasterio</ALink>, <ALink href="https://mlr.mlr-org.com/">mlr</ALink> and <ALink href="https://rspatial.org/terra/pkg/index.html">terra</ALink>. Spatial analysis and visualization was implemented using: <ALink href="https://www.gdal.org/">GDAL</ALink>, <ALink href="http://www.saga-gis.org/">SAGA GIS</ALink>, <ALink href="https://grass.osgeo.org/">GRASS GIS</ALink>, <ALink href="https://www.qgis.org/">QGIS</ALink> and <ALink href="https://www.uoguelph.ca/~hydrogeo/WhiteboxTools/index.html">WhiteBoxTools</ALink>.
							</p>
							<p className="text_white">
								We are grateful to the <ALink href="https://gilab.rs">GiLAB Ltd</ALink> for back-end and front-end development of the App. We are also grateful to European Commission Joint Research Centre for providing support with data preprocessing and interpretation of results.  
							</p>

							<p className="text_white text_italic" style={{fontWeight: 'bold'}}>
								Background layers include:

								<ul>
								<li style={{fontStyle: 'normal', fontWeight: 'normal'}}><ALink href="https://www.openstreetmap.org/">OpenStreetMap</ALink> © OpenStreetMap contributors</li>
								<li style={{fontStyle: 'normal', fontWeight: 'normal'}}><ALink href="https://opentopomap.org/">OpenTopoMap</ALink> cartography © OpenTopoMap</li>
								<li style={{fontStyle: 'normal', fontWeight: 'normal'}}><ALink href="https://www.bing.com/maps/aerial">BingMaps Aerial</ALink> © 2018 Microsoft</li>
								</ul>
							</p>

							<p className="text_white">
								Landsat ARD images were obtained from the <ALink href="https://glad.umd.edu/">Global Land Analysis and Discovery</ALink> (GLAD), courtesy of University of Maryland. For more information about the Landsat ARD repository at GLAD please refer to <ALink href="https://www.mdpi.com/2072-4292/12/3/426">Potapov et al. (2020)</ALink>.
							</p>

							<p className="text_white">
								Training points Land cover classes were prepared by CVUT Prague from a combination of the <ALink href="https://land.copernicus.eu/imagery-in-situ/lucas">LUCAS survey points</ALink> (<ALink href="https://doi.org/10.1111/ejss.12499">Orgiazzi et al., 2018</ALink>; <ALink href="https://doi.org/10.1038/s41597-020-00675-z">d’Andrimont et al., 2020</ALink>) and points generated from the CORINE land cover maps.							</p>

								<p className="text_white">
								Training points Forest tree species were generated by combining a number of data sets including the <ALink href="https://www.gbif.org/occurrence">GBIF occurrences</ALink>, EU forest dataset (<ALink href="https://doi.org/10.1038/sdata.2016.123">Mauri et al., 2017</ALink>) and similar. The preprocessing steps are documented in detail in the <ALink href="https://gitlab.com/openlandmap/eu-forest-tree-point-data">OpenLandMap.org repository</ALink> by <ALink href="https://www.uni-muenster.de/Geoinformatics/en/institute/staff/index.php/354/Johannes_Heisig">Johannes Heisig</ALink>.							</p>

								<p className="text_white">
								CORINE Land Cover layers 2000, 2006, 2012, 2018 were obtained from the <ALink href="https://land.copernicus.eu/">Copernicus Land Monitoring Service</ALink> (100m - <ALink href="https://elib.dlr.de/113171/">Moser et al., 2017</ALink>). CORINE layers were produced by The Eionet network National Reference Centres Land Cover (NRC/LC).									</p>


								<p style={{fontWeight: 'bold'}} className="text_white text_italic">
									Cited sources:
									<ol>
									<li style={{fontStyle: 'normal', fontWeight: 'normal'}}>d’Andrimont, R., Yordanov, M., Martinez-Sanchez, L. et al. Harmonised LUCAS in-situ land cover and use database for field surveys from 2006 to 2018 in the European Union. Sci Data 7, 352 (2020). <ALink href="https://doi.org/10.1038/s41597-020-00675-z">https://doi.org/10.1038/s41597-020-00675-z</ALink></li>
									<li style={{fontStyle: 'normal', fontWeight: 'normal'}}>Mauri, A., Strona, G., & San-Miguel-Ayanz, J. (2017). EU-Forest, a high-resolution tree occurrence dataset for Europe. Scientific data, 4(1), 1-8. <ALink href="https://doi.org/10.1038/sdata.2016.123">https://doi.org/10.1038/sdata.2016.123</ALink> </li>
									<li style={{fontStyle: 'normal', fontWeight: 'normal'}}>Moser, Linda and Probeck, Markus and Ramminger, Gernot and Sannier, Christophe and Desclée, Baudouin and Schardt, Matthias and Gallaun, Heinz and Deutscher, Janik and Defourny, Pierre and Blaes, Xavier and Klein, Igor and Keil, Manfred and Hirner, Andreas and Esch, Thomas (2017) Sentinel-based Evolution of Copernicus Land Services on Continental and Global Scale. WorldCover 2017, 14–16 March 2017, Frascati (Rome), Italy. <ALink href="https://elib.dlr.de/113171/">https://elib.dlr.de/113171/</ALink> </li>
									<li style={{fontStyle: 'normal', fontWeight: 'normal'}}>Orgiazzi, A., Ballabio, C., Panagos, P., Jones, A., & Fernández‐Ugalde, O. (2018). LUCAS Soil, the largest expandable soil dataset for Europe: a review. European Journal of Soil Science, 69(1), 140-153. <ALink href="https://doi.org/10.1111/ejss.12499">https://doi.org/10.1111/ejss.12499</ALink></li>
									<li style={{fontStyle: 'normal', fontWeight: 'normal'}}>Potapov P., Hansen M.C., Kommareddy I., Kommareddy A., Turubanova S., Pickens A., Adusei B., Tyukavina A., Ying Q., (2020). Landsat Analysis Ready Data for Global Land Cover and Land Cover Change Mapping. Remote Sensing, 12(3):426. <ALink href="https://doi.org/10.3390/rs12030426">https://doi.org/10.3390/rs12030426</ALink> </li>
									</ol>
								</p>
						</div>
					</div>

				</div>
			</div>
		</Dialog>
	)
}


export default CreditsModal;
