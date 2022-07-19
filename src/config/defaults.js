const lists = {
	basemaps: ['bing', 'otm', 'stamen']
}

const defaultState = {
	base: 'OpenStreetMap (grayscale)',
	layer: "Land Cover ",
	opacity: 45,
	zoom: 4,
	eye: 5000000,
	center: [17.0066, 53.7139],
	time: 2019
}

export default {lists, defaultState};