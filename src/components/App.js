import React, { Component } from 'react';
import LeafletMap from './LeafletMap';
import NYCOpenData from '../resources/NYCOpenData';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      nycOpenData: [],
      error: ""
    }

  }

  componentDidMount() {
    this.setState({
      loading: true
    });

    NYCOpenData.nycData().then(data => {
      this.setState({
        nycOpenData: data,
        loading: false
      });
    })
      .catch(error => {
        this.setState({
          loading: false,
          error
        })
        console.log(error);
      });
  }


  render() {
    return (
      <LeafletMap/>
    );
  }
}

export default App;
