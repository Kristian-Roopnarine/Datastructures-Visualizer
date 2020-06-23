import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
} from "mdbreact";

class LinkedListNodes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MDBCol size="2" key={this.props.idx} className="text-center">
        <MDBCard className={this.props.currentClass.join(" ")}>
          <MDBCardBody>
            <MDBCardTitle tag="h5">Node</MDBCardTitle>
            <MDBCardText>Value: {this.props.value}</MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    );
  }
}

export default LinkedListNodes;
