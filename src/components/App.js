import React, { Component } from 'react';
import LeafletMap from './LeafletMap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      nycOpenData: [],
      error: ""
    }

  }
  render() {
    return (
      <LeafletMap/>
    );
  }
}

export default App;
