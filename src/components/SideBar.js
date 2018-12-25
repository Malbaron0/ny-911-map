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
        console.log(e.target.value);
        if (!this.searchCriteria.crimeValues.includes(e.target.value)) {
            this.searchCriteria.crimeValues.push(e.target.value);
        }

    }

    handleChangeYear = (e) => {
        console.log(e.target.value);
        if (!this.searchCriteria.yearValues.includes(e.target.value)) {
            this.searchCriteria.yearValues.push(e.target.value);
        }
    }

    handleChangeBorough = (e) => {
        console.log(e.target.value);
        if (!this.searchCriteria.boroughValues.includes(e.target.value)) {
            this.searchCriteria.boroughValues.push(e.target.value);
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.updateCategoryValues(this.searchCriteria);
    }

    crimeTypes = (crimeTypes) => {
        return (
            <select multiple className="custom-select" onChange={this.handleChangeCrime} >
                {crimeTypes.map(crimeType => {
                    return <option key={shortid.generate()} value={`${crimeType}`}>{`${crimeType}`}</option>
                })}
            </select>
        );
    }

    yearTypes = (years) => {
        let sortedYears = years.sort();

        return (
            <select multiple className="custom-select" onChange={this.handleChangeYear} >
                {sortedYears.filter(year => year)
                    .map(year => {
                        return <option key={shortid.generate()} value={`${year}`}>{`${year}`}</option>
                    })
                }
            </select>
        )
    }


    choiceItems = (categoryValues) => {
        return (
            <div className="input-group">

                {this.yearTypes(categoryValues["years"])}
                ,
                <select multiple className="custom-select" onChange={this.handleChangeBorough}>
                    <option value="BROOKLYN">Brooklyn</option>
                    <option value="QUEENS">Queens</option>
                    <option value="BRONX">Bronx</option>
                    <option value="MANHATTAN">Manhattan</option>
                </select>,

                    {this.crimeTypes(categoryValues["crimeTypes"])}

                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" onClick={this.handleSubmit} type="button">Button</button>
                </div>
            </div>
        )
    }

    render() {

        return (
            <div >
                {this.choiceItems(this.props.categoryValues)}
            </div>
        )

    }
}

export default SideBar;

