import React, { Component } from 'react';

class SideBarChoices extends Component {

    choiceItems = () => {
        let boroughs = {
            Brooklyn: "brooklyn",
            Queens: "queens",
            Bronx: "bronx",
            Manhattan: "manhattan"
        }
        
        return (
            <div>
                <select name="year" id="byYear"></select>
                <select name="borough" id="byBorough">
                    <option value="brooklyn">Brooklyn</option>
                    <option value="queens">Queens</option>
                    <option value="bronx">Bronx</option>
                    <option value="manhattan">Manhattan</option>
                </select>
                <select name="crime" id="byCrime">
                <option value="manhattan">Manhattan</option>
                <option value="manhattan">Manhattan</option>
                <option value="manhattan">Manhattan</option>
                <option value="manhattan">Manhattan</option>                
                
                </select>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.choiceItems()}
            </div>
        )
    }
}

export default SideBarChoices;

