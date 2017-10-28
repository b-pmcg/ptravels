/**Parent: marker-info
 */
import React, { Component } from 'react';
import SetlistSongComponent from './setlist-song-component';
export default class SetlistComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            url: "",
            set1: [],
            set2: [],
            set3: [],
            encore: []
        }
    }

    componentWillMount() {
        this.setState({set1: this.props.showinfo.tracks.filter(item => item.set == "1")});
        this.setState({set2: this.props.showinfo.tracks.filter(item => item.set == "2")});
        this.setState({set3: this.props.showinfo.tracks.filter(item => item.set == "3")});
        this.setState({encore: this.props.showinfo.tracks.filter(item => item.set == "E")});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({set1: nextProps.showinfo.tracks.filter(item => item.set == "1")});
        this.setState({set2: nextProps.showinfo.tracks.filter(item => item.set == "2")});
        this.setState({set3: nextProps.showinfo.tracks.filter(item => item.set == "3")});
        this.setState({encore: nextProps.showinfo.tracks.filter(item => item.set == "E")});
      }

    render() {
        const set1 = this.state.set1;
        const set2 = this.state.set2;
        const set3 = this.state.set3;
        const encore = this.state.encore;

        return (<div>
            <div><span>{this.props.showinfo.date}</span></div>
            <br />
            {set1.length == 0 ? null : 
            <div><span>Set 1: {set1.map(trackInfo => {
                    return (<span><a href='#' 
                            onClick={() => this.props.callback(trackInfo.mp3)} 
                            className='setlist-song'>{trackInfo.title}
                            </a>, </span>)
                    })}
            </span></div>}
            <br />
            {set2.length == 0 ? null : 
            <div><span>Set 2: {set2.map(trackInfo => {
                    return (<span><a href='#' 
                            onClick={() => this.props.callback(trackInfo.mp3)} 
                            className='setlist-song'>{trackInfo.title}
                            </a>, </span>)
                    })}
            </span></div>}
            <br />
            {set3.length == 0 ? null : 
            <div><span>Set 3: {set3.map(trackInfo => {
                    return (<span><a href='#' 
                            onClick={() => this.props.callback(trackInfo.mp3)} 
                            className='setlist-song'>{trackInfo.title}
                            </a>, </span>)
                    })}
            </span></div>}
            {encore.length == 0 ? null : 
            <div><span>E: {encore.map(trackInfo => {
                    return (<span><a href='#' 
                            onClick={() => this.props.callback(trackInfo.mp3)} 
                            className='setlist-song'>{trackInfo.title}
                            </a>, </span>)
                    })}
            </span></div>}
            </div>);
    }
}
