import React from "react";
import "./GraphNodes.css";

class GraphNodes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      col,
      row,
      isStart,
      isEnd,
      isVisited,
      isWall,
      previousNode,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      onMoveStart,
    } = this.props;

    const extraClass = isEnd
      ? "node-end"
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : "";
    return (
      <div
        id={`node-${row}-${col}`}
        style={{ margin: "0px", padding: "0px" }}
        className={`node ${extraClass}`}
        onMouseDown={
          isStart ? () => onMoveStart(row, col) : () => onMouseDown(row, col)
        }
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      ></div>
    );
  }
}

export default GraphNodes;
