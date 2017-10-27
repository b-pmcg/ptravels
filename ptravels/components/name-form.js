/**Parent: ptravels
 * Input form grabs name from user input and returns to base for api fetch. */
import React, { Component } from 'react';
export default class NameForm extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {value: ''};
	  this.handleChange = this.handleChange.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
	}
  
	handleChange(event) {
	  this.setState({value: event.target.value});
	}
  
	handleSubmit(event) {
	  event.preventDefault();
	  this.props.callbackFromParent(this.state.value);
	}
  
	render() {
	  return (
		<form onSubmit={this.handleSubmit}>
		  <label>
			Name:
			<input 
            type="text" 
            value={this.state.value} 
            onChange={this.handleChange}
            placeholder="Phish.Net username"
             />
		  </label>
		  <input type="submit" value="Submit" />
		</form>
	  );
	}
  }