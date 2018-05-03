import React, { Component } from 'react';

import shapes from './shapes.js';

class Cartogram extends Component {
  constructor(props) {
    super(props);

    this.colors = {
      blue: '#2677bb',
      green: '#007500',
      grey: '#a5a6a9',
      red: '#db2f27',
      orange: '#f67944',
      darkGrey: '#0b3536'
    }

    this.canvas = document.createElement('canvas');
    this.canvas.width  = 840;
    this.canvas.height = 675;

    this.state = {
      results: null
    };    
  }

  componentWillMount() {
    this.initDrawing();
  }

  componentDidMount() {
    this.canvasContainer.appendChild(this.canvas);
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
    if (this.state.results && this.state.results.find(x => x.canton === shape.code.toUpperCase())) {
      const result = this.state.results.find(x => x.canton === shape.code.toUpperCase());
      const yes = result.yes;
      const no = result.no;

      if (yes > no) {
        fill = this.colors.green;
        alpha = (yes / (yes + no));
      } else {
        fill = this.colors.red;
        alpha = (no / (yes + no));
      }
    } else {
      fill = shape.fill; // set default
      alpha = 1; // set default
    }

    return {
      alpha: alpha,
      fill: fill,
      stroke: this.colors.darkGrey,
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
    this.moveTo(points[0][0],points[0][1]);
    this.lineTo(points[1][0],points[1][1]);
    this.lineTo(points[2][0],points[2][1]);
    this.closePath();
    this.fillStyle = options.fill;
    this.fill();
    this.stroke();
  }

  drawLabel(code, x , y, width, color) {
    this.font = '24px Helvetica';
    this.textAlign = 'center'; 
    this.textBaseline = 'middle';
    this.fillStyle = color;
    this.globalAlpha = 1;
    this.fillText(code, (x + (width / 2)), (y + (width / 2)));
  }

  initDrawing() {
    const ctx = this.canvas.getContext('2d');

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < shapes.length; i++) {
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
            drawRect(x, y, width, 50, { alpha: 1, fill: this.colors.blue, stroke: null, strokeWidth: null });
            break;
          default:
            drawRect(x, y, width, 100, style);
        }

        drawLabel(shape.code, x, y, width, this.colors.darkGrey);
      } else {
        drawPath(path, style);
      }
    }
  }

  render() {
    return (
      <div ref={canvasContainer => this.canvasContainer=canvasContainer}></div>
    );
  }
}

export default Cartogram;