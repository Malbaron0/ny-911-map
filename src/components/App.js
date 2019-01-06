import React, {
  Component
} from 'react';
import LeafletMap from './LeafletMap';
import NYCOpenData from '../resources/NYCOpenData';
import Loading from './Loading';
import Navbar from './Navbar';
import {mergeArrays} from '../resources/Utils';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      crimeData: [], 
      categoryValues: {}, //array to hold values for the year and crime type dropdown
      selectedCategoryValues: {}, //state used to store user's selected filter options for the data
      error: ""
    }

  }

  componentDidMount() {
    this.setState({
      loading: true
    });

    //Promise chain to 2 API's
    Promise.all([NYCOpenData.nycData(NYCOpenData.historicalDataURL), 
      NYCOpenData.nycData(NYCOpenData.yearToDateDataURL)])
      .then(data => {
        this.setState({
          crimeData: mergeArrays(data[0], data[1]), //merge the data (the historic and year to date data)
          categoryValues: NYCOpenData.getYearsAndCrimeTypes(data)
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
          <Navbar 
                  updateCategoryValues = {this.updateCategoryValues} categoryValues = {this.state.categoryValues}></Navbar>
          <LeafletMap selectedCategoryValues = {this.state.selectedCategoryValues} data = {this.state.crimeData} />
          </div>
      );
    }
  }
}

export default App;