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
          name: ''
        };
      }

    getNameValue = (nameValue) => {
      console.log("I got the name! " + nameValue);
      /*Should this be its own function?*/
      let self = this;
      fetch(`/usershows/${nameValue}`)  
      .then(  
        function(response) {  
        if (response.status !== 200) {  
          console.log('Looks like there was a problem. Status Code: ' +  
          response.status);  
          return;  
        }
        // Examine the text in the response  
        response.json().then(function(data) {  
          //var mostRecentShow = data.pop;
          console.log(data); 
          console.log("someeee")
          //self.setState({something: [JSON.stringify(data)]});
          self.setState({lat: data.lat, lng: data.lng});
        });  
        }  
      )  
      .catch(function(err) {  
        console.log('Fetch Error :-S', err);  
      });
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
        <NameForm callbackFromParent={this.getNameValue}/>
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
