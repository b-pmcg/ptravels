/**Parent: ptravels
 * Children: setlist-component
 * Renders all the popup data per show, plus pass thru for react player url state */
import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import SetlistComponent from './setlist-component';
import ClientApi from './client-api';
const api = new ClientApi();
export default class MarkerInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            url: "",
            played: 0,
            set1: [],
            set2: []
        }
    }

    componentWillMount = async () => {
        console.log(this.props.showinfo);
        this.setState({set1: this.props.showinfo.tracks.filter(item => item.set == "1")});
        this.setState({set2: this.props.showinfo.tracks.filter(item => item.set == "2")});
        //const set1 = this.props.showinfo.tracks.filter(item => item.set == "1");
        //const set2 = this.props.showinfo.tracks.filter(item => item.set == "2");
        // var info = await api.getSetlistInfoForSingleShow(this.props.showid);
        // var phishinShowInfo = await api.getMp3UrlsForSingleShowFromPhishin(info.response.data[0].showdate);
        // console.log(phishinShowInfo);
    }

    load = url => {
        console.log("load" + url)
        this.handleUrl(url)
    }

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

        const set1 = this.state.set1;
        const set2 = this.state.set2;
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
            <br />
            <div><span>{this.props.showinfo.venue.name}</span></div>
            <div><span>{this.props.showinfo.venue.location}</span></div>
            <div><span>{this.props.showinfo.date}</span></div>
            <br />
            <div><span>
                Set 1: {set1.map(trackInfo => {
                return (<span><a href='#' onClick={() => this.load(trackInfo.mp3)} className='setlist-song'>{trackInfo.title}</a>, </span>)
                })}
            </span></div>
            <br />
            <div><span>
                Set 2: {set2.map(trackInfo => {
                return (<span><a href='#' onClick={() => this.load(trackInfo.mp3)} className='setlist-song'>{trackInfo.title}</a>, </span>)
                })}
            </span></div>
            </div>);
    }
}