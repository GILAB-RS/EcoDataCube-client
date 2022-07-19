import React, { Component } from 'react';
import 'worldwindjs'; // WorldWind
import WorldWindFixes from './api/WorldWindFixes';
import EoxOpenStreetMapLayer from './api/EoxOpenStreetMapLayer';
import EoxSentinel2CloudlessLayer from './api/EoxSentinel2CloudlessLayer';
import EoxSentinel2WithLabelsLayer from './api/EoxSentinel2WithLabelsLayer';

/**
 * This component displays Web World Wind in the application. In order to decide what will the map look like and what
 * should be displayed on top of that it is possible to work with the wwd inside of the componentDidMount, where the
 * Web World Wind instance is also created.
 *
 * The props can contain function onMapCreated. This method is called when Web World Wind instance is created and receive
 * the instance of Web World Wind as the only parameter. It is called only once.
 */
class Globe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wwdCreated: false
        };

        // Apply post-release fixes to the WorldWind library before creating a WorldWindow
        WorldWindFixes.applyLibraryFixes();
    }

    /**
     * In this method we create the Web World Wind component itself and store it in the state for the later usage.
     */
    componentDidMount() {
        if (!this.state.wwd) {
            let wwd = new WorldWind.WorldWindow("wwd-results");

            // Apply post-release fixes to the WorldWindow
            WorldWindFixes.applyWorldWindowFixes(wwd);

            this.setState({ wwd: wwd });

            wwd.addLayer(new WorldWind.BMNGLayer());
            wwd.addLayer(new EoxOpenStreetMapLayer());
            wwd.addLayer(new EoxSentinel2CloudlessLayer);
            wwd.addLayer(new EoxSentinel2WithLabelsLayer);
            wwd.redraw();

            if (this.props.onMapCreated && typeof this.props.onMapCreated === "function") {
                this.props.onMapCreated(wwd);
            }
        }
    }

    render() {
        return (
            <div id="map">
                <canvas id="wwd-results"></canvas>
            </div>
        )
    }
}

export default Globe;
