import React, { Component } from 'react';

import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

class Chart extends Component {
    constructor(props) {
        super(props);

        this.colors = this.props.colors;
        this.results = [];
    }

    componentWillReceiveProps({ selection }) {
        if (selection && (this.results !== selection.results)) {
            for (let i = 0; i < selection.results.length; i++) {
                const { canton, yes, no } = selection.results[i];
                const total = yes + no;
                const percentageYes = yes / total;
                const percentageNo = no / total;
                const score = percentageYes - percentageNo;

                let fill = null;

                if (score >= 0) {
                    fill = this.colors.red;
                } else {
                    fill = this.colors.green;
                }

                this.results.push({ canton, yes, no, score, fill });
            }
        }
    }

    render() {
        return (
            <VictoryChart
                theme={VictoryTheme.material}
            >
                <VictoryAxis
                    tickFormat={this.results.map(a => a.canton)}
                    orientation="bottom"
                />
                <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => (`${x * 100}%`)}
                />
                <VictoryBar
                    style={{
                        data: {
                            fill: this.results.map(a => a.fill)
                        }
                    }}
                    data={this.results}
                    x="canton"
                    y="score"
                    sortKey="y"
                    sortOrder="descending"
                />
            </VictoryChart>
        );
    }
}

export default Chart;