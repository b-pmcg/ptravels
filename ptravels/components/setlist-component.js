/**Parent: marker-info
 * Children:
 * Renders a song component for each song. Also passes a function to update
 * react player url when clicking each song.
 */
import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import SetlistSongComponent from './setlist-song-component';
export default class SetlistComponent extends React.Component {
    constructor(props){
        super(props);
    }
    load = url => {
        console.log("load" + url)
        this.props.handleurl(url)
    }

    renderLoadButton = (url, label) => {
        return (
          <button onClick={() => this.load(url)}>
            {label}
          </button>
        )
    }

    render() {
        return (
            <div>
                {this.props.data.map((song, i) =>
                    <span key={i + "sckey"}><a href='#' onClick={() => this.load(song.mp3Url)}className='setlist-song'>{song.title}</a>, </span>
                )} 
            </div>
        );
    }
}