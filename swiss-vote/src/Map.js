import React, { Component } from "react";
import Table from "./Table";
import { drawCanvas } from "./helpers";

let ctx = null;

class Map extends Component {
  componentDidMount() {
    ctx = this.refs.canvas.getContext('2d');
    drawCanvas(ctx, this.props.selection);
  }

  componentDidUpdate() {
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    drawCanvas(ctx, this.props.selection);
  }

  render() {
    return (
      <canvas ref="canvas" width={840} height={675}>
        <Table />
      </canvas>
    );
  }
}

export default Map;
