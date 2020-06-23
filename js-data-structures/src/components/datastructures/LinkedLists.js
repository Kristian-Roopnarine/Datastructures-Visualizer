import React from "react";
import { Link } from "react-router-dom";
import LinkedListSpace from "./LinkedListSpace";
import { displayCode } from "./stringCode";
import Prism from "prismjs";
import "../../prism.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBInput,
  MDBCol,
  MDBBtnGroup,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
} from "mdbreact";
import {
  LinkedList,
  Node,
  createNodes,
} from "./datastructure-code/LinkedListCode";

class LinkedLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedBack: "",
      LL: new LinkedList(),
      renderArray: [],
      findNode: "",
      insertNode: "",
      position: "",
      deleteNode: "",
      addModal: false,
      deleteModal: false,
      findModal: false,
      insertModal: false,
    };
  }

  componentDidMount() {
    Prism.highlightAll();
  }

  toggle = (type) => {
    const modalType = type + "Modal";
    const modalState = this.state[modalType];
    this.setState({
      [modalType]: !modalState,
    });
  };
  // insert nodes
  insertNode = () => {
    // only execute if there is a node value to insert and position
    if (this.state.insertNode && this.state.position) {
      // create node to insert
      let nodeToInsert = new Node(parseInt(this.state.insertNode));
      // get position to insert
      let position = parseInt(this.state.position);

      // insert to linked list
      let middleLL = this.state.LL;
      middleLL.insertBeforeAtPosition(nodeToInsert, position);

      // create element to add
      let newNode = {
        nodeValue: nodeToInsert.value,
        currentClass: ["mt-2", "nodes", "animated", "zoomIn"],
      };

      // update state to insert node
      let middleArray = this.state.renderArray;
      middleArray.splice(position - 1, 0, newNode);

      this.setState({
        ...this.state,
        LL: middleLL,
        renderArray: middleArray,
        feedBack: `Inserted node with a value of ${nodeToInsert.value} at position ${position}.`,
      });

      setTimeout(() => {
        this.resetNodes();
      }, 1000);
    }
  };

  findNode = () => {
    let nodeToFind = parseInt(this.state.findNode);
    let position = this.state.LL.find(nodeToFind);
    if (position) {
      this.resetNodes();
      this.setState({
        ...this.state,
        feedBack: `Found a node with the value of ${nodeToFind} at position ${position}`,
      });
    } else {
      this.setState({
        ...this.state,
        feedBack: `Could not find a node with the value of ${nodeToFind}.`,
      });
    }

    this.animateNode(position, "bg-success");
  };

  deleteNode = () => {
    let nodeToDelete = parseInt(this.state.deleteNode);
    let position = this.state.LL.delete(nodeToDelete);

    if (position) {
      this.animateDeleteNode(position);

      // there's something with the zoomOutDown class that doesn't allow me to update state properly
      setTimeout(() => {
        const zoomOutDivs = document.getElementsByClassName("zoomOutDown");
        zoomOutDivs[0].classList.remove("zoomOutDown");
        zoomOutDivs[0].classList.remove("zoomOutDown");
      }, 500);

      setTimeout(() => {
        let newArray = this.state.renderArray.filter(
          (number, index) => index !== position - 1
        );
        this.setState({
          ...this.state,
          renderArray: newArray,
          feedBack: `Deleted a node with the value of ${nodeToDelete} at position ${position}`,
        });
      }, 600);
    } else {
      this.setState({
        ...this.state,
        feedBack: `Could not find a node with the value of ${nodeToDelete}.`,
      });
    }
  };

  animateDeleteNode = (position) => {
    const nodeDivs = document.getElementsByClassName("nodes");
    const arrowDivs = document.getElementsByClassName("arrows");
    for (var i = 0; i < nodeDivs.length; i++) {
      if (i === position - 1) {
        nodeDivs[i].classList.add("animated", "zoomOutDown");
        arrowDivs[i].classList.add("animated", "zoomOutDown");
      }
    }
  };

  animateNode = (position, className = null) => {
    setTimeout(() => {
      const newArray = this.state.renderArray.map((node, index) => {
        if (index === position - 1) {
          node.currentClass = node.currentClass.concat(className);
          return node;
        } else {
          return node;
        }
      });

      this.setState({
        ...this.state,
        renderArray: newArray,
      });
    }, 700 * position);

    for (var i = 0; i < position - 1; i++) {
      this.turnNodeToRed(i);
    }
  };

  turnNodeToRed = (i) => {
    setTimeout(() => {
      this.state.renderArray[i].currentClass = this.state.renderArray[
        i
      ].currentClass.concat("bg-danger");
      this.setState({
        ...this.state,
        renderArray: [...this.state.renderArray],
      });
      this.turnNodeToNormal(i);
    }, 750 * i);
  };

  turnNodeToNormal = (i) => {
    setTimeout(() => {
      this.state.renderArray[i].currentClass = this.state.renderArray[
        i
      ].currentClass.slice(0, 2);
      this.setState({
        ...this.state,
        renderArray: [...this.state.renderArray],
      });
    }, 700);
  };

  resetNodes = () => {
    let newArray = this.state.renderArray.map((node) => {
      node.currentClass = node.currentClass.slice(0, 2);
      return node;
    });
    this.setState({
      ...this.state,
      renderArray: newArray,
    });
  };

  addNode = () => {
    let newNode = createNodes();
    let middleLL = this.state.LL;
    middleLL.add(newNode);
    let list = [
      {
        nodeValue: newNode.value,
        currentClass: ["mt-2", "nodes", "animated", "zoomIn"],
      },
      ...this.state.renderArray,
    ];
    this.setState({ ...this.state, LL: middleLL, renderArray: list });
    setTimeout(() => {
      this.resetNodes();
    }, 700);
  };

  onInputChange = (e) => {
    this.setState({ ...this.state, [e.target.id]: e.target.value });
  };

  render() {
    return (
      <MDBContainer fluid>
        <MDBRow className="mt-3">
          <MDBCol>
            <a
              href="https://medium.com/@kristian.roopnarine/data-structures-linked-lists-a3cfb0b728ac?sk=91adf31e9d8b6eb9813e45ddbfa08483"
              className="btn btn-success"
              target="_blank"
            >
              Description of Linked Lists
            </a>

            <MDBBtnGroup>
              <MDBBtn color="primary" onClick={this.addNode}>
                Add random integer node to Linked List
              </MDBBtn>
              <MDBBtn onClick={() => this.toggle("add")} size="sm">
                Code
              </MDBBtn>
              <MDBModal
                isOpen={this.state.addModal}
                toggle={() => this.toggle("add")}
              >
                <MDBModalHeader toggle={() => this.toggle("add")}>
                  Code to Add Node to Linked List
                </MDBModalHeader>
                <MDBModalBody>
                  <pre>
                    <code className="language-javascript">
                      {displayCode.javaScript.linkedList.add}
                    </code>
                  </pre>
                </MDBModalBody>
              </MDBModal>
            </MDBBtnGroup>
          </MDBCol>

          <MDBCol>
            <MDBInput
              label="Node to find"
              value={this.state.findNode}
              id="findNode"
              size="sm"
              onChange={this.onInputChange}
            ></MDBInput>
            <MDBBtnGroup>
              <MDBBtn onClick={this.findNode} color="warning">
                Find Node
              </MDBBtn>
              <MDBBtn onClick={() => this.toggle("find")} size="sm">
                Code
              </MDBBtn>
              <MDBModal
                isOpen={this.state.findModal}
                toggle={() => this.toggle("find")}
              >
                <MDBModalHeader toggle={() => this.toggle("find")}>
                  Code to Find Node in Linked List
                </MDBModalHeader>
                <MDBModalBody>
                  <pre>
                    <code className="language-javascript">
                      {displayCode.javaScript.linkedList.find}
                    </code>
                  </pre>
                </MDBModalBody>
              </MDBModal>
            </MDBBtnGroup>
          </MDBCol>

          <MDBCol>
            <MDBInput
              label="Node to delete"
              value={this.state.deleteNode}
              size="sm"
              id="deleteNode"
              onChange={this.onInputChange}
            ></MDBInput>
            <MDBBtnGroup>
              <MDBBtn color="danger" onClick={this.deleteNode}>
                Delete Node
              </MDBBtn>
              <MDBBtn onClick={() => this.toggle("delete")} size="sm">
                Code
              </MDBBtn>
              <MDBModal
                isOpen={this.state.deleteModal}
                toggle={() => this.toggle("delete")}
              >
                <MDBModalHeader toggle={() => this.toggle("delete")}>
                  Code to Delete Node in Linked List
                </MDBModalHeader>
                <MDBModalBody>
                  <pre>
                    <code className="language-javascript">
                      {displayCode.javaScript.linkedList.delete}
                    </code>
                  </pre>
                </MDBModalBody>
              </MDBModal>
            </MDBBtnGroup>
          </MDBCol>

          <MDBCol>
            <MDBInput
              label="Node to insert"
              value={this.state.insertNode}
              size="sm"
              id="insertNode"
              onChange={this.onInputChange}
            ></MDBInput>
            <MDBInput
              label="Position to insert"
              value={this.state.position}
              size="sm"
              id="position"
              onChange={this.onInputChange}
            ></MDBInput>
            <MDBBtnGroup>
              <MDBBtn color="info" onClick={this.insertNode}>
                Insert Node before position
              </MDBBtn>
              <MDBBtn onClick={() => this.toggle("insert")} size="sm">
                Code
              </MDBBtn>
              <MDBModal
                isOpen={this.state.insertModal}
                toggle={() => this.toggle("insert")}
              >
                <MDBModalHeader toggle={() => this.toggle("insert")}>
                  Code to Insert Node in Linked List
                </MDBModalHeader>
                <MDBModalBody>
                  <pre>
                    <code className="language-javascript">
                      {displayCode.javaScript.linkedList.insert}
                    </code>
                  </pre>
                </MDBModalBody>
              </MDBModal>
            </MDBBtnGroup>
          </MDBCol>
        </MDBRow>

        <MDBRow className="p-2">
          <h3>{this.state.feedBack}</h3>
        </MDBRow>

        <MDBRow>
          <LinkedListSpace linkedList={this.state.renderArray} />
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default LinkedLists;
