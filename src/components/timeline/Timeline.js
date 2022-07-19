import React from 'react';

import Slider from 'react-slider';
import { DateInput } from 'semantic-ui-calendar-react';
import { Icon } from 'semantic-ui-react';
import moment from 'moment';

const getPrev = (date, range) => {
	if(moment(date).diff(moment(range[0])) > 0) {
		return moment(date).subtract(1, 'days').format('YYYY-MM-DD');
	}

	return date;
}

const getNext = (date, range) => {
	if(moment(range[1]).diff(moment(date)) > 0) {
		return moment(date).add(1, 'days').format('YYYY-MM-DD');
	}

	return date;
}

const Timeline = (props) => {

	let layerObj = props.layers.filter(l => l.name === props.layer)[0];

	if(!layerObj) {
		return null
	}

	if(!layerObj.timeRange) {
		return null
	}

	if(layerObj.timeScale === 'day') {
		// return null
		
	
		return (
			<div className={"calendar-container"  + (props.sidebar ? ' opened' : '')  + (props.isComparison ? ' comparison' : '')}>
				<label onClick={() => {props.onUpdateState({[props.second ? 'time2' : 'time']: getPrev(props.time, layerObj.timeRange)})}} className='arrow-label'>
					<Icon name="caret left" />
				</label>

				<DateInput 
					value={props.time}
					onChange={(evt, {name, value}) => {
						props.onUpdateState({ [name]: value });
					}}
					closable
					popupPosition={'top right'}
					closeOnMouseLeave={false}
					dateFormat={'YYYY-MM-DD'}
					name={props.isSecond ? 'time2' : 'time'}
					mountNode={document.querySelector('#root')}
					animation={null}
					minDate={layerObj.timeRange[0]}
					maxDate={layerObj.timeRange[1]} />

					<label className="active-day">{moment(props.time).format('DD-MMM-YYYY')}</label>
					
					<label onClick={() => {props.onUpdateState({[props.isSecond ? 'time2' : 'time']: getNext(props.time, layerObj.timeRange)})}} className='arrow-label'>
						<Icon name="caret right" />
					</label>
			</div>
		)
	}


	
	const sliderRef = React.useRef();
	React.useEffect(() => sliderRef.current.resize());

	let animationBtnsForward = props.animation ? <Icon style={{cursor: 'pointer'}} onClick={props.pause} name="pause" size="small"></Icon> :
	<Icon style={{cursor: 'pointer'}} onClick={props.start} name="play" size="small"></Icon>;

	let animationBtnsBackward = props.animation ? <Icon style={{cursor: 'pointer'}} onClick={props.pause} name="pause" size="small"></Icon> :
	<Icon style={{cursor: 'pointer',  transform: 'rotate(180deg)'}} onClick={props.startReverse} name="play" size="small"></Icon>;

	if(props.noAnimation) {
		animationBtnsForward = null;
		animationBtnsBackward = null;
	}

	let activeTime = props.time;
	let minTime = layerObj.timeRange[0];
	let maxTime = layerObj.timeRange[layerObj.timeRange.length - 1];

	if(layerObj.timeScale === 'season') {
		activeTime = activeTime.slice(0, 4) + layerObj.suffix;
		minTime = minTime.slice(0, 4) // + layerObj.suffix;
		maxTime = maxTime.slice(0, 4) // + layerObj.suffix;
	}

	if(layerObj.timeScale === 'season-3') {
		activeTime = activeTime.slice(0, 4) + layerObj.seasonMap[activeTime.slice(4, 6)];
		minTime = minTime.slice(0, 4) // + layerObj.suffix;
		maxTime = maxTime.slice(0, 4) // + layerObj.suffix;
	}

	if(layerObj.timeScale === 'month') {
		activeTime = activeTime.slice(0, 4) + ' - ' + moment(activeTime.slice(4, 6)).format('MMMM');
		minTime = minTime.slice(0, 4) // + layerObj.suffix;
		maxTime = maxTime.slice(0, 4) // + layerObj.suffix;
	}
	
	console.log(layerObj)

	return (
		<div className={"timeline-container" + (props.sidebar ? ' opened' : '')}>
			<div className="timeline-content-wrapper">
			<label className={"active-time" + (props.isComparison ? ' compare' : '')} style={{color: '#fff', lineHeight: '40px'}}>{activeTime}</label>

			<label className="time-marker" style={{marginRight: 5, color: '#fff', lineHeight: '40px'}}>{minTime}</label>

			<label style={{marginRight: 2, height: '40px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', color: '#fff', lineHeight: '40px'}}>
			{animationBtnsBackward}				
			</label>

			{layerObj.depthRange && (
				<div className={'depth-range-container' + (props.isSecond ? ' is-second ' : '') + (props.isComparison ? ' is-compare ' : "")}>
					{layerObj.depthRange.map((val, key) => {
						return props.isSecond ? <div onClick={() => props.onUpdateState({depth2: val})} className={"depth-item" + (val === props.depth2 ? ' active' : '')}>{val} cm</div> : <div onClick={() => props.onUpdateState({depth: val})} className={"depth-item" + (val === props.depth ? ' active' : '')}>{val} cm</div>
					})}
				</div>
			)}

			<Slider
				ref={sliderRef}
				value={layerObj.timeRange.indexOf(props.time.toString())}
				max={layerObj.timeRange.length - 1}
				min={0}
				step={1} 
				className="horizontal-slider"
				withTracks
				marks
				// markClassName="slider-marks"
				renderMark={(props) => {
					return <span {...props} className="slider-mark" style={{
						display: props.key === layerObj.timeRange.length - 1 || props.key === 0 ? 'none' : 'inline',
						// display: 'inline',
						left: (100 * (props.key) /(layerObj.timeRange.length - 1)).toString() + '%', position: 'absolute', height: '5px', width: '1px', background: 'black'
					}} />
				}}
				thumbActiveClassName="active"
				onChange={(val) => {
					let timeName = props.isSecond ? 'time2' : 'time';
					props.onUpdateState({
						[timeName]: layerObj.timeRange[val]
					})
				}}
				renderThumb={(props, state) => {
					return (
						<div {...props}>
							<Icon  name="clock" />
						</div>
					)
				}}
				trackClassName="track"
				thumbClassName="thumb"/>
				<label style={{marginLeft: 5, height: '40px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', color: '#fff', lineHeight: '40px'}}>
					{animationBtnsForward}				
				</label>
				<label className="time-marker" style={{marginLeft: 5, color: '#fff', lineHeight: '40px'}}>{maxTime}</label>
				</div>
		</div>
	)
}



export default Timeline;