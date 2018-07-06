import React, { Component } from "react";
import { drawCanvas } from "../helpers";

function FallbackTable(props) {
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
        {props.results && props.results.map(result => {
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

let ctx = null;

class Map extends Component {
  componentDidMount() {
    ctx = this.refs.canvas.getContext("2d"); // Defines the canvas context: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    drawCanvas(ctx, this.props.results); // This helper function receives the canvas context, as well as the results, and uses these to draw the result map
  }

  componentDidUpdate() {
    ctx.clearRect(0, 0, ctx.width, ctx.height); // Clears the previously drawn map from the canvas
    drawCanvas(ctx, this.props.results);
  }

  render() {
    return (
      <canvas ref="canvas" width={840} height={538}>
        <FallbackTable description={this.props.description} results={this.props.results} />
      </canvas>
    );
  }
}

export default Map;
