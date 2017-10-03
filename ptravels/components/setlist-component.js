import React, { Component } from 'react';
import SetlistSongComponent from './setlist-song-component';
//import ReactPlayer from 'react-player'
export default class SetlistComponent extends React.Component {
    constructor(props){
        super(props);
        // console.log("setlist song comp solo ")
        // console.log(this.props.data); //data is the entire show
        // console.log(this.props.data.length);
    }
    // right now i'm being given an array of all shows and songs.


    /**I need to send to my child:
     * data.title with a single title
     * data.titleUrl with a single, matching titleUrl
     */

    render() {
        return (
            <div>
                {this.props.data.map((song, i) =>
                <SetlistSongComponent key={"scKey" + i} hu={this.props.handleurl} data={song} idx={this.props.index}/>
                )} 
            </div>
        );
    }
}