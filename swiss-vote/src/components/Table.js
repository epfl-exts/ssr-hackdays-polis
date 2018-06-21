import React, { Component } from "react";
import { Consumer } from "../context-app";

class Table extends Component {
  render() {
    return (
      <Consumer>
        {selection => {
          if (selection) {
            const rows = selection.results.map(result => {
              return (
                <tr key={result.canton}>
                  <td>{result.canton}</td>
                  <td>{result.yes}</td>
                  <td>{result.no}</td>
                </tr>
              );
            });

            return (
              <table>
                <caption>{selection.vote}</caption>
                <thead>
                  <tr>
                    <th>Canton</th>
                    <th>Yes</th>
                    <th>No</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </table>
            );
          }
        }}
      </Consumer>
    );
  }
}

export default Table;
