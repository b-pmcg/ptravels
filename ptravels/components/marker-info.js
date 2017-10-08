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
        }
    }

    componentWillMount = async () => {
        // console.log(this.props.showid);
        // var info = await api.getSetlistInfoForSingleShow(this.props.showid);
        // var phishinShowInfo = await api.getMp3UrlsForSingleShowFromPhishin(info.response.data[0].showdate);
        // console.log(phishinShowInfo);
    }

    /* <ReactPlayer url='https://phish.in/audio/000/031/014/31014.mp3' playing />*/

    // handleUrl = url => {
    //     this.setState({url: url, played: 0});
    // }

    // onSeekChange = e => {
    //     this.setState({ played: parseFloat(e.target.value) })
    //   }

    // onSeekMouseDown = e => {
    // this.setState({ seeking: true })
    // }

    // onSeekMouseUp = e => {
    //     this.setState({ seeking: false })
    //     this.player.seekTo(parseFloat(e.target.value))
    // }

    // onProgress = state => {
    //     // We only want to update time slider if we are not currently seeking
    //     if (!this.state.seeking) {
    //       this.setState(state)
    //     }
    //   }
    // ref = player => {
    //     this.player = player
    // }
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
        // const {
        //     url, playing, volume, muted,
        //     played, loaded, duration,
        //     playbackRate,
        //     soundcloudConfig,
        //     vimeoConfig,
        //     youtubeConfig,
        //     fileConfig
        //   } = this.state
          //const SEPARATOR = ' · '
        return (<div>{this.props.showid}</div>);
    }
}