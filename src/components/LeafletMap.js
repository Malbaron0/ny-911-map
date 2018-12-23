import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

class LeafletMap extends Component {

  state = {
    lat: 40.650002,
    lng: -73.949997,
    zoom: 13,
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
    const position = [this.state.lat, this.state.lng]
    this.fixLeafletMarker();

   console.log(this.props.selectedCategoryValues);
    return (
      <Map className="map" center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
        </Marker>
        <Marker position={[41.650002, -73.949997]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
        </Marker>
      </Map>
    )
  }
}

export default LeafletMap;