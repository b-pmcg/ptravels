/**Parent: ptravels
 * Children: setlist-component
 * Renders all the popup data per show, plus pass thru for react player url state */
import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import SetlistComponent from './setlist-component';
export default class MarkerInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            url: "",
            played: 0,
        } // What's a better way to set state here?
    }

    /* <ReactPlayer url='https://phish.in/audio/000/031/014/31014.mp3' playing />*/

    handleUrl = url => {
        this.setState({url: url, played: 0});
    }

    onSeekChange = e => {
        this.setState({ played: parseFloat(e.target.value) })
      }

    onSeekMouseDown = e => {
    this.setState({ seeking: true })
    }

    onSeekMouseUp = e => {
        this.setState({ seeking: false })
        this.player.seekTo(parseFloat(e.target.value))
    }

    onProgress = state => {
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
          this.setState(state)
        }
      }
    ref = player => {
        this.player = player
    }
    /**
     * className='react-player'
              width='100%'
              height='100%'
              playing={playing}
              onReady={() => console.log('onReady')}
              onStart={() => console.log('onStart')}
              onBuffer={() => console.log('onBuffer')}
              onSeek={e => console.log('onSeek', e)}
              onEnded={() => this.setState({ playing: false })}
              onError={e => console.log('onError', e)}
              onProgress={this.onProgress}
     */

    render() {
        const {
            url, playing, volume, muted,
            played, loaded, duration,
            playbackRate,
            soundcloudConfig,
            vimeoConfig,
            youtubeConfig,
            fileConfig
          } = this.state
          const SEPARATOR = ' · '
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