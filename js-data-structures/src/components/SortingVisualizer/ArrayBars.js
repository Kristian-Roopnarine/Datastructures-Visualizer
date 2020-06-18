import React from "react";
import "./SortingVisualizer.css";

const DEFAULT_COLOR = "blue";

export default class ArrayBars extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="container mt-5">
          {this.props.array.map((value, idx) => (
            <div
              className="array-bar"
              key={`${idx}-${value}`}
              style={{
                height: `${value}px`,
                backgroundColor: `${DEFAULT_COLOR}`,
              }}
            ></div>
          ))}
        </div>
      </>
    );
  }
}
