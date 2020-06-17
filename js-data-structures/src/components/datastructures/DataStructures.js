import React from "react";
import LinkedLists from "./LinkedLists";
import BinarySearchTrees from "./BinarySearchTrees";
import Graphs from "./Graphs";
import BaseNavBar from "./BaseNavBar";
import { BrowserRouter } from "react-router-dom";

class DataStructures extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let dataStructure;
    if (this.props.type === "Linked List") {
      dataStructure = <LinkedLists />;
    } else if (this.props.type === "Binary Search Tree") {
      dataStructure = <BinarySearchTrees />;
    } else if (this.props.type === "Graphs") {
      dataStructure = <Graphs />;
    } else {
      dataStructure = <div>Oops there was an error.</div>;
    }
    return (
      <>
        <BaseNavBar />
        {dataStructure}
      </>
    );
  }
}

export default DataStructures;
