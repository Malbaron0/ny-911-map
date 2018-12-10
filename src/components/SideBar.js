import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import SideBarChoices from './SideBarChoices';

class SideBar extends Component {
    render() {
        return (
            <Menu>
                <SideBarChoices/>
            </Menu>
        )
    }
}

export default SideBar;

