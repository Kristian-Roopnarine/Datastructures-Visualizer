import React from "react";
import { BrowserRouter } from "react-router-dom";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdbreact";

class BaseNavBar extends React.Component {
  state = {
    isOpen: false,
  };

  render() {
    return (
      <MDBNavbar color="blue-gradient" dark expand="md">
        <MDBNavbarBrand>
          <MDBNavLink to="/">
            <strong className="white-text">Programmers Corner</strong>
          </MDBNavLink>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <span className="mr-2">Data Structures</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem href="/linked-lists">
                    Linked Lists
                  </MDBDropdownItem>
                  <MDBDropdownItem href="/binary-search-trees">
                    Binary Search Trees
                  </MDBDropdownItem>
                  <MDBDropdownItem href="/graphs">Graphs</MDBDropdownItem>
                  <MDBDropdownItem href="#!">
                    Something else here
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/sorting-algorithms">
                Sorting Algorithms
              </MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default BaseNavBar;
