/**Parent: ptravels
 * Children: setlist-component, next-show-button
 * Renders all the popup data per show, including buttons
 * plus pass thru for react player url state */
import React, { Component } from 'react';
import SetlistComponent from './setlist-component';
import NextShowButton from './reuseable-components/next-show-button.js';

export default class MarkerInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            url: "",
            currentlyDisplayedShowIndex: 1,
            theShow: this.props.showinfo.shows[0],
            maxIndex: this.props.showinfo.shows.length - 1,
            prevButtonIsDisabled: true,
            nextButtonIsDisabled: ""
        }
    }

    componentWillMount = () => {
        if (this.props.showinfo.shows.length <= 1) {
            this.setState({nextButtonIsDisabled: true});
        }
    }
    
    toggleShowPrev = () => {
        let newIndex = this.state.currentlyDisplayedShowIndex > 0 ? this.state.currentlyDisplayedShowIndex - 1 : 0;
        console.log(`Previous: Max index: ${this.state.maxIndex}. Array length: ${this.props.showinfo.shows.length}. New index: ${newIndex}`);
        let theShow = this.props.showinfo.shows[newIndex];
        let isPrevDisabled = newIndex == 0 ? true : "";
        let isNextDisabled = newIndex == this.state.maxIndex ? true : "";
        this.setState({currentlyDisplayedShowIndex: newIndex, theShow: theShow, prevButtonIsDisabled: isPrevDisabled, nextButtonIsDisabled: isNextDisabled})
      }

    toggleShowNext = () => {
        let newIndex = this.state.currentlyDisplayedShowIndex < this.state.maxIndex ? this.state.currentlyDisplayedShowIndex + 1 : this.state.maxIndex;
        console.log(`Next: Max index: ${this.state.maxIndex}. Array length: ${this.props.showinfo.shows.length}. New index: ${newIndex}`);
        let theShow = this.props.showinfo.shows[newIndex];
        let isPrevDisabled = newIndex === 0 ? true : "";
        let isNextDisabled = newIndex == this.state.maxIndex ? true : "";
        this.setState({currentlyDisplayedShowIndex: newIndex, theShow: theShow, prevButtonIsDisabled: isPrevDisabled, nextButtonIsDisabled: isNextDisabled})
      }

    render() {
        let selectedShowIndex = this.state.currentlyDisplayedShowIndex;
        let theShow = this.state.theShow;
        const prevLabel = "Previous";
        const nextLabel = "Next";
        const numShows = this.props.showinfo.shows.length;
        const grammaticalShow = this.props.showinfo.shows.length == 1 ? "show" : "shows";

        return (<div>
                <div><span>{this.props.showinfo.venue.name}</span></div>
                <div><span>{this.props.showinfo.venue.location}</span></div>
                <SetlistComponent showinfo={theShow} callback={this.props.callback}/>
                <br />
                <span><i>You have seen {numShows} {grammaticalShow} at {this.props.showinfo.venue.name}</i></span>
                <br />
                <button
                    onClick={this.toggleShowPrev}
                    className="btn btn-default"
                    disabled={this.state.prevButtonIsDisabled}
                    >{prevLabel}
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