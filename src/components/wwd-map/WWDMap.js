import React from "react";
import { Button, Icon } from "semantic-ui-react";
import Wrapper from "../wrapper/Wrapper";
import "worldwindjs"; // WorldWind
import Globe from "./Globe";
import $map from "../../services/$map";
import URL from "urls";
import $data from "../../services/$data";

import axios from "axios";
import Datapanel from "../datapanel/Datapanel";
import pinIcon from "../../images/pin.png";
import tpIcon from "../../images/training_point.png";
import locationIcon from "../../images/location_pin.png";

const instance = axios.create();
instance.CancelToken = axios.CancelToken;
let querySource = instance.CancelToken.source();

class WWDMap extends React.Component {
  state = {
    webWorldWind: {},
    datapanel: false,
    geolocation: false,
    rdrw: false,
  };

  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState) {
    let self = this;

    if (
      this.state.webWorldWind.navigator.range < 100000 &&
      this.props.training_points
    ) {
      let trainingPointsLayer = this.state.webWorldWind.layers.find(
        (element) => element.displayName == "TrainingPoints"
      );
      if (trainingPointsLayer) {
        trainingPointsLayer.renderables = [];
      }
      var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
      placemarkAttributes.imageSource = tpIcon;
      placemarkAttributes.imageScale = 0.3;
      placemarkAttributes.imageColor = WorldWind.Color.WHITE;

      var ll,
        lr,
        ul,
        ur,
        llTerrainObject,
        lrTerrainObject,
        ulTerrainObject,
        urTerrainObject;
      ll = this.state.webWorldWind.canvasCoordinates(
        this.state.webWorldWind.viewport.x,
        this.state.webWorldWind.viewport.height
      );
      lr = this.state.webWorldWind.canvasCoordinates(
        this.state.webWorldWind.viewport.width,
        this.state.webWorldWind.viewport.height
      );
      ul = this.state.webWorldWind.canvasCoordinates(
        this.state.webWorldWind.viewport.x,
        this.state.webWorldWind.viewport.y
      );
      ur = this.state.webWorldWind.canvasCoordinates(
        this.state.webWorldWind.viewport.width,
        this.state.webWorldWind.viewport.y
      );

      llTerrainObject = this.state.webWorldWind.pickTerrain(ll).terrainObject();
      lrTerrainObject = this.state.webWorldWind.pickTerrain(lr).terrainObject();
      ulTerrainObject = this.state.webWorldWind.pickTerrain(ul).terrainObject();
      urTerrainObject = this.state.webWorldWind.pickTerrain(ur).terrainObject();

      if (!ulTerrainObject) {
        ulTerrainObject = {
          position: {
            latitude: llTerrainObject.position.latitude,
            longitude: llTerrainObject.position.longitude,
          },
        };
        ulTerrainObject.position.latitude += 1;
        ulTerrainObject.position.longitude -= 1;
      }

      if (!urTerrainObject) {
        urTerrainObject = {
          position: {
            latitude: lrTerrainObject.position.latitude,
            longitude: lrTerrainObject.position.longitude,
          },
        };
        urTerrainObject.position.latitude += 1;
        urTerrainObject.position.longitude += 1;
      }

      var minX = Math.min(
        llTerrainObject.position.longitude,
        lrTerrainObject.position.longitude,
        ulTerrainObject.position.longitude,
        urTerrainObject.position.longitude
      );
      var minY = Math.min(
        llTerrainObject.position.latitude,
        lrTerrainObject.position.latitude,
        ulTerrainObject.position.latitude,
        urTerrainObject.position.latitude
      );
      var maxX = Math.max(
        llTerrainObject.position.longitude,
        lrTerrainObject.position.longitude,
        ulTerrainObject.position.longitude,
        urTerrainObject.position.longitude
      );
      var maxY = Math.max(
        llTerrainObject.position.latitude,
        lrTerrainObject.position.latitude,
        ulTerrainObject.position.latitude,
        urTerrainObject.position.latitude
      );

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let cpResp = JSON.parse(this.responseText);
          cpResp.features.forEach((element) => {
            let placemark = new WorldWind.Placemark(
              new WorldWind.Location(
                element.geometry.coordinates[1],
                element.geometry.coordinates[0]
              ),
              false,
              null
            );
            placemark.altitudeMode = WorldWind.CLAMP_TO_GROUND;
            placemark.alwaysOnTop = true;
            placemark.attributes = placemarkAttributes;
            trainingPointsLayer.addRenderable(placemark);
          });
          self.state.webWorldWind.redraw();
        }
      };
      xhttp.open(
        "GET",
        URL.WFS4326 +
          "&typeName=gh:lcv_point_samples&" +
          `bbox=${minX},${minY},${maxX},${maxY}` +
          ",EPSG:4326",
        true
      );
      xhttp.send();
    } else {
      let trainingPointsLayer = this.state.webWorldWind.layers.find(
        (element) => element.displayName == "TrainingPoints"
      );
      if (trainingPointsLayer) {
        trainingPointsLayer.renderables = [];
      }
    }

    // if (prevProps.base != this.props.base) {
    //     if (this.props.base == 'OpenStreetMap') {
    //         this.state.webWorldWind.layers[0].enabled = false;
    //         this.state.webWorldWind.layers[1].enabled = true;
    //         this.state.webWorldWind.layers[2].enabled = false;
    //         this.state.webWorldWind.layers[3].enabled = false;
    //     } else {
    //         this.state.webWorldWind.layers[0].enabled = false;
    //         this.state.webWorldWind.layers[1].enabled = false;
    //         this.state.webWorldWind.layers[2].enabled = false;
    //         this.state.webWorldWind.layers[3].enabled = true;
    //     }
    // }

    // // this.state.webWorldWind.layers.map(layer => {
    // //     console.log(layer.urlBuilder.serviceAddress)
    // // });

    // if(prevProps.layer != this.props.layer) {
    //     this.state.webWorldWind.layers.map((layer,i) => {

    //         if(layer.urlBuilder) {

    //             if([0,1,2,3].indexOf(i) === -1) {
    //                 console.log(layer.displayName)
    //                 layer.enabled = false
    //             }
    //         }

    //         if(layer.displayName === this.props.layer) {
    //             console.log(layer.displayName, this.props.layer)
    //             layer.enabled = true;
    //         }
    //     });

    //     this.state.webWorldWind.layers.map(layer => {
    //         // console.log(layer.displayName, layer.enabled)
    //     })

    // }

    for (let i = 0; i < this.state.webWorldWind.layers.length; i++) {
      if (prevProps.base != this.props.base) {
        if (this.props.base == "OpenStreetMap") {
          this.state.webWorldWind.layers[0].enabled = false;
          this.state.webWorldWind.layers[1].enabled = true;
          this.state.webWorldWind.layers[2].enabled = false;
          this.state.webWorldWind.layers[3].enabled = false;
        } else {
          this.state.webWorldWind.layers[0].enabled = false;
          this.state.webWorldWind.layers[1].enabled = false;
          this.state.webWorldWind.layers[2].enabled = false;
          this.state.webWorldWind.layers[3].enabled = true;
        }
      } else {
        if (this.state.webWorldWind.layers[i].displayName == this.props.layer) {
          // console.log(this.state.webWorldWind.urlBuilder)
          if (
            this.state.webWorldWind.layers[i].urlBuilder.timeString ==
            this.props.time
          ) {
            this.state.webWorldWind.layers[i].enabled = true;
            this.state.webWorldWind.layers[i].opacity =
              this.props.opacity / 100;
          } else {
            this.state.webWorldWind.layers[i] = new WorldWind.WmsLayer(
              {
                version:
                  this.state.webWorldWind.layers[i].urlBuilder.wmsVersion,
                title: this.state.webWorldWind.layers[i].displayName,
                size: this.state.webWorldWind.layers[i].levels.tileWidth,
                service:
                  this.state.webWorldWind.layers[i].urlBuilder.serviceAddress,
                sector: this.state.webWorldWind.layers[i].levels.sector,
                numLevels: this.state.webWorldWind.layers[i].levels.numLevels,
                levelZeroDelta:
                  this.state.webWorldWind.layers[i].levels.levelZeroDelta,
                layerNames:
                  this.state.webWorldWind.layers[i].urlBuilder.layerNames,
                format: this.state.webWorldWind.layers[i].retrievalImageFormat,
                coordinateSystem:
                  this.state.webWorldWind.layers[i].urlBuilder.crs,
              },
              this.props.time
            );
            this.state.webWorldWind.layers[i].enabled = false;
            this.state.webWorldWind.layers[i].opacity =
              this.props.opacity / 100;
          }
        } else if (this.state.webWorldWind.layers[i].urlBuilder) {
          // console.log(URL.WMS);
          // console.log(this.state.webWorldWind.layers[i].urlBuilder.serviceAddress);
          // console.log('===================================');
          let serviceAddress =
            this.state.webWorldWind.layers[i].urlBuilder.serviceAddress;

          if (
            serviceAddress.indexOf(URL.WMS) > -1 ||
            serviceAddress.indexOf(URL.WMS.replace("wms/", "ows")) > -1
          ) {
            this.state.webWorldWind.layers[i].enabled = false;
          }
        }
      }
    }

    if (prevState.geolocation !== this.state.geolocation) {
      if (this.state.geolocation) {
        let geolocationLayer = this.state.webWorldWind.layers.find(
          (element) => element.displayName == "Geolocation"
        );
        if (geolocationLayer) {
          geolocationLayer.renderables = [];
        }
        navigator.geolocation.getCurrentPosition(
          (position) => {
            var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
            placemarkAttributes.imageSource = locationIcon;
            placemarkAttributes.imageScale = 0.2;
            let placemark = new WorldWind.Placemark(
              new WorldWind.Location(
                position.coords.latitude,
                position.coords.longitude
              ),
              false,
              null
            );
            placemark.altitudeMode = WorldWind.CLAMP_TO_GROUND;
            placemark.alwaysOnTop = true;
            placemark.attributes = placemarkAttributes;
            geolocationLayer.addRenderable(placemark);
            this.state.webWorldWind.goTo(
              new WorldWind.Position(
                position.coords.latitude,
                position.coords.longitude,
                15000
              )
            );
          },
          (error) => console.log(error),
          { maximumAge: 60000, timeout: 60000, enableHighAccuracy: true }
        );
      } else {
        let geolocationLayer = this.state.webWorldWind.layers.find(
          (element) => element.displayName == "Geolocation"
        );
        if (geolocationLayer) {
          geolocationLayer.renderables = [];
        }
      }
    }

    if (this.props.pinCoordinates) {
      this.props.onUpdateState({ pinCoordinates: null });
      let pinCoordinatesLayer = this.state.webWorldWind.layers.find(
        (element) => element.displayName == "Pin"
      );
      if (pinCoordinatesLayer) {
        pinCoordinatesLayer.renderables = [];
      }
      var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
      placemarkAttributes.imageSource = pinIcon;
      placemarkAttributes.imageScale = 0.02;
      let placemark = new WorldWind.Placemark(
        new WorldWind.Location(
          this.props.pinCoordinates[1],
          this.props.pinCoordinates[0]
        ),
        false,
        null
      );
      placemark.altitudeMode = WorldWind.CLAMP_TO_GROUND;
      placemark.alwaysOnTop = true;
      placemark.attributes = placemarkAttributes;
      pinCoordinatesLayer.addRenderable(placemark);
      this.state.webWorldWind.goTo(
        new WorldWind.Position(
          this.props.pinCoordinates[1],
          this.props.pinCoordinates[0],
          this.state.webWorldWind.navigator.range
        )
      );
      this.query(
        {
          latitude: this.props.pinCoordinates[1],
          longitude: this.props.pinCoordinates[0],
        },
        this.props.layer
      );
    }
    this.state.webWorldWind.redraw();

    if (prevProps.time !== this.props.time) {
      let lyr = this.state.webWorldWind.layers.filter(
        (l) => l.displayName === this.props.layer
      )[0];

      lyr = new WorldWind.WmsLayer(
        {
          version: lyr.urlBuilder.wmsVersion,
          title: lyr.displayName,
          size: lyr.levels.tileWidth,
          service: lyr.urlBuilder.serviceAddress,
          sector: lyr.levels.sector,
          numLevels: lyr.levels.numLevels,
          levelZeroDelta: lyr.levels.levelZeroDelta,
          layerNames: lyr.urlBuilder.layerNames,
          format: lyr.retrievalImageFormat,
          coordinateSystem: lyr.urlBuilder.crs,
        },
        this.props.time
      );

      this.setState({ rdrw: !this.state.rdrw });
    }
  }

  handleClick(recognizer) {
    let self = this;
    // Obtain the event location.
    let x = recognizer.clientX,
      y = recognizer.clientY;

    let cc = self.state.webWorldWind.canvasCoordinates(x, y);
    let terrainObject = self.state.webWorldWind.pickTerrain(cc).terrainObject();
    if (terrainObject) {
      this.query(terrainObject.position, self.props.layer);

      let pinLayer = this.state.webWorldWind.layers.find(
        (element) => element.displayName == "Pin"
      );
      if (pinLayer) {
        pinLayer.renderables = [];
      }
      var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
      placemarkAttributes.imageSource = pinIcon;
      placemarkAttributes.imageScale = 0.02;
      let placemark = new WorldWind.Placemark(
        new WorldWind.Location(
          terrainObject.position.latitude,
          terrainObject.position.longitude
        ),
        false,
        null
      );
      placemark.altitudeMode = WorldWind.CLAMP_TO_GROUND;
      placemark.alwaysOnTop = true;
      placemark.attributes = placemarkAttributes;
      pinLayer.addRenderable(placemark);
      self.state.webWorldWind.redraw();
    }
  }

  componentDidMount() {
    let self = this;

    this.basemaps = $map.createBasemaps(
      this.props.base,
      this.props.time,
      this.props.layer.indexOf("NDVI") > -1
    );
    this.layers = $map.createTilelayers(
      this.props.layers,
      false,
      this.props.layer,
      this.props.opacity,
      this.props.time
    );

    this.uncertainty = $map.createUncertaintyLayers(
      this.props.layers,
      this.props.opacity,
      this.props.time
    );

    let serviceAddress =
      this.layers[0].getSource().urls[0] +
      "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities";

    axios
      .get(serviceAddress)
      .then((response) => {
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(response.data, "text/xml");

        this.layers.forEach((element) => {
          let layerName = element.getSource().getParams().LAYERS;
          // Create a WmsCapabilities object from the XML DOM
          var wms = new WorldWind.WmsCapabilities(xmlDoc);
          // Retrieve a WmsLayerCapabilities object by the desired layer name
          var wmsLayerCapabilities = wms.getNamedLayer(layerName);
          // Form a configuration object from the WmsLayerCapability object
          var wmsConfig = null;
          try {
            wmsConfig =
              WorldWind.WmsLayer.formLayerConfiguration(wmsLayerCapabilities);
          } catch {
            console.log("Malformatted capabilities file.");
          }

          if (wmsConfig) {
            // Modify the configuration objects title property to a more user friendly title
            wmsConfig.title = element.get("name");
            // Create the WMS Layer from the configuration object
            var wmsLayer = new WorldWind.WmsLayer(wmsConfig, self.props.time);

            wmsLayer.opacity = self.props.opacity / 100;
            wmsLayer.enabled = element.getVisible();

            // Add the layers to WorldWind and update the layer manager
            self.state.webWorldWind.addLayer(wmsLayer);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });

    // this.layers.forEach(element => {
    //     // let serviceAddress = element.getSource().urls[0] + '?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities';
    //     let layerName = element.getSource().getParams().LAYERS;

    //     var createLayer = function (xmlDom) {
    //         // Create a WmsCapabilities object from the XML DOM
    //         var wms = new WorldWind.WmsCapabilities(xmlDom);
    //         // Retrieve a WmsLayerCapabilities object by the desired layer name
    //         var wmsLayerCapabilities = wms.getNamedLayer(layerName);
    //         // Form a configuration object from the WmsLayerCapability object
    //         var wmsConfig = WorldWind.WmsLayer.formLayerConfiguration(wmsLayerCapabilities);
    //         // Modify the configuration objects title property to a more user friendly title
    //         wmsConfig.title = element.get('name');
    //         // Create the WMS Layer from the configuration object
    //         var wmsLayer = new WorldWind.WmsLayer(wmsConfig, self.props.time);

    //         wmsLayer.opacity = self.props.opacity / 100;
    //         wmsLayer.enabled = element.getVisible();

    //         // Add the layers to WorldWind and update the layer manager
    //         self.state.webWorldWind.addLayer(wmsLayer);
    //     };

    // var xhr = new XMLHttpRequest();
    // xhr.open("GET", serviceAddress);
    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState === XMLHttpRequest.DONE) {
    //         if (xhr.status === 200) {
    //             createLayer(xhr.responseXML);
    //         }
    //     }
    // };
    // xhr.send();
    // });

    let trainingPointsLayer = new WorldWind.RenderableLayer("TrainingPoints");
    self.state.webWorldWind.addLayer(trainingPointsLayer);

    let pinLayer = new WorldWind.RenderableLayer("Pin");
    self.state.webWorldWind.addLayer(pinLayer);

    let geolocationLayer = new WorldWind.RenderableLayer("Geolocation");
    self.state.webWorldWind.addLayer(geolocationLayer);

    // Listen for mouse clicks.
    let clickRecognizer = new WorldWind.ClickRecognizer(
      self.state.webWorldWind,
      self.handleClick.bind(this)
    );

    // Listen for taps on mobile devices.
    let tapRecognizer = new WorldWind.TapRecognizer(
      self.state.webWorldWind,
      self.handleClick.bind(this)
    );
  }

  query(position, layerName) {
    querySource.cancel("cancel");
    querySource = instance.CancelToken.source();

    let layerObj = this.props.layers.filter((l) => l.name === layerName)[0];
    let filter = `?lon=${position.longitude}&lat=${
      position.latitude
    }&property=${
      this.props.uncertainty
        ? $data.formatForUncertainty(layerObj.query_name)
        : layerObj.query_name
    }`;

    if (layerObj.filter) {
      filter += layerObj.filter;
    }

    if (layerObj.timeScale === "day") {
      filter += `&time=${this.props.time.split("-")[0]}`;
    }

    this.setState({
      datapanel: true,
      pointDataLoading: true,
      pointDataError: false,
      toUpdatePointData: true,
    });

    axios
      .all([
        $data.query(filter, querySource.token),
        $data.getSld(
          this.props.uncertainty
            ? $data.formatForUncertainty(layerObj.sld)
            : layerObj.sld,
          querySource.token
        ),
      ])
      .then(
        axios.spread((query, sld) => {
          this.setState({
            colors: sld.reverse(),
            pointDataLoading: false,
            pointData: query,
            toUpdatePointData: true,
          });
        })
      )
      .catch((err) => {
        if (err.status !== -998) {
          this.setState({
            colors: null,
            pointDataLoading: false,
            pointData: null,
            pointDataError: true,
            toUpdatePointData: true,
          });
        }
      });
  }

  mapCreated(webWorldWind) {
    let self = this;
    webWorldWind.addLayer(new WorldWind.AtmosphereLayer());
    // webWorldWind.addLayer(new WorldWind.CompassLayer());
    webWorldWind.addLayer(new WorldWind.CoordinatesDisplayLayer(webWorldWind));
    // webWorldWind.addLayer(new WorldWind.ViewControlsLayer(webWorldWind));

    webWorldWind.goTo(
      new WorldWind.Position(
        self.props.center[1],
        self.props.center[0],
        self.props.eye
      )
    );

    this.state.webWorldWind = webWorldWind;

    webWorldWind.addEventListener("mouseup", function (event) {
      self.props.onUpdateState({
        // zoom: self.getZoomFromEyeDistance(webWorldWind.navigator.range / 1000.0),
        eye: webWorldWind.navigator.range,
        center: [
          webWorldWind.navigator.lookAtLocation.longitude,
          webWorldWind.navigator.lookAtLocation.latitude,
        ],
      });
    });

    webWorldWind.addEventListener("touchend", function (event) {
      self.props.onUpdateState({
        // zoom: self.getZoomFromEyeDistance(webWorldWind.navigator.range / 1000.0),
        eye: webWorldWind.navigator.range,
        center: [
          webWorldWind.navigator.lookAtLocation.longitude,
          webWorldWind.navigator.lookAtLocation.latitude,
        ],
      });
    });

    webWorldWind.addEventListener("wheel", function (event) {
      setTimeout(() => {
        self.props.onUpdateState({
          // zoom: self.getZoomFromEyeDistance(webWorldWind.navigator.range / 1000.0),
          eye: webWorldWind.navigator.range,
          center: [
            webWorldWind.navigator.lookAtLocation.longitude,
            webWorldWind.navigator.lookAtLocation.latitude,
          ],
        });
      }, 100);
    });
  }

  getZoomFromEyeDistance(x) {
    return (
      3.757719396384 * Math.pow(10, -8) * x * x - 0.000876027 * x + 8.89705
    );
  }

  getEyeDistanceFromZoom(x) {
    return (335.615 * x * x - 6178.22 * x + 28789.5) * 1000;
  }

  clearPin() {
    let pinLayer = this.state.webWorldWind.layers.find(
      (element) => element.displayName == "Pin"
    );
    if (pinLayer) {
      pinLayer.renderables = [];
    }
    this.state.webWorldWind.redraw();
  }

  renderSelectedLayer = (layerName) => {
    let layer = this.props.layers.filter((l) => l.name === layerName)[0];
    if (!layer) {
      return null;
    }
    let seasons = {
      "03": "Spring",
      "06": "Summer",
      "09": "Autumn",
      12: "Winter",
    };

    let wasabi_link = layer.wasabi_link || "";
    let timeLabel = null;

    if (
      layer.timeScale === "year" ||
      layer.timeScale === "season" ||
      layer.timeScale === "season-3"
    ) {
      timeLabel =
        layer.timeScale === "year"
          ? this.props.time
          : this.props.time.slice(0, 4) +
            " - " +
            seasons[this.props.time.slice(4, 6)];
      wasabi_link = wasabi_link.replace("_*_", `_${this.props.time}_`);
    }

    if (layer.timeScale === "month") {
      timeLabel =
        layer.timeScale === "year"
          ? this.props.time
          : this.props.time.slice(0, 4) +
            " - " +
            moment(this.props.time.slice(4, 6)).format("MMMM");
      wasabi_link = wasabi_link.replace("_*_", `_${this.props.time}_`);
    }
    return (
      <div className="selected-layer-container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <p className="layer-title">{layer.title}</p>
          {/* <div className="compare-btn" onClick={() => { this.props.onUpdateState({ comparison: true }) }} style={{ display: window.innerWidth < 768 ? 'none' : 'flex', cursor: 'pointer' }}>
						<Icon name="columns" style={{ color: "#fff" }} />
						<label style={{ fontSize: '11px', fontWeight: 'bold', color: '#fff', cursor: 'pointer' }}>COMPARE</label>
					</div> */}
        </div>
        <p title={layer.description} className="layer-description">
          {layer.description.split(" ").length > 14
            ? layer.description
                .split(" ")
                .filter((e, i) => i <= 14)
                .join(" ") + "..."
            : layer.description}
        </p>
        <p className="layer-links">
          <a
            style={{ marginTop: 5, display: "inline-block" }}
            href={layer.gn_url || "https://data.opendatascience.eu/geonetwork/"}
            target="_blank"
          >
            <Button className="btn-link">
              <Icon name="info circle" />
              Metadata
            </Button>
          </a>
          <a
            style={{ marginTop: 5, display: "inline-block" }}
            href={wasabi_link}
            target="_blank"
          >
            <Button className="btn-link">
              <Icon name="download" />
              Download {timeLabel}
            </Button>
          </a>

          {/* &nbsp;|&nbsp;  */}
          {/* <a href={layer.layer_download_url} target="_blank">Download dataset</a> */}
        </p>
      </div>
    );
  };

  render() {
    return (
      <Wrapper>
        <div className={`wwd-map ${this.props.className}`}>
          {!this.props.comparison && this.renderSelectedLayer(this.props.layer)}

          <div
            className={
              "map-tool-buttons" + (this.props.comparison ? " comparison" : "")
            }
          >
            <Button
              onClick={() => {
                window.location.assign("https://maps.opendatascience.eu/");
              }}
              icon="home"
            ></Button>
            <Button
              onClick={() => {
                this.state.webWorldWind.goTo(
                  new WorldWind.Position(52, 15, 5000000)
                );
              }}
              icon="compass"
            ></Button>
            <Button
              onClick={() => {
                this.state.webWorldWind.navigator.range *= 1 - 0.04;
                this.state.webWorldWind.redraw();
              }}
              icon="plus"
            ></Button>
            <Button
              onClick={() => {
                this.state.webWorldWind.navigator.range *= 1 + 0.04;
                this.state.webWorldWind.redraw();
              }}
              icon="minus"
            ></Button>
            <Button
              onClick={() =>
                this.setState({ geolocation: !this.state.geolocation })
              }
              className={this.state.geolocation ? "active-geolocation" : ""}
              icon="location arrow"
            ></Button>
            {this.props._3d ? (
              <Button
                onClick={() => {
                  this.props.onUpdateState({ _3d: false, wwd_3d: false });
                }}
                className="three-d-icon"
              >
                2D
              </Button>
            ) : (
              <Button
                onClick={() => {
                  this.props.onUpdateState({ _3d: true, _wwd_3d: false });
                }}
                className="three-d-icon"
              >
                <img
                  width="20"
                  style={{ color: "#fff" }}
                  src="/assets/cesium.svg"
                />
              </Button>
            )}

            {this.props._wwd_3d ? (
              <Button
                onClick={() => {
                  this.props.onUpdateState({ _3d: false, _wwd_3d: false });
                }}
                className="three-d-icon"
              >
                2D
              </Button>
            ) : (
              <Button
                onClick={() => {
                  this.props.onUpdateState({ _3d: false, _wwd_3d: true });
                }}
                className="three-d-icon"
              >
                <img
                  width="30"
                  style={{ color: "#fff" }}
                  src="/assets/wwd.svg"
                />
              </Button>
            )}
          </div>
          <Globe onMapCreated={this.mapCreated.bind(this)} />
          <Datapanel
            sidebar={this.props.sidebar}
            visible={this.state.datapanel}
            colors={this.state.colors}
            layer={this.props.layer}
            layers={this.props.layers}
            loading={this.state.pointDataLoading}
            data={this.state.pointData}
            error={this.state.pointDataError}
            close={() => {
              this.setState({ datapanel: false, pointData: null });
              this.clearPin();
            }}
            preventUpdate={() => {
              this.setState({ toUpdatePointData: false });
            }}
          />
        </div>
      </Wrapper>
    );
  }
}

export default WWDMap;
