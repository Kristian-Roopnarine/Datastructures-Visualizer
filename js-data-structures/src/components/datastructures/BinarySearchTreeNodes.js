import React from "react";

class BinarySearchTreeNodes extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    x: null,
    y: null,
    r: null,
    stroke: "blue",
    node: null,
    nodeValue: null,
  };

  componentDidMount() {
    const { x, y, r, stroke, node } = this.props;
    this.setState({
      x,
      y,
      r,
      stroke,
      node,
      nodeValue: node.val,
    });
  }

  changeColor = () => {
    this.setState({
      ...this.state,
      stroke: "green",
    });
  };

  renderLine() {
    if (this.props.node.parent !== null) {
      return (
        <line
          x1={this.props.node.parent.x}
          y1={this.props.node.parent.y + this.state.r}
          x2={this.props.node.x}
          y2={this.props.node.y}
          style={{ stroke: "3dd3ae", strokeWidth: 2 }}
        />
      );
    }
  }

  // implement depth first search
  // if node is visited, then change color to something else

  // if current node being checked or in queue, do different color

  // different elements added or traversed

  render() {
    return (
      <>
        {this.renderLine()}

        <circle
          cx={this.props.x}
          cy={this.props.y}
          r={this.props.r}
          stroke={this.props.stroke}
          fill="white"
        ></circle>
        <text
          x={this.props.x}
          y={this.props.y}
          textAnchor="middle"
          stroke={this.props.stroke}
        >
          {this.props.nodeValue}
        </text>
      </>
    );
  }
}

export default BinarySearchTreeNodes;
