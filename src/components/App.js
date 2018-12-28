import React, {
  Component
} from 'react';
import LeafletMap from './LeafletMap';
import NYCOpenData from '../resources/NYCOpenData';
import Loading from './Loading';
import SideBar from './SideBar';
//TODO: create functions that will setstate on categoryValues, pass that to map, use that to create pins
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      nycOpenData: [],
      categoryValues: {}, //array to hold values for the year and crime type dropdown
      selectedCategoryValues: {},
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
          categoryValues: NYCOpenData.getCrimeTypes(data)
        });
        console.log(this.state.loading)
      })
      .then(data => {
        this.setState({
          loading: false
        })
        console.log(this.state.loading)

      })
      .catch(error => {
        this.setState({
          loading: false,
          error
        })
        console.log(error);
      });
  }

  
  updateCategoryValues = (selectedCategoryValues) => {
    this.setState({selectedCategoryValues})
  }


  render() {
    if (this.state.loading) {
      return (
        <Loading />
      )
    }
    else {
      return (
        <div className="parent-container">
          <SideBar 
                  updateCategoryValues = {this.updateCategoryValues} categoryValues = {this.state.categoryValues}></SideBar>
          <LeafletMap selectedCategoryValues = {this.state.selectedCategoryValues} data = {this.state.nycOpenData} />
          </div>
      );
    }
  }
}

export default App;