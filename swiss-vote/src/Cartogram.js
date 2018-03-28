import React, { Component } from 'react';
import Rough from 'roughjs'

class Cartogram extends Component {
  constructor(props) {
    super(props);

    this.results = null;

    this.colors = {
      blue: '#2677bb',
      green: '#007500',
      grey: '#a5a6a9',
      red: '#db2f27',
      orange: '#f67944',
      darkGrey: '#0b3536'
    }

    this.shapes = [
      {
        code: 'sh',
        x: 510,
        y: 0
      },
      {
        code: 'ju',
        x: 165,
        y: 115
      },
      {
        code: 'bs',
        type: 'polygon',
        points: [[280, 115], [372.5, 115], [280, 207.5]]
      },
      {
        code: 'bl',
        type: 'polygon',
        points: [[380, 122.5], [380, 215], [287.5, 215]]
      },
      {
        code: 'ag',
        x: 395,
        y: 115
      },
      {
        code: 'zh',
        x: 510,
        y: 115
      },
      {
        code: 'tg',
        x: 625,
        y: 115
      },
      {
        code: 'ar',
        type: 'polygon',
        points: [[740, 172.5], [832.5, 172.5], [740, 265]]
      },
      {
        code: 'ai',
        type: 'polygon',
        points: [[747.5, 272.5], [840, 272.5], [840, 180]]
      },
      {
        code: 'ne',
        x: 165,
        y: 230
      },
      {
        code: 'so',
        x: 280,
        y: 230
      },
      {
        code: 'lu',
        x: 395,
        y: 230
      },
      {
        code: 'zg',
        x: 510,
        y: 230
      },
      {
        code: 'sg',
        x: 625,
        y: 230
      },
      {
        code: 'vd',
        x: 50,
        y: 345
      },
      {
        code: 'fr',
        x: 165,
        y: 345
      },
      {
        code: 'be',
        x: 280,
        y: 345
      },
      {
        code: 'ow',
        type: 'polygon',
        points: [[395, 345], [487.5, 345], [395, 437.5]]
      },
      {
        code: 'nw',
        type: 'polygon',
        points: [[402.5, 445], [495, 352.5], [495, 445]]
      },
      {
        code: 'sz',
        x: 510,
        y: 345
      },
      {
        code: 'gl',
        x: 625,
        y: 345
      },
      {
        code: 'gr',
        x: 740,
        y: 345
      },
      {
        code: 'ge',
        x: 0,
        y: 460
      },
      {
        code: 'vs',
        x: 222.5,
        y: 460
      },
      {
        code: 'ur',
        x: 510,
        y: 460
      },
      {
        code: 'ti',
        x: 510,
        y: 575
      },
      {
        code: 'leman',
        type: 'rectangle',
        x: 115,
        y: 460
      },
      {
        code: 'bodensee',
        type: 'rectangle',
        x: 625,
        y: 50
      }
    ];
  }

  componentWillMount() {
    this.canvas = document.createElement('canvas');
    this.canvas.width  = 840;
    this.canvas.height = 675;
  }

  componentDidMount() {
    this.canvasContainer.appendChild(this.canvas);
  }

  getOptions(shape) {
    let alpha;
    let fill;

    if (this.results && this.results.find(x => x.canton === shape.code.toUpperCase())) {
      const result = this.results.find(x => x.canton === shape.code.toUpperCase());
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
      fill = this.colors.grey; // set default
      alpha = 1; // set default
    }

    return {
      alpha: alpha,
      bowing: 7,
      roughness: .5,
      fill: fill,
      fillStyle: 'solid',
      stroke: this.colors.darkGrey,
      strokeWidth: 2
    }
  }

  drawRect(x, y, width, height, options) {
    this.beginPath();
    this.fillStyle= options.fill;
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
    this.fillStyle= options.fill;
    this.fill();
    this.stroke();
  }

  initDrawing() {
    const ctx = this.canvas.getContext('2d');
    const rc = Rough.canvas(this.canvas);

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.shapes.length; i++) {
      const shape = this.shapes[i];
      const x = shape.x;
      const y = shape.y;
      const type = shape.type;
      const points = shape.points;
      const width = 100;
      const options = this.getOptions(shape);

      let drawRect;
      let drawPoly;

      ctx.globalAlpha = options.alpha; // set this here for both rough and regular

      switch (this.props.canvas) {
        case 'rough':
          drawRect = rc.rectangle.bind(rc);
          drawPoly = rc.polygon.bind(rc);
        break;
        default:
          drawRect = this.drawRect.bind(ctx);
          drawPoly = this.drawPoly.bind(ctx);
      }

      switch (type) {
        case 'polygon':
          drawPoly(points, options);
          break;
        case 'rectangle':
          drawRect(x, y, width, 50, { alpha: 1, fill: this.colors.blue, stroke: null, strokeWidth: null });
          break;
        default:
          drawRect(x, y, width, 100, options);
      }
    }
  }

  render() {
    this.results = this.props.results ? this.props.results : null;
    this.initDrawing();

    return (
      <div ref={canvasContainer => this.canvasContainer=canvasContainer}></div>
    );
  }
}

export default Cartogram;
