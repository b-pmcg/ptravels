/**Base component for map and data */
import React, {Component} from 'react';
import {Map, LayersControl, Marker, Popup, TileLayer, ZoomControl} from 'react-leaflet';
import Control from 'react-leaflet-control';
import NameForm from './name-form';
import PlayerContainer from './player-container';
import MarkerInfo from './marker-info';
import ClientApi from './client-api';
import Parser from 'html-react-parser';

const {BaseLayer, Overlay} = LayersControl;
const venueHack = require('./venue-location-hack');
const api = new ClientApi();

export default class PtravelsMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 41.7637,
            lng: -72.6851,
            zoom: 13,
            phishinShowInfo: [],
            markers: [],
            mp3Url: ""
        }
    }

    getMp3UrlFromSetlistComponent = (mp3Url) => {
        console.log(`MP3 URL IS: ${mp3Url}`);
        this.setState({mp3Url: mp3Url});
    }

    getNameValueFromNameForm = async (nameValue) => {
        let showdateArray = [];
        let phishinShowInfoArray = [];

        // Get a list of shows a user has been to and adds to show date array.
        var phishnetUserData = await api.getAllUserDataFromPhishnet(nameValue);
        for (var i = 0; i < phishnetUserData.length; i++) {
            // For now, only user artist 1 (Phish)
            if (phishnetUserData[i].artist == 1){
                showdateArray.push(phishnetUserData[i].showdate);
            }
        }
        
        let duplicateVenues = [];
        let push = true;
        // Gets show info for a single show and pushes entire object into array.
        for (var i = 0; i < showdateArray.length; i++) {
            try {
                let phishinShowApiResponse = await api.getInfoForSingleShowFromPhishin(showdateArray[i]);
                push = true;
                phishinShowInfoArray.some(x => {
                    if (x.venueid == phishinShowApiResponse.venueid) {
                        if (!x.shows.includes(phishinShowApiResponse.shows[0])){
                            x.shows.push(phishinShowApiResponse.shows[0])
                            push = false
                        }
                    }
                })
                if (push != false){
                    phishinShowInfoArray.push(phishinShowApiResponse);
                }
            } catch(err) {
                console.log(err);
            }   
        }

        // Sort each shows array by date
        phishinShowInfoArray.forEach(x => {
            return x.shows.sort((a, b) => {
                return a.date > b.date;
              });
        })
        this.setState({phishinShowInfo: phishinShowInfoArray});
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        const psi = this.state.phishinShowInfo;
        let key = 0;
        let markerPosition = [0,0];
        let showInfo = [];
        let venueArray = [];

        return (
            <Map center={position} zoom={this.state.zoom}>
                <TileLayer
                    url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    maxZoom={18}/>
                <Control position="topleft">
                    <NameForm callbackFromParent={this.getNameValueFromNameForm}/>
                </Control>
                <Control position="topright">
                    <PlayerContainer mp3Url={this.state.mp3Url}/>
                </Control>
                {psi.map((venueAndUserShows, ind) => {
                    // Temporary hack to fix lat/lngs that are null from the Phishin API response
                    if (venueAndUserShows.venue.latitude == null) {
                        venueHack.setMissingLocationData(venueAndUserShows);
                    }
                    key = ind
                    markerPosition = [venueAndUserShows.venue.latitude, venueAndUserShows.venue.longitude];
                        
                    return (<Marker key={ind + "-" + key} position={markerPosition}>
                        <Popup>
                            <MarkerInfo showinfo={venueAndUserShows} callback={this.getMp3UrlFromSetlistComponent}/>
                        </Popup>
                    </Marker>)
                })}
            </Map>
        )
    }
}
