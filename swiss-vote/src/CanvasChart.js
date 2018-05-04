import React, { Component } from 'react';

import Chart from 'chart.js';

class CanvasChart extends Component {
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
        this.canvas.width = 840;
        this.canvas.height = 420;
        this.ctx = this.canvas.getContext('2d');
        this.chart = null;

        this.state = {
            labels: ['ow', 'nw', 'zg', 'lu', 'ag', 'bl', 'vs', 'be', 'so', 'ju', 'vd', 'fr', 'bs', 'ge', 'ne', 'gr', 'sg', 'sz', 'ai', 'ar', 'tg', 'zh', 'sh', 'gl', 'ur', 'ti'].sort(),
            datasets: []
        };
    }

    componentWillMount() {
        this.initDrawing();
    }

    componentDidMount() {
        this.canvasContainer.appendChild(this.canvas);
    }

    compareValues(key, order='asc') {
        // https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
        return function(a, b) {
            if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
                return 0; 
            }
        
            const varA = (typeof a[key] === 'string') ? 
            a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string') ? 
            b[key].toUpperCase() : b[key];
        
            let comparison = 0;
            if (varA > varB) {
            comparison = 1;
            } else if (varA < varB) {
            comparison = -1;
            }
            
            return (
            (order === 'desc') ? (comparison * -1) : comparison
            );
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.results !== nextProps.results) {
            const results = nextProps.results;

            let labels = [],
                dataset = {
                    label: 'Strength of results by canton',
                    data: [],
                    backgroundColor: [],
                    borderColor: this.colors.darkGrey,
                    borderWidth: 1
                },
                datasetData = [];

            for (let i = 0; i < results.length; i++) {
                const result = results[i],
                      total = result.yes + result.no,
                      percentageYes = result.yes / total,
                      percentageNo = result.no / total,
                      score = percentageYes - percentageNo;
                 
                if (score >= 0) {
                    datasetData.push({
                        backgroundColor: this.colors.green,
                        label: result.canton,
                        score: score,
                        percentageYes: percentageYes,
                        percentageNo: percentageNo
                    });
                } else {
                    datasetData.push({
                        backgroundColor: this.colors.red,
                        label: result.canton,
                        score: score,
                        percentageYes: percentageYes,
                        percentageNo: percentageNo
                    });
                }
            }

            datasetData.sort(this.compareValues('score', 'desc'));

            for (let i = 0; i < datasetData.length; i++) {
                labels.push(datasetData[i].label);
                dataset.data.push(datasetData[i].score);
                dataset.backgroundColor.push(datasetData[i].backgroundColor);
            }

            this.setState({
                labels: labels,
                datasets: [dataset]
            });
        }
    }

    componentDidUpdate() {
        this.chart.destroy();
        this.initDrawing();
    }

    initDrawing() {
        this.chart = new Chart(this.ctx, {
            type: 'bar',
            data: {
                labels: this.state.labels,
                datasets: this.state.datasets
            },
            options: {
                legend: {
                    display: false
                 },
                 tooltips: {
                    enabled: false
                 },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Canton'
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Strength of yes / no vote'
                        },
                        gridLines : {
                            display : false
                        },
                        ticks: {
                            display: false
                        }
                    }]
                }
            }
        });
    }

    render() {
        return (
            <div ref={canvasContainer => this.canvasContainer = canvasContainer}></div>
        );
    }
}

export default CanvasChart;