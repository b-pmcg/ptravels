import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
const Router = require('router');

/*This is not the currently used API fetch method.
This component fetches data from the Node API Server.js*/

export default class ContainerTest extends Component {
  constructor() {
    super();
    this.state = { something: [] };
  }
  componentDidMount() {
    let self = this;
    fetch('/usershows/destiny_unhinged')  
    .then(  
      function(response) {  
        if (response.status !== 200) {  
          console.log('Looks like there was a problem. Status Code: ' +  
            response.status);  
          return;  
        }
        // Examine the text in the response  
        response.json().then(function(data) {  
          console.log(typeof JSON.stringify(data));  
          self.setState({something: [JSON.stringify(data)]});
        });  
      }  
    )  
    .catch(function(err) {  
      console.log('Fetch Error :-S', err);  
    });
  }
  render() {
    return (
      <ul>
        {this.state.something}
      </ul>
    );
  }
}
