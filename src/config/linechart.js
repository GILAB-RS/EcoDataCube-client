import moment from 'moment';
import { format } from 'ol/coordinate';

const seasonMap =  {
	'03': ' - Spring',
	'06': ' - Summer',
	'09': ' - Autumn',
	'12': ' - Winter'
}

const getColor = (val, colors) => {
	for(let i = 0; i < colors.length; i++) {
		if(i === 0) {
			if(val < parseInt(colors[0].quantity)) {
				return colors[0].color
			}
		}
		
		
		if(i === colors.length - 1) {
			if(val >= parseInt(colors[i].quantity)) {
				return colors[i].color
			} else {
				return '#fff';
			}
		}


		if(val >= parseInt(colors[i].quantity) && val < parseInt(colors[i + 1].quantity)) {
			return colors[i].color
		}
	}

	return '#fff'
}

const formatData = (dataset, layer, colors, isClass, scale, depth) => {
	let data = dataset.map(obj => Object.assign({}, obj));
	let labels = dataset.map(obj => obj.x);

	if(isClass) {
		data = dataset.map(obj => ({y: 1}));
	}

	if(layer.indexOf('NDVI Landsat') > -1) {
		labels = [];
		data = dataset.map(obj => {labels.push(obj.x); return Object.assign({}, {...obj, y: (obj.y-100)/100})});
	}

	if(scale === 'season-3') {
		labels = [];
		console.log(dataset)
		data = dataset.map(obj => {labels.push(obj.x.toString().slice(0, 4) + seasonMap[obj.x.toString().slice(5, 7)]); return Object.assign({}, obj)});

	}

	if(depth) {
		console.log(depth)
		data = data.filter(obj => {
			if(obj.depth) {
				return obj.depth.toString() === depth.toString()
			}

			return true
		})
		labels = data.map(obj => obj.x);
	}

	let formatedColors =  dataset.map(obj => getColor(obj.y, colors));
	
	return {
		labels: labels,
		datasets: [{
			label: layer.toUpperCase(),
			data: data.map(obj => obj.y),
			barPercentage: 1,
			categoryPercentage: 0.8,
			// hoverBackgroundColor: '#ccc',
			borderColor: formatedColors,
			borderWidth: 1,
			backgroundColor: formatedColors,
			fill: false,
			spanGaps: true,
			yAxisID: layer
		}]
	}
}

const formatOptions = (layer, isClass, units, colors, dataset) => {

	let range = {};

	if(isClass) {
		range = {
			min: 0,
			max: 1
		}
	} else if(units.units === '%') {
		range.min = 0;
		range.max = 100;
		range.stepSize = 10;
	}

	if(layer.indexOf('NDVI Landsat') > -1) {
		// range.min = -1;
		range.max = 1;
		range.stepSize = 0.2;
	}

	return {
		maintainAspectRatio: false,
		animation: {
			duration: 150
		},
		legend: {
			labels: {
				fontColor: '#fff',
				fontStyle: 'bold',
				boxWidth: 0
			}
		},
		tooltips: {
			// mode: 'index',
			position: 'nearest',
			intersect: false,
			// axis: 'x',
			callbacks: {
				label: (data) => {
					if(layer.indexOf('NDVI Landsat') > -1) {
						return data.yLabel ? ' ' + data.yLabel.toFixed(2) + ' ' + (units.units ? units.units : '') : ' - '
					}

					if(isClass) {
						return dataset[data.index].label
					}

					return data.yLabel ? ' ' + data.yLabel + ' ' + (units.units ? units.units : '') : ' - '
				}
			}
		},
		scales: {
			xAxes: [{
				gridLines: {
					display: false,
				},
				offset: true,
				id: 'date',
				type: 'category',
				
				distribution: 'series',

				ticks: {
					fontColor: '#fff',
					autoSkipPadding: 20,
					maxRotation: 0,
					
				}
			}],
			yAxes: [{
				gridLines: {
					display: true,
					color: 'rgba(255,255,255, .2)'
				},
				display: !isClass,
				id: layer,
				ticks: {
					fontColor: '#fff',
					// callback: (value) => {
					// 	return units.range ? value + '%' : value;
					// },
					autoSkipPadding: 2,
					...range
				} 
				
			}]
		}

	}
}


export default {
	formatData, formatOptions, getColor
}