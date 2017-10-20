/**Parent: marker-info
 */
import React, { Component } from 'react';
import SetlistSongComponent from './setlist-song-component';
import ClientApi from './client-api';
const api = new ClientApi();
export default class SetlistComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            url: "",
            set1: [],
            set2: []
        }
    }

    componentWillMount = async () => {
        this.setState({set1: this.props.showinfo.shows[0].tracks.filter(item => item.set == "1")});
        this.setState({set2: this.props.showinfo.shows[0].tracks.filter(item => item.set == "2")});
    }

    render() {
        const set1 = this.state.set1;
        const set2 = this.state.set2;

        return (<div>
            <br />
            <div><span>{this.props.showinfo.venue.name}</span></div>
            <div><span>{this.props.showinfo.venue.location}</span></div>
            <div><span>{this.props.showinfo.date}</span></div>
            <br />
            <div><span>Set 1: {set1.map(trackInfo => {
                    return (<span><a href='#' 
                            onClick={() => this.props.onClickF(trackInfo.mp3)} 
                            className='setlist-song'>{trackInfo.title}
                            </a>, </span>)
                    })}
            </span></div>
            <br />
            <div><span>Set 2: {set2.map(trackInfo => {
                    return (<span><a href='#' 
                            onClick={() => this.props.onClickF(trackInfo.mp3)} 
                            className='setlist-song'>{trackInfo.title}
                            </a>, </span>)
                    })}
            </span></div>
            </div>);
    }
}
