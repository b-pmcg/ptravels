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
const {BaseLayer, Overlay} = LayersControl;
const utilities = require('../utilities');
const Api = new ClientApi();

export default class PtravelsMap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lat: 39.209425,
            lng: -76.86181599999999,
            zoom: 13,
            message: "Enter your name to see your first show.",
        }
        this.getNameValue = this.getNameValue.bind(this) //do i need this?
    }

    getNameValue = async (nameValue) => {
        /* Calls client api here */
        await Api.getCoordsFirstShow(nameValue).then(data => {
            this.setState({lat: data.lat, lng: data.lng, message:nameValue});
        })
    }

    render() {
        const position = [this.state.lat, this.state.lng]
        const center = [51.505, -0.09];
        const message = [this.state.message];

        return (
            <Map center={position} zoom={this.state.zoom}>
                <TileLayer
                    url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    maxZoom={18}/>
                <Control position="topleft">
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
