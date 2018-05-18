import React, { Component } from 'react';
import { Consumer } from './context-app';

import Cartogram from './Cartogram';

class CartogramContainer extends Component {
    render() {
        const cartogramHeight = 675;
        const cartogramWidth = 840;

        return (
            <React.Fragment>
                {/* <fieldset>
                    <legend>Options</legend>
                    <div className="option-group" onChange={this.handleOptionChange.bind(this)}>
                        <label>
                            Map
                            <input
                                name="map"
                                type="radio"
                                value={true}
                                defaultChecked
                            />
                        </label>
                        <label>
                            Cartogram
                            <input
                                name="map"
                                type="radio"
                                value={false}
                            />
                        </label>
                    </div>
                </fieldset> */}
                <figure>
                    <Consumer>
                        { selection => (
                            <Cartogram selection={selection} height={cartogramHeight} width={cartogramWidth} colors={{
                                blue: '#2677bb',
                                green: '#007500',
                                grey: '#a5a6a9',
                                red: '#db2f27',
                                orange: '#f67944',
                                darkGrey: '#0b3536'
                            }} />
                        )}
                    </Consumer>
                </figure>
            </React.Fragment>
        );
    }
}

export default CartogramContainer;