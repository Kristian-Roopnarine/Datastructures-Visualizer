import React from "react";
import DataStructures from "./components/datastructures/DataStructures";
import { MDBBtn, MDBContainer } from "mdbreact";
import BaseNavBar from "./components/datastructures/BaseNavBar";
import LinkedLists from "./components/datastructures/LinkedLists";
import BinarySearchTrees from "./components/datastructures/BinarySearchTrees";
import Graphs from "./components/datastructures/Graphs";
import SortingVisualizer from "./components/SortingVisualizer/SortingVisualizer";
import { BrowserRouter, Route } from "react-router-dom";

class App extends React.Component {
  state = { hideButtons: false, dataStructure: null };

  hideOnClick = (e) => {
    this.setState({
      dataStructure: e.target.value,
      hideButtons: !this.state.hideButtons,
    });
  };

  render() {
    return (
      <>
        <BrowserRouter>
          <BaseNavBar></BaseNavBar>
          <Route path="/linked-lists" component={LinkedLists}></Route>
          <Route
            path="/binary-search-trees"
            component={BinarySearchTrees}
          ></Route>
          <Route path="/graphs" component={Graphs}></Route>
          <Route
            path="/sorting-algorithms"
            component={SortingVisualizer}
          ></Route>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
