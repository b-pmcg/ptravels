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
        const position = [this.state.lat, this.state.lng];
        const psi = this.state.phishinShowInfo;
        let key = 0;
        let markerPosition = [0,0];
        let showInfo = 0;

        return (
            <Map center={position} zoom={this.state.zoom}>
                <TileLayer
                    url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    maxZoom={18}/>
                <Control position="topleft">
                    <NameForm callbackFromParent={this.getNameValueFromNameForm}/>
                </Control>
                {psi.map((infoSingleShow, i) => {
                    if (infoSingleShow.data !== undefined && infoSingleShow.data.venue !== null && infoSingleShow.success) {
                        key = infoSingleShow.data.id;
                        markerPosition = [infoSingleShow.data.venue.latitude, infoSingleShow.data.venue.longitude];
                        showInfo = infoSingleShow.data;
                    }
                    return (<Marker key={i + "-" + key} position={markerPosition}>
                        <Popup>
                            <MarkerInfo showinfo={showInfo}/>
                        </Popup>
                    </Marker>)
                })}
            </Map>
        )
    }
}
