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
            showids: [],
            venueid: "",
            showinfo: [],
            markers: []
        }
        // this.getNameValueFromNameForm = this.getNameValueFromNameForm.bind(this) //do i need this?
    }
    /**ARRAY IS WORKING
     * Time how long it takes, any way to speed it up?
     * Add show info to markers popup
     * Add phishtracks/phish.in to popup
     * DEPLOY!
     */
    getNameValueFromNameForm = async (nameValue) => {
        //await api.getCoordsForSingleShow(nameValue).then(data => {
            var showstuff = [];
        await api.getCoordsForAllShowsByUser(nameValue).then(data => {
            console.log(data);
            this.setState({markers: data.markers});
            console.log(data.showid)
            data.showid.map(showidstring => {
                api.getSetlistInfoForSingleShow(showidstring).then(response => {
                    console.log(typeof response.response.data);
                    console.log(response.response.data); // this is an object
                    var parsed = Parser(response.response.data["0"].setlistdata)
                    console.log("Parsed:")
                    console.log(parsed);
                    showstuff.push(parsed);
                    console.log("showstuff:")
                    console.log(showstuff[0] instanceof Array) //is an array
                })
            })
                
            this.setState({showinfo: showstuff});
            
        });
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        const center = [51.505, -0.09];
        //const message = ["messag1", "message2"];
        const message = this.state.showinfo;

        return (
            <Map center={position} zoom={this.state.zoom}>
                <TileLayer
                    url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    maxZoom={18}/>
                <Control position="topleft">
                    <NameForm callbackFromParent={this.getNameValueFromNameForm}/>
                </Control>
                {this.state.markers.map((position, i) => 
                    <Marker key={"mykey" + i} position={position}>
                        <Popup>
                            <MarkerInfo index={i} message={message}/>
                        </Popup>
                  </Marker>
                  )}
            </Map>
        )
    }
}
