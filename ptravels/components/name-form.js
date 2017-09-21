// import React, { Component } from 'react';
// export default class NameForm extends React.Component {
// 	constructor(props) {
// 	  super(props);
// 	  this.state = {value: ''};
  
// 	  this.handleChange = this.handleChange.bind(this);
// 	  this.handleSubmit = this.handleSubmit.bind(this);
// 	}

// 	grabData(namo) {
// 		event.preventDefault();
// 		let self = this;
// 		fetch(`/usershows/${namo}`)  
// 		.then(  
// 		  function(response) {  
// 			if (response.status !== 200) {  
// 			  console.log('Looks like there was a problem. Status Code: ' +  
// 				response.status);  
// 			  return;  
// 			}
// 			// Examine the text in the response  
// 			response.json().then(function(data) {  
// 				//var mostRecentShow = data.pop;
// 			  console.log(data); 
// 			  console.log("someeee")
// 			  //self.setState({something: [JSON.stringify(data)]});
// 			});  
// 		  }  
// 		)  
// 		.catch(function(err) {  
// 		  console.log('Fetch Error :-S', err);  
// 		});
// 		//end fetch stuff
// 	}
	  
// 	handleChange(event) {
// 	  this.setState({value: event.target.value});
// 	}
  
// 	async handleSubmit(event) {
// 		await this.grabData(this.state.value);	  
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