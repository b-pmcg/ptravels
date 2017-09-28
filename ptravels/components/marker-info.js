import React, { Component } from 'react';
export default class MarkerInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
            <div><span>{this.props.message.artist[this.props.index]}</span></div>
            <div><span>{this.props.message.venue[this.props.index]}</span></div>
            <div><span>{this.props.message.location[this.props.index]}</span></div>
            <div><span>{this.props.message.long_date[this.props.index]}</span></div>
            <div><span>{this.props.message.relative_date[this.props.index]}</span></div>
            <div><span>{this.props.message.setlistdata[this.props.index]}</span></div>
            <div><span>{this.props.message.setlistnotes[this.props.index]}</span></div>
            </div>);
    }
}