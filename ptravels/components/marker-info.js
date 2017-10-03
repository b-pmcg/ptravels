/**Renders all the popup data per show, plus pass thru for react player url state */
import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import SetlistComponent from './setlist-component';
export default class MarkerInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {url: ""} // What's a better way to set state here?
    }

    /* <ReactPlayer url='https://phish.in/audio/000/031/014/31014.mp3' playing />*/

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
            {/* <div><span>{this.props.message.setlistdata[this.props.index]}</span></div> */}
            <div><span>{this.props.message.setlistnotes[this.props.index]}</span></div>
            </div>);
    }
}