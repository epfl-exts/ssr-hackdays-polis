import React, { Component } from 'react';
import Downshift from 'downshift';

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.handleSelectorChange = this.handleSelectorChange.bind(this);
  }

  handleSelectorChange(selection) {
    this.props.onSelectorChange(selection);
  }

  render() {
    const items = this.props.data.map(a => a.vote);

    return (
      <Downshift
        onChange={this.handleSelectorChange}
        render={({
          getInputProps,
          getItemProps,
          getLabelProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
        }) => (
            <fieldset>
              <legend {...getLabelProps()}>Select a vote</legend>
              <input {...getInputProps()} />
              {isOpen ? (
                <div>
                  {items
                    .filter(i => !inputValue || i.includes(inputValue))
                    .map((item, index) => (
                      <div
                        {...getItemProps({
                          key: index,
                          index,
                          item,
                          style: {
                            backgroundColor: highlightedIndex === index
                              ? 'lightgray'
                              : 'white',
                            fontWeight: selectedItem === item
                              ? 'bold'
                              : 'normal',
                          },
                        })}
                      >
                        {item}
                      </div>
                    ))}
                </div>
              ) : null}
            </fieldset>
          )}
      />
    );
  }
}

export default Autocomplete;