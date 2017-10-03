/**Renders a song component for each song. Also passes a function to update
 * react player url when clicking each song.
 */
import React, { Component } from 'react';
import SetlistSongComponent from './setlist-song-component';
export default class SetlistComponent extends React.Component {
    constructor(props){
        super(props);
    }

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