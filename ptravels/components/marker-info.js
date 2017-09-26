import React, { Component } from 'react';
export default class MarkerInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div><span>Hi! {this.props.message}</span></div>);
    }
}