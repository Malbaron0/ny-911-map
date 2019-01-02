import React, {
  Component
} from 'react';
import LeafletMap from './LeafletMap';
import NYCOpenData from '../resources/NYCOpenData';
import Loading from './Loading';
import SideBar from './SideBar';
import {mergeArrays} from '../resources/Utils';

//TODO: create functions that will setstate on categoryValues, pass that to map, use that to create pins
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      crimeData: [],
      categoryValues: {}, //array to hold values for the year and crime type dropdown
      selectedCategoryValues: {},
      error: ""
    }

  }

  componentDidMount() {
    this.setState({
      loading: true
    });

    Promise.all([NYCOpenData.nycData(NYCOpenData.historicalDataURL), 
      NYCOpenData.nycData(NYCOpenData.yearToDateDataURL)])
      .then(data => {
        this.setState({
          crimeData: mergeArrays(data[0], data[1]),
          categoryValues: NYCOpenData.getCrimeTypes(data)
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
      });
  }

  
  updateCategoryValues = (selectedCategoryValues) => {
    this.setState({selectedCategoryValues})
    console.log(selectedCategoryValues);
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
          <LeafletMap selectedCategoryValues = {this.state.selectedCategoryValues} data = {this.state.crimeData} />
          </div>
      );
    }
  }
}

export default App;