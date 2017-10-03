import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import SetlistComponent from './setlist-component';
export default class MarkerInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {url: ""}
        // console.log(this.props.message);
        // console.log("markerhi")
        // console.log(this.props.message.estupido);
        // console.log("merkerho!")
        // console.log(this.props.message.estupido[0].titles);
        console.log("marker info arrayOfPerShowTitleAndMp3ArrayAndObjs")
        console.log(this.props.message.arrayOfPerShowTitleAndMp3ArrayAndObjs);
    }
// everytime this class instantiates, it should fetch every song url from phish/in
// break apart setlistdata and grab each song, use this as an id to 
// fetch the url from phish.in

    /**{this.props.data.titles.map((title, i) => 
                    <a href='http://phish.net/song/lit-o-bit' className='setlist-song'>{title}</a>
                  ).reduce((prev, curr) => [prev, ', ', curr])
                  } */
                  /**
             * nott working right now because you're trying to map off an object
             * also the same issue where all the tracks from all the shows are being pushed into an array
             * need to do some indexing like below
             * <ReactPlayer url='https://phish.in/audio/000/031/014/31014.mp3' playing />
             */

    handleUrl = url => {
        this.setState({url: url});
    }

    render() {
        return (<div>  
            <ReactPlayer url={this.state.url} playing />
            <div><span>{this.props.message.artist[this.props.index]}</span></div>
            <div><span>{this.props.message.venue[this.props.index]}</span></div>
            <div><span>{this.props.message.location[this.props.index]}</span></div>
            <div><span>{this.props.message.long_date[this.props.index]}</span></div>
            <div><span>{this.props.message.relative_date[this.props.index]}</span></div>

            <SetlistComponent handleurl={this.handleUrl} key={"scKey" + this.props.index} data={this.props.message.arrayOfPerShowTitleAndMp3ArrayAndObjs[this.props.index]} idx={this.props.index}/>
            <div><span>{this.props.message.setlistdata[this.props.index]}</span></div>
            <div><span>{this.props.message.setlistnotes[this.props.index]}</span></div>
            </div>);
    }
}