import React, { Component } from "react";
import Downshift from "downshift";

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.handleSelectorChange = this.handleSelectorChange.bind(this);
  }

  handleSelectorChange(selection) {
    this.props.onSelectorChange(selection);
  }

  render() {
    return (
      <Downshift
        onChange={this.handleSelectorChange}
        itemToString={item => (item ? item.vote : "")}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem
        }) => (
          <fieldset>
            <label {...getLabelProps()}>
              Select a vote from the box below.
            </label>
            <input {...getInputProps()} />
            <ul>
              {isOpen
                ? this.props.voteResults
                    .filter(
                      item => !inputValue || item.vote.includes(inputValue)
                    )
                    .map((item, index) => (
                      <li
                        {...getItemProps({
                          key: `result-${index}`,
                          index,
                          item,
                          style: {
                            color:
                              highlightedIndex === index
                                ? "#fbfbfb" // off-white
                                : "#0b3536", // dark-grey
                            backgroundColor:
                              highlightedIndex === index
                                ? "#0098d8" // power-blue
                                : "#fbfbfb", // off-white
                            fontWeight:
                              selectedItem === item ? "bold" : "normal",
                            maxWidth: "570px", // line-it-up with the text above
                            padding: "5px 15px"
                          }
                        })}
                      >
                        {item.vote}
                      </li>
                    ))
                : null}
            </ul>
          </fieldset>
        )}
      </Downshift>
    );
  }
}

export default Autocomplete;
