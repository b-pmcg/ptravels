/**Renders a link with an individual song title, plus sets url state for react player */
import React, { Component } from 'react';
import ReactPlayer from 'react-player'
export default class SetlistSongComponent extends React.Component {
    load = url => {
        console.log("load" + url)
        this.props.hu(url)
    }

    renderLoadButton = (url, label) => {
        return (
          <button onClick={() => this.load(url)}>
            {label}
          </button>
        )
    }

    render() {
        return (
            <div className='setlist'><a href='#' onClick={() => this.load(this.props.data.mp3Url)}className='setlist-song'>{this.props.data.title}</a>, </div>
        );
    }
}