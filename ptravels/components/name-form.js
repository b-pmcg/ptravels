// import React, { Component } from 'react';

// /*This is an text input that fetches data from the Node API Server.js*/

// export default class NameForm extends React.Component {
// 	constructor(props) {
// 	  super(props);
// 	  this.state = {value: ''};
  
// 	  this.handleChange = this.handleChange.bind(this);
// 	  this.handleSubmit = this.handleSubmit.bind(this);
// 	}

// 	submitUsername = username => {
//         console.log("submitUsername: " + username);
//         //let self = this; // I think there's a better way.
//         fetch(`/usershows/${username}`)  
//         .then(function(response) {
//           console.log(response);
//           console.log("LOOOOK AT ME");
//           if (response.status !== 200) {  
//             console.log('Looks like there was a problem. Status Code: ' +  response.status);  
//             return;  
//           }
//           response.json().then(function(data) {  
//             //var mostRecentShow = data.pop;
//             console.log("submitusername callback data: " + data);
//             //self.setState({something: [JSON.stringify(data)]});
//           });  
//           }  
//         ).catch(function(err) {  
//             console.log('Fetch Error :-S', err);  
//         });
//       }
  
// 	handleChange(event) {
// 	  this.setState({value: event.target.value});
// 	}
  
// 	handleSubmit(event) {
// 		var theName = this.state.value;
// 		console.log("handle submit thename: " + theName);
// 		this.submitUsername(theName);
// 		this.props.callbackFromParent(theName);
// 	}
  
// 	render() {
// 	  return (
// 		<form onSubmit={this.handleSubmit}>
// 		  <label>
// 			Name:
// 			<input type="text" value={this.state.value} onChange={this.handleChange} />
// 		  </label>
// 		  <input type="submit" value="Submit" />
// 		</form>
// 	  );
// 	}
//   }