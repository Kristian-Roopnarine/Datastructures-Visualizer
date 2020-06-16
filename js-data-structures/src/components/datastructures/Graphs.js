import React from "react";
import GraphNodes from "./GraphNodes";
import "./Graphs.css";
import { MDBContainer, MDBBtn } from "mdbreact";

const START_NODE_COL = 5;
const START_NODE_ROW = 5;
const END_NODE_COL = 30;
const END_NODE_ROW = 5;

class Graphs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = createGrid();
    this.setState({ grid }, () => console.log(this.state.grid));
  }

  render() {
    const { grid } = this.state;
    return (
      <>
        <MDBContainer>
          <MDBBtn color="primary">Depth First Search</MDBBtn>
          <MDBBtn color="primary">Breadth First Search</MDBBtn>
          <div className="grid">
            {grid.map((row, rowIdx) => {
              return (
                <div key={rowIdx}>
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
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
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
