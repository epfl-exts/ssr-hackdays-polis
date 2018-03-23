import React, { Component } from 'react';

class Cartogram extends Component {
  constructor(props) {
    super(props);

    this.results = null;

    this.cantons = {
      sh: {
        x: 510,
        y: 0
      },
      ju: {
        x: 165,
        y: 115
      },
      bs: {
        polygon: true,
        points: [{ x: 280, y: 115 }, { x: 372.5, y: 115 }, { x: 280, y: 207.5 }]
      },
      bl: {
        polygon: true,
        points: [{ x: 380, y: 122.5 }, { x: 380, y: 215 }, { x: 287.5, y: 215 }]
      },
      ag: {
        x: 395,
        y: 115
      },
      zh: {
        x: 510,
        y: 115
      },
      tg: {
        x: 625,
        y: 115
      },
      ar: {
        polygon: true,
        points: [{ x: 740, y: 172.5 }, { x: 832.5, y: 172.5 }, { x: 740, y: 265 }]
      },
      ai: {
        polygon: true,
        points: [{ x: 747.5, y: 272.5 }, { x: 840, y: 272.5 }, { x: 840, y: 180 }]
      },
      ne: {
        x: 165,
        y: 230
      },
      so: {
        x: 280,
        y: 230
      },
      lu: {
        x: 395,
        y: 230
      },
      zg: {
        x: 510,
        y: 230
      },
      sg: {
        x: 625,
        y: 230
      },
      vd: {
        x: 50,
        y: 345
      },
      fr: {
        x: 165,
        y: 345
      },
      be: {
        x: 280,
        y: 345
      },
      ow: {
        polygon: true,
        points: [{ x: 395, y: 345 }, { x: 487.5, y: 345 }, { x: 395, y: 437.5 }]
      },
      nw: {
        polygon: true,
        points: [{ x: 402.5, y: 445 }, { x: 495, y: 352.5 }, { x: 495, y: 445 }]
      },
      sz: {
        x: 510,
        y: 345
      },
      gl: {
        x: 625,
        y: 345
      },
      gr: {
        x: 740,
        y: 345
      },
      ge: {
        x: 0,
        y: 460
      },
      vs: {
        x: 222.5,
        y: 460
      },
      ur: {
        x: 510,
        y: 460
      },
      ti: {
        x: 510,
        y: 575
      }
    };
  }

  componentWillMount() {
    this.canvas = document.createElement('canvas');
    this.canvas.width  = 840;
    this.canvas.height = 675;
  }

  componentDidMount() {
    this.canvasContainer.appendChild(this.canvas);
  }

  updateCanvas() {
    let ctx = this.canvas.getContext("2d");
    let yes;
    let no;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clears the canvas

    for (let cantonCode in this.cantons) {
        const canton = this.cantons[cantonCode];
        const stroke = '#333333';

        let x;
        let y;
        let fill = '#a5a6a9'; // set default
        let alpha = 1; // set default

        if (this.results && this.results.find(x => x.canton === cantonCode.toUpperCase())) {
          const result = this.results.find(x => x.canton === cantonCode.toUpperCase());

          yes = result.yes;
          no = result.no;

          if (yes > no) {
              fill = '#007500';
              alpha = (yes / 100);
          } else {
              fill = '#db2f27';
              alpha = (no / 100);
          }
        }

        ctx.beginPath();

        if (!canton.polygon) {
          x = canton.x;
          y = canton.y;

          ctx.rect(x, y, 100, 100);
        } else {
          for(let i= 0; i < canton.points.length; i++) {
            const point = canton.points[i];
            const x = point.x;
            const y = point.y;

            if (i === 0) {
              ctx.moveTo(x,y);
            } else {
              ctx.lineTo(x,y);
            }
          }

          ctx.closePath();
        }

        ctx.globalAlpha = alpha;

        ctx.fillStyle= fill;
        ctx.fill();

        ctx.strokeStyle= stroke;
        ctx.stroke();
    }
  }

  render() {
    this.results = this.props.results ? this.props.results : null;

    this.updateCanvas();

    return (
        <div ref={canvasContainer => this.canvasContainer=canvasContainer}></div>
    );
  }
}

export default Cartogram;
