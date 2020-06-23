import React from "react";
import BinarySearchTreeCanvas from "./BinarySearchTreeCanvas.js";
import {
  MDBBtn,
  MDBBtnGroup,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
} from "mdbreact";
import {
  BTNode,
  BinarySearchTree,
  randomIntFromInterval,
} from "./datastructure-code/BinarySearchTreeCode.js";
import { displayCode } from "./stringCode";

const STARTING_X = 250;
const STARTING_Y = 25;

class BinarySearchTrees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      BST: new BinarySearchTree(),
      feedBack: "Add nodes to the tree",
      renderArray: [],
      valueArray: [],
      animating: false,
      animation: "",
      addModal: false,
      breadthFirstSearchModal: false,
      depthFirstSearchModal: false,
      inOrderTraversalModal: false,
      postOrderTraversalModal: false,
    };
  }

  toggle = (type) => {
    const modalType = type + "Modal";
    const modalState = this.state[modalType];
    this.setState({
      [modalType]: !modalState,
    });
  };

  resetState = () => {
    this.setState({
      ...this.state,
      animating: false,
      animation: "",
      renderArray: [],
      valueArray: [],
    });
  };

  drawTreeNode = () => {
    // create node
    let treeNode = new BTNode(randomIntFromInterval(0, 10));
    // add to bst
    if (this.state.BST.size === 0) {
      treeNode.x = STARTING_X;
      treeNode.y = STARTING_Y;
    }

    this.state.BST.addTreeNode(treeNode);
    this.setState({
      ...this.state,
    });
  };

  animateDepthFirst = () => {
    this.setState(
      {
        ...this.state,
        animating: false,
        animation: "",
        renderArray: [],
        valueArray: [],
      },
      () => {
        if (this.state.BST.root !== null) {
          let auxRenderArray = [];
          let auxValueArray = [];

          let finalArrays = this.depthFirstIterative(this.state.BST.root);

          auxValueArray = finalArrays[0];
          auxRenderArray = finalArrays[1];

          this.setState({
            ...this.state,
            valueArray: auxValueArray,
            renderArray: auxRenderArray,
            animation: "DFS",
            animating: true,
          });
        }
      }
    );
  };

  animateBreadthFirst = () => {
    this.setState(
      {
        ...this.state,
        animating: false,
        animation: "",
        renderArray: [],
        valueArray: [],
      },
      () => {
        if (this.state.BST.root !== null) {
          let finalArray = this.breadthFirstSearch(this.state.BST.root);
          this.setState({
            ...this.state,
            renderArray: finalArray[1],
            valueArray: finalArray[0],
            animation: "BFS",
            animating: true,
          });
        }
      }
    );
  };

  animateInOrderTraversal = () => {
    this.setState(
      {
        ...this.state,
        animating: false,
        animation: "",
        renderArray: [],
        valueArray: [],
      },
      () => {
        if (this.state.BST.root !== null) {
          let auxRenderArray = [];
          let auxValueArray = [];

          let finalArrays = this.inOrderTraversal(
            this.state.BST.root,
            auxRenderArray,
            auxValueArray
          );

          auxValueArray = finalArrays[0];
          auxRenderArray = finalArrays[1];

          this.setState({
            ...this.state,
            valueArray: auxValueArray,
            renderArray: auxRenderArray,
            animation: "DFS",
            animating: true,
          });
        }
      }
    );
  };

  animatePostOrderTraversal = () => {
    this.setState(
      {
        ...this.state,
        animating: false,
        animation: "",
        renderArray: [],
        valueArray: [],
      },
      () => {
        if (this.state.BST.root !== null) {
          let auxRenderArray = [];
          let auxValueArray = [];

          let finalArrays = this.postOrderTraversal(
            this.state.BST.root,
            auxRenderArray,
            auxValueArray
          );

          auxValueArray = finalArrays[0];
          auxRenderArray = finalArrays[1];

          this.setState({
            ...this.state,
            valueArray: auxValueArray,
            renderArray: auxRenderArray,
            animation: "DFS",
            animating: true,
          });
        }
      }
    );
  };

  inOrderTraversal = (node, auxRenderArray, auxValueArray) => {
    if (node !== null) {
      this.inOrderTraversal(node.left, auxRenderArray, auxValueArray);
      auxValueArray.push(node.val);
      auxRenderArray.push({ ...node });
      this.inOrderTraversal(node.right, auxRenderArray, auxValueArray);
    }

    return [auxValueArray, auxRenderArray];
  };

  postOrderTraversal = (node, auxRenderArray, auxValueArray) => {
    if (node !== null) {
      this.postOrderTraversal(node.left, auxRenderArray, auxValueArray);
      this.postOrderTraversal(node.right, auxRenderArray, auxValueArray);
      auxValueArray.push(node.val);
      auxRenderArray.push({ ...node });
    }
    return [auxValueArray, auxRenderArray];
  };

  depthFirstIterative = (root) => {
    let stack = [root];
    let res = [];
    let renderAnimations = [];
    while (stack.length !== 0) {
      let curr = stack.pop();
      renderAnimations.push({ ...curr });
      res.push(curr.val);
      if (curr.right) stack.push(curr.right);
      if (curr.left) stack.push(curr.left);
    }
    return [res, renderAnimations];
  };

  breadthFirstSearch = (node) => {
    let queue = [node];
    let renderAnimations = [];
    let res = [];

    while (queue.length !== 0) {
      let currentNode = queue.shift();

      renderAnimations.push({ ...currentNode });

      res.push(currentNode.val);
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
    return [res, renderAnimations];
  };

  render() {
    const valueArray = this.state.valueArray || [];
    return (
      <>
        <a
          href="https://medium.com/@kristian.roopnarine/data-structures-binary-search-trees-2f58a5a8e2a2?source=friends_link&sk=5c26b727983aba577883bcc0e3f3b6b0"
          className="btn btn-success"
          target="_blank"
        >
          Description of Binary Search Trees
        </a>
        <MDBBtnGroup className="mt-3">
          <MDBBtn color="primary" onClick={this.drawTreeNode}>
            Add tree node
          </MDBBtn>
          <MDBBtn onClick={() => this.toggle("add")} size="sm">
            Code
          </MDBBtn>
          <MDBModal
            isOpen={this.state.addModal}
            toggle={() => this.toggle("add")}
          >
            <MDBModalHeader toggle={() => this.toggle("add")}>
              Code to Add Node to Binary Search Tree
            </MDBModalHeader>
            <MDBModalBody>
              <pre>
                <code className="language-javascript">
                  {displayCode.javaScript.binarySearchTrees.add}
                </code>
              </pre>
            </MDBModalBody>
          </MDBModal>
        </MDBBtnGroup>

        <MDBBtnGroup className="mt-3">
          <MDBBtn color="primary" onClick={(e) => this.animateBreadthFirst()}>
            Breadth First Search
          </MDBBtn>
          <MDBBtn onClick={() => this.toggle("breadthFirstSearch")} size="sm">
            Code
          </MDBBtn>
          <MDBModal
            isOpen={this.state.breadthFirstSearchModal}
            toggle={() => this.toggle("breadthFirstSearch")}
          >
            <MDBModalHeader toggle={() => this.toggle("breadthFirstSearch")}>
              Code to Apply Breadth First Search
            </MDBModalHeader>
            <MDBModalBody>
              <pre>
                <code className="language-javascript">
                  {displayCode.javaScript.binarySearchTrees.breadthFirstSearch}
                </code>
              </pre>
            </MDBModalBody>
          </MDBModal>
        </MDBBtnGroup>

        <MDBBtnGroup className="mt-3">
          <MDBBtn color="primary" onClick={(e) => this.animateDepthFirst(e)}>
            Depth First Search (Pre Order traversal)
          </MDBBtn>
          <MDBBtn onClick={() => this.toggle("depthFirstSearch")} size="sm">
            Code
          </MDBBtn>
          <MDBModal
            isOpen={this.state.depthFirstSearchModal}
            toggle={() => this.toggle("depthFirstSearch")}
          >
            <MDBModalHeader toggle={() => this.toggle("depthFirstSearch")}>
              Code to Apply Depth First Search
            </MDBModalHeader>
            <MDBModalBody>
              <pre>
                <code className="language-javascript">
                  {displayCode.javaScript.binarySearchTrees.depthFirstSearch}
                </code>
              </pre>
            </MDBModalBody>
          </MDBModal>
        </MDBBtnGroup>

        <MDBBtnGroup className="mt-3">
          <MDBBtn
            color="primary"
            onClick={(e) => this.animatePostOrderTraversal()}
          >
            Post Order Traversal
          </MDBBtn>
          <MDBBtn onClick={() => this.toggle("postOrderTraversal")} size="sm">
            Code
          </MDBBtn>
          <MDBModal
            isOpen={this.state.postOrderTraversalModal}
            toggle={() => this.toggle("postOrderTraversal")}
          >
            <MDBModalHeader toggle={() => this.toggle("postOrderTraversal")}>
              Code to Apply Post Order Traversal
            </MDBModalHeader>
            <MDBModalBody>
              <pre>
                <code className="language-javascript">
                  {displayCode.javaScript.binarySearchTrees.postOrderTraversal}
                </code>
              </pre>
            </MDBModalBody>
          </MDBModal>
        </MDBBtnGroup>

        <MDBBtnGroup className="mt-3">
          <MDBBtn
            color="primary"
            onClick={(e) => this.animateInOrderTraversal()}
          >
            In Order Traversal
          </MDBBtn>
          <MDBBtn onClick={() => this.toggle("inOrderTraversal")} size="sm">
            Code
          </MDBBtn>
          <MDBModal
            isOpen={this.state.inOrderTraversalModal}
            toggle={() => this.toggle("inOrderTraversal")}
          >
            <MDBModalHeader toggle={() => this.toggle("inOrderTraversal")}>
              Code to Apply In Order Traversal
            </MDBModalHeader>
            <MDBModalBody>
              <pre>
                <code className="language-javascript">
                  {displayCode.javaScript.binarySearchTrees.inOrderTraversal}
                </code>
              </pre>
            </MDBModalBody>
          </MDBModal>
        </MDBBtnGroup>

        <div className="mt-3 text-center">
          <h3>Node traversal order : {valueArray.join(" , ")}</h3>
        </div>

        <BinarySearchTreeCanvas
          animating={this.state.animating}
          currentBST={this.state.BST}
          renderingArray={this.state.renderArray}
          animation={this.state.animation}
        />
      </>
    );
  }
}

export default BinarySearchTrees;
