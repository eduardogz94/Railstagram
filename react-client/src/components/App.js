import React from "react";
import axios from 'axios'
import Users from './Rails/Users'

class App extends React.Component {
  render() {
    return (
        <div >
          <h1>Rails API users</h1>
          <Users />
        </div>
    );
  }
}

export default App
