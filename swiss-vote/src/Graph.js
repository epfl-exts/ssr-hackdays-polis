import React, { Component } from 'react';
import { Consumer } from './context-app';

import Legend from './Legend';
import Chart from './Chart';

class Graph extends Component {
    render() {
        return (
            <Consumer>
                {appState => (
                    <figure>
                        <Legend
                            height={30}
                            width={840}
                            colors={appState.colors}
                        />
                        <Chart
                            selection={appState.selection}
                            colors={appState.colors}
                        />
                        <figcaption className="sr-only">Graph</figcaption>
                    </figure>
                )}
            </Consumer>
        )
    }
}

export default Graph;