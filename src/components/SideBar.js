import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import Select from 'react-select';
import shortid from 'shortid';

//TODO: Add ability to choose multiple values 
class SideBar extends Component {
    constructor() {
        super();
        this.state = {
            searchCriteria : {
                crimes: [],
                years: [],
                boroughs: []
            }
        }
       this.searchCriteriaTemp = {
        crimeValues: [],
        yearValues: [],
        boroughValues: []
       }
    }

    handleChangeCrime = (e) =>{
        console.log(e.target.value);
        if(!this.searchCriteriaTemp.crimeValues.includes(e.target.value)){
            this.searchCriteriaTemp.crimeValues.push(e.target.value);
        }
           
    }

    handleChangeYear = (e) =>{
        console.log(e.target.value);
        if(!this.searchCriteriaTemp.yearValues.includes(e.target.value)){
            this.searchCriteriaTemp.yearValues.push(e.target.value);
        }
    }

    handleChangeBorough = (e) =>{
        console.log(e.target.value);
        if(!this.searchCriteriaTemp.boroughValues.includes(e.target.value)){
            this.searchCriteriaTemp.boroughValues.push(e.target.value);
        }
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



    handleSubmit = event => {
        event.preventDefault();
        this.props.updateCategoryValues(this.searchCriteriaTemp);
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
            <div width={"1000px"}>
                {this.choiceItems(this.props.categoryValues)}
            </div>
        )

    }
}

export default SideBar;

