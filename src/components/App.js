import React, {
  Component
} from 'react';
import LeafletMap from './LeafletMap';
import NYCOpenData from '../resources/NYCOpenData';
import Loading from './Loading';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      nycOpenData: [],
      crimeTypes: [],
      error: ""
    }

  }

  componentDidMount() {
    this.setState({
      loading: true
    });

    NYCOpenData.nycData()
      .then(data => {
        this.setState({
          nycOpenData: data,
          crimeTypes: NYCOpenData.getCrimeTypes(data)
        });
      })
      .then(data => {
        this.setState({
          loading: false
        })
      })
      .catch(error => {
        this.setState({
          loading: false,
          error
        })
        console.log(error);
      });
  }

  s
  render() {
    if (this.state.loading) {
      return (
        <Loading />
      )
    }
    else {
      return (
          <LeafletMap />
      );
    }
  }
}

export default App;