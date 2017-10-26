/**Input form grabs name from user input and returns to base for api fetch. */
import React, { Component } from 'react';
import TextField from 'material-ui/textfield';
import SearchBar from 'material-ui-search-bar'
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

export default class NameForm extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {value: ''};
	  this.handleChange = this.handleChange.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
	}
  
	handleChange(event) {
	  this.setState({value: event});
	}
  
	handleSubmit() {
	//   event.preventDefault();
	  this.props.callbackFromParent(this.state.value);
	}
  //need to reinstall materialui without @next
	render() {
	  return (
          <div>
            <SearchBar
                hintText="Search Your Shows"
                onChange={this.handleChange}
                onRequestSearch={this.handleSubmit}
                value={this.state.value}
                style={{
                    margin: '0 auto',
                    maxWidth: 800
                }}
            />
            <CardContent className="joke">
            <Typography type="headline">Live From Space</Typography>
            <Typography type="subheading" color="secondary">
              Mac Miller
            </Typography>
          </CardContent>
        </div>
	  );
	}
  }