import React from "react";
import { Button } from "antd";
import { RiSpaceShipLine } from "react-icons/ri";
import { FaBomb } from "react-icons/fa";
import "../css/Grid.css";

export default class Grid extends React.Component {
  handleGridClick = (e) => {
    // Remove focus for clicked button
    if (e) {
      e.preventDefault();
    }

    const { i, j, shipSet, handleFire, handlePlaceShip } = this.props;
    if (shipSet) {
      return handleFire(i, j);
    } else {
      return handlePlaceShip(i, j);
    }
  };

  /**
   * Replace the label of the grid by icon
   * @param {*} label
   * @returns icon or string
   */
  showLabel = (label) => {
    if (label === "S") {
      return <RiSpaceShipLine />;
    } else if (label === "X") {
      return <FaBomb />;
    }
    return label;
  };

  render() {
    const { square } = this.props;

    return (
      <Button
        style={{
          width: 42,
          height: 42,
        }}
        disabled={square.status === "label"}
        onMouseDown={this.handleGridClick}
        onKeyUp={(e) => {
          if (e.keyCode === 13 || e.keyCode === 32) {
            this.handleGridClick();
          }
        }}
      >
        {this.showLabel(square.label)}
      </Button>
    );
  }
}
