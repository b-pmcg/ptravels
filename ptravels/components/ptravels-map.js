/**Base component for map and data */
import React, {Component} from 'react';
import {Map, LayersControl, Marker, Popup, TileLayer, ZoomControl} from 'react-leaflet';
import Control from 'react-leaflet-control';
import NameForm from './name-form';
import PlayerContainer from './player-container';
import MarkerInfo from './marker-info';
import ClientApi from './client-api';

const {BaseLayer, Overlay} = LayersControl;
const venueHack = require('./venue-location-hack');
const api = new ClientApi();

export default class PtravelsMap extends Component {
    constructor() {
        super();
        this.state = {
            lat: 28.9808985,
            lng: -96.7783533,
            zoom: 5,
            phishinShowInfo: [],
            mp3Url: "",
            title: ""
        }
    }

    // Callback handles business logic for searching by username
    getNameValueFromNameForm = async nameValue => {

        // Get a list of user's attended shows and adds to showDate array.
        var phishnetUserData = await api.getAllUserDataFromPhishnet(nameValue);
        var showdateArray = phishnetUserData.map(x => {
            // For now, only user artist 1 (Phish)
            if (x.artist == 1) return x.showdate;
        });
        
        let phishinShowInfoArray = [];
        let push = true;

        // Get show info for a single show and push the entire object into array.
        for (var i = 0; i < showdateArray.length; i++) {
            try {
                // The response contains a venue with an array of shows.
                let phishinShowApiResponse = await api.getInfoForSingleShowFromPhishin(showdateArray[i]);
                push = true;
                phishinShowInfoArray.some(x => {
                    // Check if the venueid already exists, but also the shows array does not contain the show.
                    if (x.venueid == phishinShowApiResponse.venueid && !x.shows.includes(phishinShowApiResponse.shows[0])) {
                            x.shows.push(phishinShowApiResponse.shows[0])
                            // Set push to false so we don't push the show again.
                            push = false
                    }
                })
                if (push != false) phishinShowInfoArray.push(phishinShowApiResponse);
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

    getTrackInfoFromSetlistComponent = trackinfo => {
        this.setState({mp3Url: trackinfo.mp3, title: trackinfo.title});
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        const psi = this.state.phishinShowInfo;

        return (
            <Map center={position} zoom={this.state.zoom}>
                <TileLayer
                    url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    maxZoom={18}/>
                <Control position="topleft">
                    <NameForm callback={this.getNameValueFromNameForm}/>
                </Control>
                <Control position="topright">
                    <PlayerContainer mp3Url={this.state.mp3Url} title={this.state.title}/>
                </Control>
                {psi.map((venueAndUserShows, i) => {
                    // Temporary hack to fix lat/lngs that are null from the Phishin API response
                    if (venueAndUserShows.venue.latitude == null) venueHack.setMissingLocationData(venueAndUserShows);
                        
                    return (<Marker key={i} position={[venueAndUserShows.venue.latitude, venueAndUserShows.venue.longitude]}>
                        <Popup>
                            <MarkerInfo showinfo={venueAndUserShows} callback={this.getTrackInfoFromSetlistComponent}/>
                        </Popup>
                    </Marker>)
                })}
            </Map>
        )
    }
}
