const api = 'https://api-dev.opendatascience.eu/';
const geoserver = 'https://geoserver-dev.opendatascience.eu/geoserver/';

const url = {
	WMS: geoserver + 'wms/',
	WFS: geoserver + 'wfs/?service=WFS&version=2.0.0&request=GetFeature&outputFormat=application/json&srsname=EPSG:3857',
	SLD: geoserver + 'rest/styles/',
	LAYERS: api + 'layers/',
	QUERY: api + 'point-query/'
}

export default url;
