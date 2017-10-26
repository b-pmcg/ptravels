/**Input form grabs name from user input and returns to base for api fetch. */
import React, { Component } from 'react';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Input from 'material-ui/Input';

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
  
	render() {
	  return (
          <div>
              <Card className="test">
              <CardContent className="test">
              <Typography type="headline">Map Your Shows</Typography>
              <Typography type="subheading" color="secondary">Username</Typography>
              <Input />
            </CardContent>
            </Card>

      </div>
	  );
	}
  }