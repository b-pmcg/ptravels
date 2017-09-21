import React, { Component } from 'react';
import { Map, LayersControl, Marker, Popup, TileLayer, ZoomControl} from 'react-leaflet';
import Control from 'react-leaflet-control';
import NameForm from './single-input';
const { BaseLayer, Overlay } = LayersControl;

/*This is a container component that combines the
Map component and single-input.js and is imported in app.js*/

export default class PtravelsMap extends Component {
    constructor(){
        super();
        this.state = {
          lat: 39.209425,
          lng: -76.86181599999999,
          zoom: 13,
        };
      }

    getCoordsForShow = (coords) => {
      console.log("I got the coords! " + coords);
    }
  
    render() {
        const position = [this.state.lat, this.state.lng]
        const center = [51.505, -0.09];
        const rectangle = [[51.49, -0.08], [51.5, -0.06]];

    return (
      <Map center={position} zoom={this.state.zoom}>
      {/* <ZoomControl position="topright" /> */}
      <TileLayer
        url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        maxZoom={18}/>
      
      <Control position="topleft" >
        <NameForm callbackFromParent={this.getCoordsForShow}/>
      </Control>
      <Marker position={position}>
          <Popup>
            <span>
              A pretty CSS3 popup. <br /> Easily customizable.
            </span>
          </Popup>
        </Marker>
    </Map>
    )
  }
}
