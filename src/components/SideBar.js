import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import Select from 'react-select';
import shortid from 'shortid';

//TODO: Add ability to choose multiple values 
class SideBar extends Component {

    searchCriteria = {
        crimeValues: [],
        yearValues: [],
        boroughValues: []
    }



    handleChangeCrime = (e) => {
        console.log(e);
        // if (!this.searchCriteria.crimeValues.includes(e.target.value)) {
        //     this.searchCriteria.crimeValues.push(e.target.value);
        // }

    }

    handleChangeYear = (e) => {
        console.log(e);
        // if (!this.searchCriteria.yearValues.includes(e.target.value)) {
        //     this.searchCriteria.yearValues.push(e.target.value);
        // }
    }

    handleChangeBorough = (e) => {
        console.log(e);
        // if (!this.searchCriteria.boroughValues.includes(e.target.value)) {
        //     this.searchCriteria.boroughValues.push(e.target.value);
        // }
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.updateCategoryValues(this.searchCriteria);
    }

    crimeTypes = (crimeTypes) => {
        let options = crimeTypes.map(crimeType => {
            return { value : `${crimeType}`, label: `${crimeType}`}
        });
        return (
            <Select
                onChange={this.handleChangeCrime}
                isMulti
                className="basic-multi-select"
                options={options} />
        );
    }

    yearTypes = (years) => {
        let sortedYears = years.sort();
        let options = sortedYears.filter(year => year)
            .map(year => {
                return {
                    value: `${year}`,
                    label: `${year}`
                }
            });

        return (
            <Select isMulti
                className="basic-multi-select"
                onChange={this.handleChangeYear}
                options={options}>

            </Select>
        )
    }

    boroughTypes = () => {
        let options = [
            { value : "BROOKLYN", label: 'Brooklyn'},
            { value : "QUEENS", label: 'Queens'},
            { value : "BRONX", label: 'Bronx'},
            { value : "MANHATTAN", label: 'Manhattan'}
        ];

        return (
            <Select isMulti
                className="basic-multi-select"
                onChange={this.handleChangeBorough}
                options={options}>

            </Select>
        )

    }


    choiceItems = (categoryValues) => {
        return (
            <React.Fragment>
                {this.yearTypes(categoryValues["years"])}
                {this.crimeTypes(categoryValues["crimeTypes"])}
                {this.boroughTypes()}
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" onClick={this.handleSubmit} type="button">Button</button>
                </div>
            </React.Fragment>
        )
    }

    render() {

        return (
            <div className="sideBar" >
                {this.choiceItems(this.props.categoryValues)}
            </div>
        )

    }
}

export default SideBar;

