import React from "react";
import { Button } from "antd";
import { RiSpaceShipLine } from "react-icons/ri";
import { FaBomb } from "react-icons/fa";

export default class Grid extends React.Component {
  handleGridClick = () => {
    const { i, j, shipSet, handleFire, handlePlaceShip } = this.props;
    if (shipSet) {
      return handleFire(i, j);
    } else {
      return handlePlaceShip(i, j);
    }
  };

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
        style={{ width: 42, height: 42 }}
        disabled={square.status === "label"}
        onClick={this.handleGridClick}
      >
        {this.showLabel(square.label)}
      </Button>
    );
  }
}
