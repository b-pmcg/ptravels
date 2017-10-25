/**React player to control audio stream. */
import React, { Component } from 'react';
import ReactPlayer from 'react-player'
export default class PlayerContainer extends React.Component {
	constructor(props) {
	  super(props);
	}
  
	render() {
	  return (
		<div>
            <ReactPlayer
                />
            <div className="slider-wrapper"
            style={{backgroundColor: 'white'}}>
            <input
            type='range' 
            />
            Test
            </div>
        </div>
	  );
	}
  }