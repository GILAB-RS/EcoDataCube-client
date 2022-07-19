import { faLayerGroup, faMap, faBookmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, ButtonGroup } from 'semantic-ui-react';

const Toolbar = (props) => {
	return (
		<div className={"toolbar-container" + (props.sidebar ? ' opened' : '')}>
			<ButtonGroup vertical>
				<Button className={props.panel === 'basemaps' ? ' active' : ''} onClick={() => props.onUpdateState({sidebar: props.panel === 'basemaps' && props.sidebar ? false : true, panel: props.panel !== 'basemaps' ? 'basemaps' : null})} icon={<FontAwesomeIcon icon={faMap} className="fa-white"/>}></Button>
				<Button className={props.panel === 'layers' ? ' active' : ''} onClick={() => props.onUpdateState({sidebar: props.panel === 'layers'  && props.sidebar ? false : true, panel: props.panel !== 'layers' ? 'layers' : null})} icon={<FontAwesomeIcon icon={faLayerGroup} className="fa-white"/>}></Button>
				<Button className={props.panel === 'gitlab' ? ' active' : ''} onClick={() => props.onUpdateState({sidebar: props.panel === 'gitlab'  && props.sidebar ? false : true, panel: props.panel !== 'gitlab' ? 'gitlab' : null})} icon="gitlab"></Button>
				<Button className={props.panel === 'twitter' ? ' active' : ''} onClick={() => props.onUpdateState({sidebar: props.panel === 'twitter' && props.sidebar ? false : true, panel: props.panel !== 'twitter' ? 'twitter' : null})} icon="twitter"></Button>
				<Button className={props.panel === 'share' ? ' active' : ''} onClick={() => props.onUpdateState({sidebar: props.panel === 'share' && props.sidebar ? false : true, panel: props.panel !== 'share' ? 'share' : null})} icon="share alternate"></Button>
				<Button className={props.panel === 'bookmark' ? ' active' : ''} onClick={() => props.onUpdateState({sidebar: props.panel === 'bookmark' && props.sidebar ? false : true, panel: props.panel !== 'bookmark' ? 'bookmark' : null})} icon={<FontAwesomeIcon icon={faBookmark} className="fa-white"/>}></Button>
				<Button className={props.panel === 'help' ? ' active' : ''} onClick={() => props.onUpdateState({sidebar: props.panel === 'help' && props.sidebar ? false : true, panel: props.panel !== 'help' ? 'help' : null})} icon="help"></Button>
			</ButtonGroup>
		</div>
	)
}

export default Toolbar;