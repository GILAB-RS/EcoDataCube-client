import { extend } from 'lodash';
import React from 'react';
import { Search } from 'semantic-ui-react';
import axios from 'axios';


const latLonRegex = new RegExp(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/);

class SearchLocation extends React.Component {
	state = {
		loading: false,
		results: [],
		value: ''
	}
	
	constructor(props) { 
		super(props);
		this.timeouts = [];
	} 

	debounce = (value) => {

		let item;
    if(value.match(latLonRegex)) {
      let coordinates = value.match(latLonRegex)[0].split(',');
      item = {
        key: Math.random(12),
        title: 'Go to location',
        description: this.formatCoordinates(coordinates[0], coordinates[1]),
        coordinates: [parseFloat(coordinates[1]), parseFloat(coordinates[0])]
      }
		}

		this.timeouts.map(t => {
			clearTimeout(t);
		}).filter(t => false)
		
		this.timeouts.push(setTimeout(() => {
			axios.get('https://nominatim.openstreetmap.org/search?format=json&limit=4&accept-language=en&q=' + value)
      .then(result => {
				
        this.setState({loading: false})
        let results = result.data.map((obj,key) => {
          return {
            key: key,
            title: obj.display_name,
            description: this.formatCoordinates(obj.lat, obj.lon),
            coordinates: [parseFloat(obj.lon), parseFloat(obj.lat)],
            bbox: obj.boundingbox
          }
        });

        if(item) {
          results.splice(0, 1, item);
        }
        
        this.setState({ results });

      })
      .catch(err => {
				this.setState({loading: false})
      })
		}, 1000))
		
	}

	formatCoordinates(lat, lon, noDegrees) {
    let easting, northing;
    
    if(parseFloat(lon) > 0) {
      easting = parseFloat(lon).toFixed(4) + '\xB0 E'
    } else {
      easting = (parseFloat(lon) * (-1)).toFixed(4) + '\xB0 W' 
    }

    if(parseFloat(lat) > 0) {
      northing = parseFloat(lat).toFixed(4) + '\xB0 N'
    } else {
      northing = (parseFloat(lat) * (-1)).toFixed(4) + '\xB0 S' 
    }

    return [parseFloat(lat).toFixed(4) +( noDegrees ? '' : '\xB0'), parseFloat(lon).toFixed(4) + (noDegrees ? '' : '\xB0')].join(', ')
	}
	
	handleChange = (e, {value}) => {
		if(value === '') {
			this.setState({value});
			return
		}

		this.setState({value, loading: true});
		this.debounce(value);
	}

	handleSelect = (e, {result}) => {
    this.setState({value: result.title, label: result.description});
    this.props.onUpdateState({ pinCoordinates: result.coordinates });
  }

	render() {
		return (
			<div className={"search-location-container" + (this.props.sidebar ? ' sidebar-opened' : '')}>
				<img onClick={() => this.props.onUpdateState({aboutModal: true})} style={{cursor: 'pointer', paddingBottom: 2}} height="25" src="/assets/ecodatacube_logo_europe.svg" />
				<Search 
					fluid
					selectFirstResult
					className="search-places"
					loading={this.state.loading}
					placeholder={'Search Location'}
					onSearchChange={this.handleChange}
					onResultSelect={this.handleSelect}
					results={this.state.results}
					value={this.state.value} />
			</div>
		)
	}
}

export default SearchLocation;