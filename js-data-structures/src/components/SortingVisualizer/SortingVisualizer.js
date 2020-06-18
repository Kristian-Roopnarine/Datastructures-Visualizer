import React from "react";
import bubbleSort from "./algorithms/bubbleSort";
import quickSort from "./algorithms/quickSort";
import insertionSort from "./algorithms/insertionSort";
import heapSort from "./algorithms/heapSort";
import ArrayBars from "./ArrayBars";
import { MDBBtn } from "mdbreact";

const ARRAY_SIZE = 80;
const COMPARISON_COLOR = "red";
const DEFAULT_COLOR = "blue";
const SECONDARY_COLOR = "yellow";
class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      sorted: false,
      isSorting: false,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  animateQS = () => {
    if (this.state.sorted === false && this.state.isSorting === false) {
      this.setState({ isSorting: true });
      let sortedAnimations = quickSort(this.state.array);
      for (let i = 0; i < sortedAnimations.length; i++) {
        const arrayBar = document.getElementsByClassName("array-bar");
        const [index1, index2, swap] = sortedAnimations[i];
        const barOne = arrayBar[index1];
        const barTwo = arrayBar[index2];

        const barOneStyle = barOne.style;
        const barTwoStyle = barTwo.style;
        const doSwap = swap === 1;
        const colorChange = i % 2 === 1;

        if (colorChange === true && doSwap === true) {
          setTimeout(() => {
            const barOneHeight = barOneStyle.height;
            const barTwoHeight = barTwoStyle.height;
            barOneStyle.height = `${barTwoHeight}`;
            barTwoStyle.height = `${barOneHeight}`;
            barOneStyle.backgroundColor = COMPARISON_COLOR;
            barTwoStyle.backgroundColor = SECONDARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = DEFAULT_COLOR;
              barTwoStyle.backgroundColor = DEFAULT_COLOR;
            }, 30);
          }, i * 5);
        }
      }

      setTimeout(() => {
        this.setState({
          isSorting: false,
          sorted: true,
        });
      }, 1 * sortedAnimations.length);
    } else {
      return;
    }
  };

  animateIS = () => {
    if (this.state.sorted === false && this.state.isSorting === false) {
      this.setState({
        isSorting: true,
      });
      let sortedAnimations = insertionSort(this.state.array);
      for (let i = 0; i < sortedAnimations.length; i++) {
        const arrayBar = document.getElementsByClassName("array-bar");
        const [index1, index2] = sortedAnimations[i];
        const barOne = arrayBar[index1];
        const barTwo = arrayBar[index2];

        const barOneStyle = barOne.style;
        const barTwoStyle = barTwo.style;
        const colorChange = i % 2 === 1;

        if (colorChange === true) {
          setTimeout(() => {
            const barOneHeight = barOneStyle.height;
            const barTwoHeight = barTwoStyle.height;
            barOneStyle.height = `${barTwoHeight}`;
            barTwoStyle.height = `${barOneHeight}`;
            barOneStyle.backgroundColor = COMPARISON_COLOR;
            barTwoStyle.backgroundColor = SECONDARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = DEFAULT_COLOR;
              barTwoStyle.backgroundColor = DEFAULT_COLOR;
            }, 30);
          }, i * 5);
        }
      }
      setTimeout(() => {
        this.setState({
          isSorting: false,
          sorted: true,
        });
      }, 1 * sortedAnimations.length);
    } else {
      return;
    }
  };

  animateBS = () => {
    if (this.state.sorted === false && this.state.isSorting === false) {
      this.setState({
        isSorting: true,
      });
      let sortedAnimations = bubbleSort(this.state.array);
      for (let i = 0; i < sortedAnimations.length; i++) {
        const arrayBar = document.getElementsByClassName("array-bar");
        const [index1, index2] = sortedAnimations[i];
        const barOne = arrayBar[index1];
        const barTwo = arrayBar[index2];

        const barOneStyle = barOne.style;
        const barTwoStyle = barTwo.style;
        const colorChange = i % 2 === 1;

        if (colorChange === true) {
          setTimeout(() => {
            const barOneHeight = barOneStyle.height;
            const barTwoHeight = barTwoStyle.height;
            barOneStyle.height = `${barTwoHeight}`;
            barTwoStyle.height = `${barOneHeight}`;
            barOneStyle.backgroundColor = COMPARISON_COLOR;
            barTwoStyle.backgroundColor = SECONDARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = DEFAULT_COLOR;
              barTwoStyle.backgroundColor = DEFAULT_COLOR;
            }, 30);
          }, i * 5);
        }
      }

      setTimeout(() => {
        this.setState({
          isSorting: false,
          sorted: true,
        });
      }, 1 * sortedAnimations.length);
    } else {
      return;
    }
  };

  animateHS = () => {
    if (this.state.sorted === false && this.state.isSorting === false) {
      this.setState({
        isSorting: true,
      });
      let sortedAnimations = heapSort(this.state.array);
      console.log(sortedAnimations.length);
      for (let i = 0; i < sortedAnimations.length; i++) {
        const arrayBar = document.getElementsByClassName("array-bar");
        const [index1, index2] = sortedAnimations[i];
        const barOne = arrayBar[index1];
        const barTwo = arrayBar[index2];

        const barOneStyle = barOne.style;
        const barTwoStyle = barTwo.style;
        const colorChange = i % 2 === 1;

        if (colorChange === true) {
          setTimeout(() => {
            const barOneHeight = barOneStyle.height;
            const barTwoHeight = barTwoStyle.height;
            barOneStyle.height = `${barTwoHeight}`;
            barTwoStyle.height = `${barOneHeight}`;
            barOneStyle.backgroundColor = COMPARISON_COLOR;
            barTwoStyle.backgroundColor = SECONDARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = DEFAULT_COLOR;
              barTwoStyle.backgroundColor = DEFAULT_COLOR;
            }, 30);
          }, i * 5);
        }
      }

      setTimeout(() => {
        this.setState({
          isSorting: false,
          sorted: true,
        });
      }, 1 * sortedAnimations.length);
    } else {
      return;
    }
  };

  resetArray = () => {
    if (this.state.isSorting === false) {
      const array = [];
      for (let i = 0; i < ARRAY_SIZE; i++) {
        array.push(randomIntFromInterval(5, 400));
      }
      this.setState({ array: array, sorted: false, isSorting: false });
    } else {
      return;
    }
  };

  render() {
    return (
      <div>
        <MDBBtn color="primary" onClick={this.resetArray}>
          Create New Array
        </MDBBtn>
        <MDBBtn color="primary" onClick={this.animateQS}>
          Quick Sort the Array
        </MDBBtn>
        <MDBBtn color="primary" onClick={this.animateIS}>
          Insert Sort the Array
        </MDBBtn>
        <MDBBtn color="primary" onClick={this.animateBS}>
          Bubble Sort the Array
        </MDBBtn>
        <MDBBtn color="primary" onClick={this.animateHS}>
          Heap Sort the Array
        </MDBBtn>
        <ArrayBars array={this.state.array} />
      </div>
    );
  }
}

export default SortingVisualizer;

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
