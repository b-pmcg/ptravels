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
            
            markers: [],
            showInfoForMarkerPopup: {
                artist: [],
                venue: [],  
                location: [],
                long_date: [],
                relative_date: [],
                setlistdata: [],
                setlist_notes: []
            }
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
            //artist, venue, location, relative_date, setlist_data, setlist_notes
            let artist = [];
            let venue = [];
            let location = [];
            let long_date = [];
            let relative_date = [];
            let setlistdata = [];
            let setlistnotes = [];
        await api.getCoordsForAllShowsByUser(nameValue).then(data => {
            console.log(data);
            this.setState({markers: data.markers});
            console.log(data.showid)
            data.showid.map(showidstring => {
                api.getSetlistInfoForSingleShow(showidstring).then(response => {
                // for the future: data[0] is a single index array containing an object with all the data
                    let parsedArtist = Parser(response.response.data[0].artist);
                    let parsedVenue = Parser(response.response.data[0].venue);
                    let parsedLocation = Parser(response.response.data[0].location);
                    let parsedLongDate = Parser(response.response.data[0].long_date);
                    let parsedRelativeDate = Parser(response.response.data[0].relative_date);
                    let parsedSetlistData = Parser(response.response.data[0].setlistdata);
                    let parsedSetlistNotes = Parser(response.response.data[0].setlistnotes);
                    artist.push(parsedArtist);
                    venue.push(parsedVenue);
                    location.push(parsedLocation);
                    long_date.push(parsedLongDate);
                    relative_date.push(parsedRelativeDate);
                    setlistdata.push(parsedSetlistData);
                    setlistnotes.push(parsedSetlistNotes);
                })
            })
                
            this.setState({showInfoForMarkerPopup: {
                artist,
                venue,
                location,
                long_date,
                relative_date,
                setlistdata,
                setlistnotes
            }});
            
        });
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        const center = [51.505, -0.09];
        //const message = ["messag1", "message2"];
        const propsetlistdata = this.state.showInfoForMarkerPopup;

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
                            <MarkerInfo index={i} message={propsetlistdata}/>
                        </Popup>
                  </Marker>
                  )}
            </Map>
        )
    }
}
