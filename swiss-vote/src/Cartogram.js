import React, { Component } from 'react';

import shapes from './shapes.js';

class Cartogram extends Component {
  constructor(props) {
    super(props);
    this.display = this.props.display;
    this.selection = this.props.selection;
    this.height = this.props.height;
    this.width = this.props.width;
    this.colors = this.props.colors;
  }

  componentDidMount() {
    this.draw(this.selection);
  }

  componentWillReceiveProps({ display, selection, height }) {
    if (this.display !== display) {
      this.display = display;
    }
    if (this.selection !== selection) {
      this.selection = selection;
    }
    if (this.height !== height) {
      this.height = height;
    }
  }

  componentDidUpdate() {
    this.draw(this.selection);
  }

  drawPath({ fill, d }) {
    const path = new Path2D(d);
    this.fillStyle = fill;
    this.fill(path);
    this.stroke(path);
  }

  drawRect({ height, fill, x, y }) {
    this.beginPath();
    this.fillStyle = fill;
    this.rect(x, y, 100, height);
    this.fill();
    this.stroke();
  }

  drawPoly({ points, fill }) {
    this.beginPath();
    this.moveTo(points[0][0], points[0][1]);
    this.lineTo(points[1][0], points[1][1]);
    this.lineTo(points[2][0], points[2][1]);
    this.closePath();
    this.fillStyle = fill;
    this.fill();
    this.stroke();
  }

  drawLabel(canton, specs, fill) {
    this.font = '24px Helvetica';
    this.textAlign = 'center';
    this.textBaseline = 'middle';
    this.fillStyle = fill;
    this.globalAlpha = 1;
    this.fillText(canton, (specs.x + (100 / 2)), (specs.y + (100 / 2)));
  }

  getSpecs(shapeObject, result) {
    const specs = {
      type: shapeObject.type,
      d: shapeObject.path, // svg path data
      points: shapeObject.points,
      height: shapeObject.height ? shapeObject.height : 100,
      x: shapeObject.x,
      y: shapeObject.y,
      fill: shapeObject.fill,
      alpha: 1,
      yes: null,
      no: null
    };

    if (result) {
      const yes = result.yes;
      const no = result.no;

      if (yes > no) {
        specs.fill = this.colors.green;
        specs.alpha = (yes / (yes + no));
      } else {
        specs.fill = this.colors.red;
        specs.alpha = (no / (yes + no));
      }
    }

    return specs
  }

  draw(selection) {
    const ctx = this.canvas.getContext('2d');
    const drawPath = this.drawPath.bind(ctx);
    const drawRect = this.drawRect.bind(ctx);
    const drawPoly = this.drawPoly.bind(ctx);
    const drawLabel = this.drawLabel.bind(ctx);
    const results = selection ? selection.results : null;

    ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < shapes.length; i++) {
      const canton = shapes[i].canton; // get the canton code from the shapes array
      const result = results ? results.find(x => x.canton === canton) : null; // get the results that correspond to the canton code
      const specs = this.getSpecs(shapes[i], result); // { path, points, yes, no, fill, alpha }

      ctx.globalAlpha = specs.alpha;

      switch (this.display) {
        case 'cartogram':
          switch (specs.type) {
            case 'polygon':
              drawPoly(specs);
              break;
            default:
              drawRect(specs);
          }
          drawLabel(canton, specs, this.colors.darkGrey);
          break;
        default:
          drawPath(specs);
      }
    }
  }

  render() {
    return <canvas ref={canvas => this.canvas = canvas} width={this.width} height={this.height}></canvas>
  }
}

export default Cartogram;