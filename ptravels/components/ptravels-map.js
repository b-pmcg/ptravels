/**Base component for map and data */
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
            lat: 41.7637,
            lng: -72.6851,
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
                setlist_notes: [],
                tracklistAndUrl: {
                    titles: [],
                    trackUrls: []
                },
                arrayOfPerShowTitleAndMp3ArrayAndObjs: []
            }
        }
    }

    getNameValueFromNameForm = async (nameValue) => {
            let artist = [];
            let venue = [];
            let location = [];
            let long_date = [];
            let relative_date = [];
            let setlistdata = [];
            let setlistnotes = [];
            let tracklistAndUrl = {titles:[], trackUrls: []};
            const arrayOfPerShowTitleAndMp3ArrayAndObjs = [];
        await api.getCoordsForAllShowsByUser(nameValue).then(data => {
            this.setState({markers: data.markers});
            data.showid.map(showidstring => {
                api.getSetlistInfoForSingleShow(showidstring).then(response => {
                // for the future: data[0] is a single index array containing an object with all the data
                    let setlistDataHtmlString = response.response.data[0].setlistdata;
                    var setlistDataHtmlEl = document.createElement('div');
                    setlistDataHtmlEl.innerHTML = setlistDataHtmlString;
                    
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

                    let showdate = response.response.data[0].showdate;
                    let arrayOfTitleAndMp3Objs = [];
                    let perShowDataTrackUrls = [];
                    
                    api.getMp3UrlsForSingleShowFromPhishin(showdate).then(response => {
                        response.data.tracks.map(track => {
                            let titleAndMp3Object = {title: track.title, mp3Url: track.mp3}
                            arrayOfTitleAndMp3Objs.push(titleAndMp3Object);
                        })
                        arrayOfPerShowTitleAndMp3ArrayAndObjs.push(arrayOfTitleAndMp3Objs);
                    })
                })
            })
            this.setState({
                showInfoForMarkerPopup: {
                    artist,
                    venue,
                    location,
                    long_date,
                    relative_date,
                    setlistdata,
                    setlistnotes,
                    tracklistAndUrl,
                    arrayOfPerShowTitleAndMp3ArrayAndObjs
            }});
        });
    }

    render() {
        const position = [this.state.lat, this.state.lng];
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
