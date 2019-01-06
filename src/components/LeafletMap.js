import React, { Component } from 'react';
import Markers from './Markers';
import { Map, TileLayer} from 'react-leaflet';
import L from 'leaflet';

class LeafletMap extends Component {

  //longitude and latitude of new york
  defaultPosition = {
    lat: 40.730610,
    lng: -73.935242,
    zoom: 10,
  }

  /*Issues with using icons in react-leaflt. 
    Changing the path of icons in the leaflet library to appropriate path (According to the github issue)
  https://github.com/PaulLeCam/react-leaflet/issues/453#issuecomment-410450387
  */
  fixLeafletMarker = () => {
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    });
  }

  render() {
    const position = [this.defaultPosition.lat, this.defaultPosition.lng]
    this.fixLeafletMarker();

    return (
      <Map className="map" center={position} zoom={this.defaultPosition.zoom}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        />
        <Markers data = {this.props.data} selectedCategoryValues = {this.props.selectedCategoryValues}></Markers>
      </Map>
    )
  }
}

export default LeafletMap;