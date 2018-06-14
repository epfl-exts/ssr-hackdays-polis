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
              <legend {...getLabelProps()}>Select a vote from the list below.</legend>
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
                            color: highlightedIndex === index
                              ? '#fbfbfb' // off-white
                              : '#0b3536', // dark-grey
                            backgroundColor: highlightedIndex === index
                              ? '#0098d8' // power-blue
                              : '#fbfbfb', // off-white
                            fontWeight: selectedItem === item
                              ? 'bold'
                              : 'normal',
                            maxWidth: '570px', // line-it-up with the text above
                            padding: '5px 15px'
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