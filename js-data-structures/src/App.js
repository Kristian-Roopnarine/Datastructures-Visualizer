import React from 'react';
import DataStructures from './components/datastructures/DataStructures'
import {MDBBtn,MDBContainer} from 'mdbreact'


class App extends React.Component{
  state = {hideButtons:false,dataStructure:null}

  

  hideOnClick = (e) => {
    this.setState({dataStructure:e.target.value,hideButtons:!this.state.hideButtons})
  }

  render() {
    const hideDiv = this.state.hideButtons
    let homeDiv;
    if (!hideDiv){
      homeDiv = <><MDBBtn color="primary" value="Linked List" onClick={this.hideOnClick}>Linked Lists</MDBBtn><MDBBtn color="primary" value="Binary Search Tree" onClick={this.hideOnClick}>Binary Search Trees</MDBBtn></>
      
    } else {
      homeDiv = <DataStructures type={this.state.dataStructure}/>
    }
    return (
      <>
        {homeDiv}
      </>
    );
  }
}

export default App;
