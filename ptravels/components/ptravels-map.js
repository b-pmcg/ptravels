import React, { Component } from 'react';
import { Map, LayersControl, Marker, Popup, TileLayer, ZoomControl} from 'react-leaflet';
import Control from 'react-leaflet-control';
import NameForm from './name-form';
import MarkerInfo from './marker-info';
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
          message: "Enter your name to see your first show."
        };
      }

    getNameValue = (nameValue) => {
        let self = this; // <-- How to avoid?
        fetch(`/usershows/${nameValue}`)
          .then(response => {  
          if (response.status !== 200) {  
              console.log('Looks like there was a problem. Status Code: ' + response.status);  
              return;  
          }
          response.json().then(data => {  
              console.log(data); 
              self.setState({lat: data.lat, lng: data.lng, message: nameValue});
          })  
          })
          .then( () => {
            //now fetch all venues
          })
          .catch(err => console.log('Fetch Error :-S', err)) //is this error handling implemented correctly?
    }
  
    render() {
        const position = [this.state.lat, this.state.lng]
        const center = [51.505, -0.09];
        const rectangle = [[51.49, -0.08], [51.5, -0.06]];
        const message = [this.state.message];

    return (
      <Map center={position} zoom={this.state.zoom}>
      {/* <ZoomControl position="topright" /> */}
      <TileLayer
        url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        maxZoom={18}/>
      
      <Control position="topleft" >
        <NameForm callbackFromParent={this.getNameValue}/>
      </Control>
      <Marker position={position}>
          <Popup>
            <MarkerInfo message={message}/>
          </Popup>
        </Marker>
    </Map>
    )
  }
}
