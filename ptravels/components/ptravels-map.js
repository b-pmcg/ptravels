import React, {Component} from 'react';
import {
    Map,
    LayersControl,
    Marker,
    Popup,
    TileLayer,
    ZoomControl
} from 'react-leaflet';
import Control from 'react-leaflet-control';
import NameForm from './name-form';
import MarkerInfo from './marker-info';
import ClientApi from './client-api';
import Parser from 'html-react-parser';
//import { render } from 'react-dom';
const {BaseLayer, Overlay} = LayersControl;
const utilities = require('../utilities');
const api = new ClientApi();

export default class PtravelsMap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lat: 39.209425,
            lng: -76.86181599999999,
            zoom: 13,
            message: "Enter your name to see your first show.",
            showid: "showid inititials state",
            venueid: "",
            artist: "",
            markers: []
        }
        // this.getNameValueFromNameForm = this.getNameValueFromNameForm.bind(this) //do i need this?
    }

    getNameValueFromNameForm = async (nameValue) => {
        //await api.getCoordsForSingleShow(nameValue).then(data => {
        await api.getCoordsForAllShowsByUser(nameValue).then(data => {
            console.log(data);
            this.setState({markers: data});
            // api.getSetlistInfoForSingleShow(data.showid).then(response => {
            //     //console.log(response.response.data[0].artist)
            //         var parsed = Parser(response.response.data[0].setlistdata)
            //     this.setState({artist: parsed});
            // })
        });
    }

    render() {
        const position = [this.state.lat, this.state.lng]
        const center = [51.505, -0.09];
        const message = [this.state.artist];

        return (
            <Map center={position} zoom={this.state.zoom}>
                <TileLayer
                    url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    maxZoom={18}/>
                <Control position="topleft">
                    <NameForm callbackFromParent={this.getNameValueFromNameForm}/>
                </Control>
                {this.state.markers.map((position, idx) => 
                    <Marker key={`marker-${idx}`} position={position}>
                    <Popup>
                      <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
                    </Popup>
                  </Marker>
                  )}
            </Map>
        )
    }
}
