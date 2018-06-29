import React, { Component } from 'react'
import axios from 'axios'

class Users extends Component {
	constructor() {
	  super()
	  this.state = {
	    users: []
	  }
	}


	componentDidMount() {
		axios.get('http://localhost:4000/api/v1/')
		.then(response => {
			console.log(response.data)
			this.setState({users: response.data})
			})
		.catch(error => console.log(error))
	}

	render() {
		return (
		  <div>
		    Users
		  </div>
		)
	}
}

export default Users