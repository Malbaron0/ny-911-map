import React, {
  Component
} from 'react';
import LeafletMap from './LeafletMap';
import NYCOpenData from '../resources/NYCOpenData';
import Loading from './Loading';
import SideBar from './SideBar';
import SideBarChoices from './SideBarChoices';

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

s
  render() {
    if (this.state.loading) {
      return (
        <Loading />
      )
    }
    else {
      return (
        <div>
                <SideBarChoices/>
          <LeafletMap />
        </div>
      );
    }
  }
}

export default App;