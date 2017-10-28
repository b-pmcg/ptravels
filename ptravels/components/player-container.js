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
            played: 0,
            playing: false
        }
    }

    componentWillReceiveProps(url) {
        this.load(url.mp3Url);
      }

    load = url => {
        console.log("Url load exec")
        this.setState({url: url, played: 0, playing: true});
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

    // playPause = () => {
    //     console.log(this.state.playing)
    //     this.setState({ playing: !this.state.playing })
    // }

    stop = () => {
        this.setState({ url: null, playing: false, played: 0 })
    }

    ref = player => {
        this.player = player;
    }

    render() {
        let url = this.state.url;
        let playing = this.state.playing;
        let played = this.state.played;
        let isDisabled = playing ? "" : "true";
        console.log(isDisabled + " " + playing);
        let style={
            background: '#FFF',
            border: '1px solid gray',
            padding: '1em',
            display: 'true'
        }

        return (<div
                style={style}>
                <ReactPlayer
                    ref={this.ref} 
                    url={this.state.url}
                    onProgress={this.onProgress}
                    width='25%'
                    height='100%'
                    playing />
                <div 
                className="slider-wrapper">
                <input
                    type='range' min={0} max={1} step='any'
                    size='100'
                    value={played}
                    onMouseDown={this.onSeekMouseDown}
                    onChange={this.onSeekChange}
                    onMouseUp={this.onSeekMouseUp}
                /></div>
                <div
                className="controls-wrapper">
                <button 
                    onClick={this.stop}
                    disabled={isDisabled}
                >Stop</button>
                </div>
            </div>);
    }
}