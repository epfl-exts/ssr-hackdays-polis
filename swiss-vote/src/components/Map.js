import React, { Component } from "react";
import { drawCanvas } from "../helpers";

function ResultsTable(props) {
  return (
    <table>
      <caption>{props.vote}</caption>
      <thead>
        <tr>
          <th>Canton</th>
          <th>Yes</th>
          <th>No</th>
        </tr>
      </thead>
      <tbody>
        {props.results &&
          props.results.map(result => {
            return (
              <tr key={result.canton}>
                <td>{result.canton}</td>
                <td>{result.yes}</td>
                <td>{result.no}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

// function Map(props) {
//   const canvas = React.createElement(
//     "canvas",
//     { height: 538, width: 840 },
//     React.createElement(ResultsTable, {
//       description: props.description,
//       results: props.results
//     })
//   );

//   return canvas;
// }

// function Map(props) {
//   const canvas = React.createElement(
//     "canvas",
//     { height: 538, width: 840 },
//     <ResultsTable description={props.description} results={props.results} />
//   );

//   return canvas;
// }

class Map extends Component {
  componentDidMount() {
    this.ctx = this.refs.canvas.getContext("2d"); // Defines the canvas context: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    drawCanvas(this.ctx, this.props.results); // This helper function receives the canvas context, as well as the results, and uses these to draw the result map
  }

  componentDidUpdate() {
    this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height); // Clears the previously drawn map from the canvas
    drawCanvas(this.ctx, this.props.results);
  }

  render() {
    const canvas = React.createElement(
      "canvas",
      { height: 538, width: 840, ref: "canvas" },
      React.createElement(ResultsTable, {
        description: this.props.description,
        results: this.props.results
      })
    );

    return canvas;
  }
}

// class Map extends Component {
//   componentDidMount() {
//     this.ctx = this.refs.canvas.getContext("2d");
//     drawCanvas(this.ctx, this.props.results);
//   }

//   componentDidUpdate() {
//     this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);
//     drawCanvas(this.ctx, this.props.results);
//   }

//   render() {
//     const canvas = React.createElement(
//       "canvas",
//       { height: 538, width: 840, ref: "canvas" },
//       <ResultsTable description={this.props.description} results={this.props.results} />
//     );

//     return canvas;
//   }
// }

// class Map extends Component {
//   componentDidMount() {
//     this.ctx = this.refs.canvas.getContext("2d");
//     drawCanvas(this.ctx, this.props.results);
//   }

//   componentDidUpdate() {
//     this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);
//     drawCanvas(this.ctx, this.props.results);
//   }

//   render() {
//     return (
//       <canvas height={538} width={840} ref="canvas">
//         <ResultsTable
//           description={this.props.description}
//           results={this.props.results}
//         />
//       </canvas>
//     );
//   }
// }

export { Map, ResultsTable };
