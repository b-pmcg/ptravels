import React, { Component } from 'react';
import ReactPlayer from 'react-player'
export default class MarkerInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
            <div><ReactPlayer url='https://phish.in/audio/000/004/643/4643.mp3' playing />
            <span>{this.props.message.artist[this.props.index]}</span></div>
            <div><span>{this.props.message.venue[this.props.index]}</span></div>
            <div><span>{this.props.message.location[this.props.index]}</span></div>
            <div><span>{this.props.message.long_date[this.props.index]}</span></div>
            <div><span>{this.props.message.relative_date[this.props.index]}</span></div>
            <div><span>{this.props.message.setlistdata[this.props.index]}</span></div>
            <div><span>{this.props.message.setlistnotes[this.props.index]}</span></div>
            </div>);
    }
}