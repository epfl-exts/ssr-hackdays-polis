import React, { Component } from 'react';

import shapes from './shapes.js';

class Cartogram extends Component {
    constructor(props) {
        super(props);

        this.colors = {
            green: '#007500',
            grey: '#a5a6a9',
            red: '#db2f27',
            darkGrey: '#0b3536'
        }

        this.canvas = document.createElement('canvas');
        this.canvas.width = 840;
        this.canvas.height = 30;
    }

    componentWillMount() {
        const ctx = this.canvas.getContext('2d'),
              gradient = ctx.createLinearGradient(0, 0, 840, 0);

        ctx.font = '16px Helvetica';
        ctx.fillText('Strong yes', 0, 26);
        ctx.textAlign = 'right';
        ctx.fillText('Strong no', 840, 26);
        
        gradient.addColorStop(0, this.colors.green);
        gradient.addColorStop(.25, '#ffffff');
        gradient.addColorStop(.75, '#ffffff');
        gradient.addColorStop(1, this.colors.red);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 840, 10);
    }

    componentDidMount() {
        this.canvasContainer.appendChild(this.canvas);
    }    

    render() {
        return (
            <div ref={canvasContainer => this.canvasContainer = canvasContainer}></div>
        );
    }
}

export default Cartogram;