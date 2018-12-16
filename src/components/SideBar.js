import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import Select from 'react-select';
import shortid from 'shortid';
class SideBar extends Component {
    constructor() {
        super();
        this.state = {
            crimeValues: [],
            yearValues: [],
            boroughValues: []
        }
    }

    crimeTypes = (crimeTypes) => {
        return crimeTypes.map(crimeType => {
            return <option key={shortid.generate()} value={`${crimeType}`}>{`${crimeType}`}</option>
        })
    }

    yearTypes = (years) => {
        let sortedYears = years.sort();
        return sortedYears.filter(year => year).map(year => {
            return <option key={shortid.generate()} value={`${year}`}>{`${year}`}</option>
        })
    }



    handleSubmit(event) {
        event.preventDefault();
    }

    choiceItems = (categoryValues) => {
        return (
            <form onSubmit={this.handleSubmit}>
                <select name="year" id="byYear">
                    {this.yearTypes(categoryValues["years"])}
                </select>,
                <select name="borough" id="byBorough">
                    <option value="BROOKLYN">Brooklyn</option>
                    <option value="QUEENS">Queens</option>
                    <option value="BRONX">Bronx</option>
                    <option value="MANHATTAN">Manhattan</option>
                </select>,
                <select name="crime" id="byCrime">
                    {this.crimeTypes(categoryValues["crimeTypes"])}
                </select>
                <input type="submit" value="Submit" />
            </form>
        )
    }

    render() {
        console.log(this.props.categoryValues )
        
            return (
                <Menu width={"1000px"} Menu isOpen={true}>
                    {this.choiceItems(this.props.categoryValues)}
                </Menu>
            )
        
    }
}

export default SideBar;

