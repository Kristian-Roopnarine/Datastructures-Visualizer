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
    } = this.props;

    const extraClass = isEnd ? "node-end" : isStart ? "node-start" : "";
    return (
      <div id={`node-${row}-${col}`} className={`node ${extraClass}`}></div>
    );
  }
}

export default GraphNodes;
