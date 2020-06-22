import React from "react";
import {
  MDBContainer,
  MDBTypography,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBCol,
} from "mdbreact";

import linkedList from "./img/linked-list.png";
import bst from "./img/bst.png";
import graphs from "./img/graphs.png";
import sorting from "./img/sorting.png";

class Home extends React.Component {
  render() {
    return (
      <MDBContainer>
        <MDBTypography
          tag="h1"
          variant="display-2"
          className="text-center mt-2"
        >
          Welcome to the Programmers Corner!
        </MDBTypography>
        <hr />
        <h3>
          The goal of this application is to provide a collection of programming
          concepts to help people visualize different data structures and
          algorithms. This application covers:
        </h3>
        <br />
        <MDBRow className="text-center my-3 align-items-center">
          <MDBCol>
            <h2 className="text-monospace">Linked Lists</h2>
            <img src={linkedList} className="img-thumbnail" />
          </MDBCol>
          <MDBCol>
            <h2 className="text-monospace">Binary Search Trees</h2>
            <img src={bst} className="img-thumbnail" />
          </MDBCol>
          <MDBCol>
            <h2 className="text-monospace">Graphs</h2>
            <img src={graphs} className="img-thumbnail" />
          </MDBCol>
          <MDBCol>
            <h2 className="text-monospace">Sorting algorithms</h2>
            <img src={sorting} className="img-thumbnail" />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default Home;
