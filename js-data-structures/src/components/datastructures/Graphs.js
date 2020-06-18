import React from "react";
import GraphNodes from "./GraphNodes";
import "./Graphs.css";
import { displayCode } from "./stringCode";
import {
  MDBContainer,
  MDBBtn,
  MDBBtnGroup,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
} from "mdbreact";
import { depthFirstSearch } from "./algorithms/graphDepthFirst";

import {
  breadthFirstSearch,
  getShortestPath,
} from "./algorithms/graphBreadthFirst";

const START_NODE_COL = 5;
const START_NODE_ROW = 5;
const END_NODE_COL = 30;
const END_NODE_ROW = 10;

class Graphs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseIsPressed: false,
      breadthFirstSearchModal: false,
      depthFirstSearchModal: false,
    };
  }

  componentDidMount() {
    const grid = createGrid();
    this.setState({ grid });
  }

  toggle = (type) => {
    const modalType = type + "Modal";
    const modalState = this.state[modalType];
    this.setState({
      [modalType]: !modalState,
    });
  };

  handleMouseDown = (row, col) => {
    const newGrid = updateGridWithWalls(row, col, this.state.grid);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  };

  handleMouseEnter = (row, col) => {
    if (!this.state.mouseIsPressed) return;
    const newGrid = updateGridWithWalls(row, col, this.state.grid);
    this.setState({ grid: newGrid });
  };

  handleMouseUp = () => {
    this.setState({ mouseIsPressed: false });
  };

  moveStartOrEndNode = (row, col) => {
    if (!this.state.mouseIsPressed) return;
    document.getElementsById(`node-${row}-${col}`).className = "node-moving";
  };

  resetGraph = () => {
    const nodeList = document.getElementsByClassName("node");
    for (const node of nodeList) {
      console.log(node.id);
      if (node.id === `node-${START_NODE_ROW}-${START_NODE_COL}`) {
        node.className = "node node-start";
      } else if (node.id === `node-${END_NODE_ROW}-${END_NODE_COL}`) {
        node.className = "node node-end";
      } else {
        node.className = "node";
      }
    }
    const grid = createGrid();
    this.setState({ grid });
  };

  testDepthFirstSearch = () => {
    // start array to hold visited nodes
    const visitedNodes = [];
    const startNode = this.state.grid[START_NODE_ROW][START_NODE_COL];
    const endNode = this.state.grid[END_NODE_ROW][END_NODE_COL];
    depthFirstSearch(this.state.grid, startNode, endNode, visitedNodes);
    let shortestPath = getShortestPath(endNode);
    this.animateVisitedNodes(visitedNodes, shortestPath);
  };

  testBreadthFirst = () => {
    const visitedNodes = [];
    const startNode = this.state.grid[START_NODE_ROW][START_NODE_COL];
    const endNode = this.state.grid[END_NODE_ROW][END_NODE_COL];
    breadthFirstSearch(this.state.grid, startNode, endNode, visitedNodes);
    let shortestPath = getShortestPath(endNode);
    this.animateVisitedNodes(visitedNodes, shortestPath);
  };

  animateShortestPath = (shortestPath) => {
    for (let i = 0; i < shortestPath.length; i++) {
      // row and col of each node
      setTimeout(() => {
        const node = shortestPath[i];
        // find that element and change color
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 10 * i);
    }
  };

  animateVisitedNodes = (array, shortestPath) => {
    for (let i = 0; i <= array.length; i++) {
      if (i === array.length) {
        setTimeout(() => {
          this.animateShortestPath(shortestPath);
        }, 10 * i);
        return;
      }
      // row and col of each node
      setTimeout(() => {
        const node = array[i];
        // find that element and change color
        if (!node.isWall) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";
        }
      }, 10 * i);
    }
  };

  render() {
    const { grid, mouseIsPressed } = this.state;
    return (
      <>
        <MDBContainer fluid>
          <MDBBtnGroup>
            <MDBBtn color="primary" onClick={this.testDepthFirstSearch}>
              Depth First Search
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

          <MDBBtnGroup>
            <MDBBtn color="primary" onClick={this.testBreadthFirst}>
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
                    {
                      displayCode.javaScript.binarySearchTrees
                        .breadthFirstSearch
                    }
                  </code>
                </pre>
              </MDBModalBody>
            </MDBModal>
          </MDBBtnGroup>

          <MDBBtn color="primary" onClick={this.resetGraph}>
            Reset graph
          </MDBBtn>

          <table className="mx-auto">
            <tbody>
              {grid.map((row, rowIdx) => {
                return (
                  <tr key={rowIdx} id={rowIdx}>
                    {row.map((node, nodeIdx) => {
                      const {
                        row,
                        col,
                        isStart,
                        isEnd,
                        isWall,
                        isVisited,
                        previousNode,
                      } = node;
                      return (
                        <GraphNodes
                          key={nodeIdx}
                          col={col}
                          row={row}
                          isEnd={isEnd}
                          isStart={isStart}
                          isWall={isWall}
                          mouseIsPressed={mouseIsPressed}
                          onMouseDown={(row, col) =>
                            this.handleMouseDown(row, col)
                          }
                          onMouseEnter={(row, col) => {
                            this.handleMouseEnter(row, col);
                          }}
                          onMouseUp={() => this.handleMouseUp()}
                          onMoveStart={(row, col) =>
                            this.moveStartOrEndNode(row, col)
                          }
                        />
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </MDBContainer>
      </>
    );
  }
}

export default Graphs;

// helper function to create grid
function createGrid() {
  const grid = [];
  for (let i = 0; i < 15; i++) {
    const currentRow = [];
    for (let j = 0; j < 40; j++) {
      currentRow.push(createNodes(i, j));
    }
    grid.push(currentRow);
  }
  return grid;
}

// helper function to create node
function createNodes(row, col) {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isEnd: row === END_NODE_ROW && col === END_NODE_COL,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
}

const updateGridWithWalls = (row, col, grid) => {
  const newGrid = grid.slice();
  let startNode = grid[START_NODE_ROW][START_NODE_COL];
  let endNode = grid[END_NODE_ROW][END_NODE_COL];
  const node = grid[row][col];
  if (node !== startNode && node !== endNode) {
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
  }
  return newGrid;
};
