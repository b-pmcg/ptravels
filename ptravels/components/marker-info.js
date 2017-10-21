/**Parent: ptravels
 * Children: setlist-component
 * Renders all the popup data per show, plus pass thru for react player url state */
import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import SetlistComponent from './setlist-component';
import NextShowButton from './reuseable-components/next-show-button.js'
export default class MarkerInfo extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props.showinfo);
        this.state = {
            url: "",
            played: 0,
            set1: [],
            set2: [],
            currentlyDisplayedShowIndex: 1,
            theShow: this.props.showinfo.shows[0],
            maxIndex: this.props.showinfo.shows.length - 1,
            prevButtonIsDisabled: true,
            nextButtonIsDisabled: ""
        }
    }
    // ReactPlayer stuff should be moved into own component
    load = url => { 
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
    // End ReactPlayerStuff

    // Toggle Show Stuff
    toggleShowPrev = () => {
        let newIndex = this.state.currentlyDisplayedShowIndex > 0 ? this.state.currentlyDisplayedShowIndex - 1 : 0;
        console.log(`Previous: Max index: ${this.state.maxIndex}. Array length: ${this.props.showinfo.shows.length}. New index: ${newIndex}`);
        let theShow = this.props.showinfo.shows[newIndex];
        this.setState({currentlyDisplayedShowIndex: newIndex, theShow: theShow})
      }

    toggleShowNext = () => {
        let newIndex = this.state.currentlyDisplayedShowIndex < this.state.maxIndex ? this.state.currentlyDisplayedShowIndex + 1 : this.state.maxIndex;
        console.log(`Next: Max index: ${this.state.maxIndex}. Array length: ${this.props.showinfo.shows.length}. New index: ${newIndex}`);
        let theShow = this.props.showinfo.shows[newIndex];
        let isDisabled = this.props.showinfo.shows[newIndex] == this.props.showinfo.shows[this.state.maxIndex] ? true : "";
        this.setState({currentlyDisplayedShowIndex: newIndex, theShow: theShow, nextButtonIsDisabled: isDisabled})
      }

    render() {
        const {
            url, playing, volume, muted,
            played, loaded, duration,
        } = this.state;
        let selectedShowIndex = this.state.currentlyDisplayedShowIndex;
        let theShow = this.state.theShow;
        const prevLabel = "Previous";
        const nextLabel = "Next";
        const numShows = this.props.showinfo.shows.length;
        const grammaticalShow = this.props.showinfo.shows.length == 1 ? "show" : "shows";
        console.log(selectedShowIndex);

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
                <SetlistComponent onClickF={this.load} showinfo={theShow}/>
                <br />
                <span><i>You have seen {numShows} {grammaticalShow} at {this.props.showinfo.venue.name}</i></span>
                <br />
                <button
                    onClick={this.toggleShowPrev}
                    className="btn btn-default">{prevLabel}
                </button>
                <button
                    onClick={this.toggleShowNext}
                    className="btn btn-default"
                    disabled={this.state.nextButtonIsDisabled}
                    >{nextLabel}
                    
                </button>
            </div>);
    }
}