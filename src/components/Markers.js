import React, { Component } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { isObjectEmpty } from '../resources/Utils';
import NYCOpenData from '../resources/NYCOpenData';
var moment = require('moment');
class Markers extends Component {

    MarkerCollection = (nycData, selectedCategoryValues) => {
        if (isObjectEmpty(selectedCategoryValues)) {
            return (<Marker position={[40.7128, -74.0060]}>
                <Popup>Search for crimes through the search filter above.</Popup>
            </Marker>)
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
            if (crime.hasOwnProperty('latitude')) {
                let crimePosition = [crime.latitude, crime.longitude];
                let crimeTime = moment(crime.cmplnt_to_tm, 'HH:mm:ss').format('h:mm A');
                let crimeDate = moment(crime.cmplnt_fr_dt).format('MMMM Do YYYY');
                markers.push(
                    <Marker position={crimePosition}>
                        <Popup>
                            <div>Offense Description : {crime.ofns_desc}</div>
                            <div>Offense Date: {crimeDate}</div>
                            <div>Offense Time: {crimeTime}</div>
                        </Popup>
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

