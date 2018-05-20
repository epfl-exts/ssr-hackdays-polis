import React, { Component } from 'react';

class Cartogram extends Component {
    constructor(props) {
        super(props);

        this.width = this.props.width;
        this.height = this.props.height;
        this.colors = this.props.colors;
    }

    componentDidMount() {
        const ctx = this.canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, this.width, 0);

        ctx.font = '16px Helvetica';
        ctx.fillText('Strong yes', 0, 26);
        ctx.textAlign = 'right';
        ctx.fillText('Strong no', 840, 26);
        
        gradient.addColorStop(0, this.colors.green);
        gradient.addColorStop(.25, this.colors.white);
        gradient.addColorStop(.75, this.colors.white);
        gradient.addColorStop(1, this.colors.red);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.width, 10);
    }

    render() {
        return (
            <canvas ref={canvas => this.canvas = canvas} width={this.width} height={this.height}></canvas>
        );
    }
}

export default Cartogram;