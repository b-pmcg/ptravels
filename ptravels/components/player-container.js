/**Parent: ptravels
 * Children: 
 * A container for the react audio player */
import React, { Component } from 'react';
import ReactPlayer from 'react-player';

export default class PlayerContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            url: "",
            played: 0
        }
    }

    componentWillReceiveProps(url) {
        console.log(url.mp3Url)
        this.load(url.mp3Url);
      }

    load = url => { 
        this.setState({url: url, played: 0});
    }

    handleUrl = url => {
        this.setState({url: url, played: 0});
    }

    onSeekChange = e => {
        this.setState({ played: parseFloat(e.target.value) });
      }

    onSeekMouseDown = e => {
    this.setState({ seeking: true });
    }

    onSeekMouseUp = e => {
        this.setState({ seeking: false });
        this.player.seekTo(parseFloat(e.target.value));
    }

    onProgress = state => {
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
          this.setState(state);
        }
    }

    ref = player => {
        this.player = player;
    }
    // End ReactPlayerStuff

    render() {
        const {
            url, playing, volume, muted,
            played, loaded, duration,
        } = this.state;

        return (<div>
                <ReactPlayer
                    ref={this.ref} 
                    url={this.state.url}
                    onProgress={this.onProgress}
                    width='25%'
                    height='100%'
                    playing />
                <div className="slider-wrapper">
                <input
                type='range' min={0} max={1} step='any'
                size='100'
                value={played}
                onMouseDown={this.onSeekMouseDown}
                onChange={this.onSeekChange}
                onMouseUp={this.onSeekMouseUp}
                /></div>
            </div>);
    }
}