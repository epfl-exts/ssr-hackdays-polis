import React, { Component } from 'react';
import { Consumer } from './context-app';

import Cartogram from './Cartogram';

class CartogramContainer extends Component {
    constructor(props) {
        super(props);
        this.handleDisplayChange = this.handleDisplayChange.bind(this);
    }

    handleDisplayChange(e) {
        this.props.onDisplayChange(e.target.value);
    }

    render() {
        const cartogramWidth = 840;
        const cartogramHeight = 675;
        const mapHeight = 538;

        return (
            <React.Fragment>
                <fieldset>
                    <legend>Options</legend>
                    <div className="option-group" onChange={this.handleDisplayChange}>
                        <label>
                            Map
                            <input
                                name="display"
                                type="radio"
                                value="map"
                                defaultChecked
                            />
                        </label>
                        <label>
                            Cartogram
                            <input
                                name="display"
                                type="radio"
                                value="cartogram"
                            />
                        </label>
                    </div>
                </fieldset>
                <figure>
                    <Consumer>
                        {appState => (
                            <Cartogram
                                display={appState.display}
                                selection={appState.selection}
                                height={appState.display === 'map' ? mapHeight : cartogramHeight}
                                width={cartogramWidth}
                                colors={appState.colors}
                                offsetTop={appState.display === 'map' ? ((cartogramHeight - mapHeight)/2) : null}
                            />
                        )}
                    </Consumer>
                    <figcaption className="sr-only">Cartogram</figcaption>
                </figure>
            </React.Fragment>
        );
    }
}

export default CartogramContainer;