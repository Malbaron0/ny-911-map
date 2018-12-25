import React, { Component } from 'react';
import {Marker, Popup } from 'react-leaflet';
import isObjectEmpty from '../resources/Utils';
import NYCOpenData from '../resources/NYCOpenData';

class Markers extends Component {

    getMarker = (nycData, selectedCategoryValues) => {
        if (isObjectEmpty(selectedCategoryValues)) {
            return (<Marker position={[40.7128, -74.0060]}>
                        <Popup>Empty :(</Popup>
                    </Marker>
                    )
        }
        else {
            //remove static data
            console.log(nycData);
            let markerData = NYCOpenData.getMultiple(nycData,
                selectedCategoryValues.yearValues[0],
                selectedCategoryValues.crimeValues[0],
                selectedCategoryValues.boroughValues[0])
            console.log(markerData);

            //this should be another function
            let markersArray = markerData.reduce((markers, crime) => {
                if(crime.hasOwnProperty('latitude')){
                    let crimePosition = [crime.latitude,crime.longitude];
                    markers.push(
                        <Marker position={crimePosition}>
                            <Popup>{crime.pd_desc}</Popup>
                        </Marker>
                    )
                }
                
                return markers;
            }, [])


            return markersArray;
        }
    }


    render() {
        return this.getMarker(this.props.data, this.props.selectedCategoryValues);
    }
}

export default Markers;

