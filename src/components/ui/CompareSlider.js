import React from 'react';
import Slider from 'react-slider';
import { Icon } from 'semantic-ui-react';


const CompareSlider = (props) => {
	return (
		<Slider
			value={props.swipe}
			max={100} min={0}
			withTracks
			step={0.1}
			className="compare-slider-control"
			renderThumb={(props, value) => {
				return <div {...props}>
					<Icon name="resize horizontal" />
				</div>
			}}
			onChange={props.onChange}
			trackClassName="track"
			thumbClassName="thumb comparison-thumb" />
	)
}


export default CompareSlider;