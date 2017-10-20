/**Parent: marker-info
 */
import React, { Component } from 'react';
import SetlistSongComponent from './setlist-song-component';
import ClientApi from './client-api';
const api = new ClientApi();
export default class SetlistComponent extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props.showinfo);
        this.state = {
            url: "",
            set1: [],
            set2: [],
            set3: [],
            encore: []
        }
    }

    componentWillMount() {
        this.setState({set1: this.props.showinfo.tracks.filter(item => item.set == "1") || null});
        this.setState({set2: this.props.showinfo.tracks.filter(item => item.set == "2") || null});
        this.setState({set3: this.props.showinfo.tracks.filter(item => item.set == "3")});
        this.setState({encore: this.props.showinfo.tracks.filter(item => item.set == "E") || null});
    }

    render() {
        const set1 = this.state.set1;
        const set2 = this.state.set2;
        const set3 = this.state.set3;
        const encore = this.state.encore;
        console.log(this.state.set3.length)

        return (<div>
            <div><span>{this.props.showinfo.date}</span></div>
            <br />
            {set1.length == 0 ? null : 
            <div><span>Set 1: {set1.map(trackInfo => {
                    return (<span><a href='#' 
                            onClick={() => this.props.onClickF(trackInfo.mp3)} 
                            className='setlist-song'>{trackInfo.title}
                            </a>, </span>)
                    })}
            </span></div>}
            <br />
            {set2.length == 0 ? null : 
            <div><span>Set 3: {set2.map(trackInfo => {
                    return (<span><a href='#' 
                            onClick={() => this.props.onClickF(trackInfo.mp3)} 
                            className='setlist-song'>{trackInfo.title}
                            </a>, </span>)
                    })}
            </span></div>}
            <br />
            {set3.length == 0 ? null : 
            <div><span>Set 3: {set3.map(trackInfo => {
                    return (<span><a href='#' 
                            onClick={() => this.props.onClickF(trackInfo.mp3)} 
                            className='setlist-song'>{trackInfo.title}
                            </a>, </span>)
                    })}
            </span></div>}
            {encore.length == 0 ? null : 
            <div><span>E: {encore.map(trackInfo => {
                    return (<span><a href='#' 
                            onClick={() => this.props.onClickF(trackInfo.mp3)} 
                            className='setlist-song'>{trackInfo.title}
                            </a>, </span>)
                    })}
            </span></div>}
            </div>);
    }
}
