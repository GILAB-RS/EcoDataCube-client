const api = 'https://api.opendatascience.eu/';
const geoserver = 'https://geoserver.opendatascience.eu/geoserver/';

const url = {
	WMS: geoserver + 'wms/',
	WFS: geoserver + 'wfs/?service=WFS&version=2.0.0&request=GetFeature&outputFormat=application/json&srsname=EPSG:3857',
	WFS4326: geoserver + 'wfs/?service=WFS&version=2.0.0&request=GetFeature&outputFormat=application/json&srsname=EPSG:4326',
	SLD: geoserver + 'rest/styles/',
	LAYERS: api + 'layers/',
	QUERY: api + 'point-query/',
	GEOSERVER: geoserver
}

export default url;
