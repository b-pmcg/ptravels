/**Base component for map and data */
import React, {Component} from 'react';
import {Map, LayersControl, Marker, Popup, TileLayer, ZoomControl} from 'react-leaflet';
import Control from 'react-leaflet-control';
import NameForm from './name-form';
import MarkerInfo from './marker-info';
import ClientApi from './client-api';
import Parser from 'html-react-parser';

const {BaseLayer, Overlay} = LayersControl;
const utilities = require('../utilities');
const api = new ClientApi();

export default class PtravelsMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lat: 41.7637,
            lng: -72.6851,
            zoom: 13,
            phishinShowInfo: [],
            markers: []
        }
    }

    getNameValueFromNameForm = async (nameValue) => {
        let showdateArray = [];
        let phishinShowInfoArray = [];

        // 1 call api, returns .latLng & .showid
        var phishnetUserData = await api.getAllUserDataFromPhishnet(nameValue);
        for (var i = 0; i < phishnetUserData.length; i++) {
            showdateArray.push(phishnetUserData[i].showdate) //push me
        }

        for (var i = 0; i < showdateArray.length; i++) {
            let phishinShowData = await api.getInfoForSingleShowFromPhishin(showdateArray[i]);
            phishinShowInfoArray.push(phishinShowData);
        }
        this.setState({phishinShowInfo: phishinShowInfoArray});
    }

    render() {
        // Assign the lat/lng to position
        const position = [this.state.lat, this.state.lng];
        const psi = this.state.phishinShowInfo;

        return (
            <Map center={position} zoom={this.state.zoom}>
                <TileLayer
                    url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    maxZoom={18}/>
                <Control position="topleft">
                    <NameForm callbackFromParent={this.getNameValueFromNameForm}/>
                </Control>
                {psi.map((infoSingleShow) =>
                    <Marker key={infoSingleShow.data.id} 
                        position={
                            [infoSingleShow.data.venue ? infoSingleShow.data.venue.latitude : 0, 
                            infoSingleShow.data.venue ? infoSingleShow.data.venue.longitude : 0]
                            }>
                        <Popup>
                            <MarkerInfo showid={infoSingleShow.data.venue.location || 0}/>
                        </Popup>
                    </Marker>
                  )}
            </Map>
        )
    }
}
