import React, { Component } from 'react';

import shapes from './shapes.js';

class Cartogram extends Component {
  componentDidMount() {
    this.initDrawing();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.results !== nextProps.results) {
      this.setState({
        results: nextProps.results
      });
    }
  }

  componentDidUpdate() {
    this.initDrawing();
  }

  getStyle(shape) {
    let alpha;
    let fill;

    // Check yes and no results
    const selection = this.props.selection;

    if (selection && selection.results.find(x => x.canton === shape.code.toUpperCase())) {
      const results = selection.results;

      const result = results.find(x => x.canton === shape.code.toUpperCase());
      const yes = result.yes;
      const no = result.no;

      if (yes > no) {
        fill = this.props.colors.green;
        alpha = (yes / (yes + no));
      } else {
        fill = this.props.colors.red;
        alpha = (no / (yes + no));
      }
    } else {
      fill = shape.fill; // set default
      alpha = 1; // set default
    }

    return {
      alpha: alpha,
      fill: fill,
      stroke: this.props.colors.darkGrey,
      strokeWidth: 2
    }
  }

  drawPath(d, options) {
    const path = new Path2D(d);

    this.fillStyle = options.fill;
    this.fill(path);
    this.stroke(path);
  }

  drawRect(x, y, width, height, options) {
    this.beginPath();
    this.fillStyle = options.fill;
    this.rect(x, y, width, height);
    this.fill();
    this.stroke();
  }

  drawPoly(points, options) {
    this.beginPath();
    this.moveTo(points[0][0], points[0][1]);
    this.lineTo(points[1][0], points[1][1]);
    this.lineTo(points[2][0], points[2][1]);
    this.closePath();
    this.fillStyle = options.fill;
    this.fill();
    this.stroke();
  }

  drawLabel(code, x, y, width, color) {
    this.font = '24px Helvetica';
    this.textAlign = 'center';
    this.textBaseline = 'middle';
    this.fillStyle = color;
    this.globalAlpha = 1;
    this.fillText(code, (x + (width / 2)), (y + (width / 2)));
  }

  drawShape(ctx, i) {
    const shape = shapes[i],
      x = shape.x,
      y = shape.y,
      type = shape.type,
      points = shape.points,
      path = shape.path,
      width = 100,
      style = this.getStyle(shape);

    let drawRect = this.drawRect.bind(ctx),
      drawPoly = this.drawPoly.bind(ctx),
      drawPath = this.drawPath.bind(ctx),
      drawLabel = this.drawLabel.bind(ctx);

    ctx.globalAlpha = style.alpha; // this was originally here to set for both rough an regular. Maybe now it should be moved

    if (!this.props.map) {
      switch (type) {
        case 'polygon':
          drawPoly(points, style);
          break;
        case 'rectangle':
          drawRect(x, y, width, 50, { alpha: 1, fill: this.props.colors.blue, stroke: null, strokeWidth: null });
          break;
        default:
          drawRect(x, y, width, 100, style);
      }

      drawLabel(shape.code, x, y, width, this.props.colors.darkGrey);
    } else {
      drawPath(path, style);
    }
  }

  initDrawing() {
    const ctx = this.canvas.getContext('2d'),
      mapTopOffset = (this.props.cartogramHeight - this.props.cartogramHeight) / 2;

    if (this.props.map) {
      ctx.translate(0, - mapTopOffset);
    }

    ctx.clearRect(0, 0, this.props.width, this.props.height);

    for (let i = 0; i < shapes.length; i++) {
      this.drawShape(ctx, i);
    }

    if (this.props.map) {
      ctx.translate(0, mapTopOffset);
    }
  }

  render() {
    return <canvas ref={canvas => this.canvas = canvas} width={this.props.width} height={this.props.height}></canvas>
  }
}

export default Cartogram;