import React, { Component } from 'react';
import {Marker, Popup } from 'react-leaflet';
import isObjectEmpty from '../resources/Utils';
import NYCOpenData from '../resources/NYCOpenData';

class Markers extends Component {

    MarkerCollection = (nycData, selectedCategoryValues) => {
        if (isObjectEmpty(selectedCategoryValues)) {
            return (<Marker position={[40.7128, -74.0060]}>
                        <Popup>Empty :(</Popup>
                    </Marker>
                    )
        }
        else {
            let filtered = NYCOpenData.getMultiple(nycData,
                selectedCategoryValues);
            
            let markersArray = this.createMarkers(filtered);


            return markersArray;
        }
    }

    createMarkers = (markerData) => {
        return markerData.reduce((markers, crime) => {
            //if check to see if crime has latitude. Apparently some of the data doesnt contain location.
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
    }

    render() {
        return this.MarkerCollection(this.props.data, this.props.selectedCategoryValues);
    }
}

export default Markers;

