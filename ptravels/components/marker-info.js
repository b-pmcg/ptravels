import React, { Component } from 'react';
export default class MarkerInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.message[this.props.index]);
        return (<div><span>{this.props.message[this.props.index]}</span></div>);
    }
}