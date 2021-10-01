import React from "react";
import { Row, Col, message, Checkbox, Alert } from "antd";
import Grid from "./Grid";
import { validateLocation } from "../utils/GameHelper";

export default class Board extends React.Component {
  state = {
    checkedH: true,
  };

  handlePlaceShip = (row, col) => {
    const { currentPlayer, currentPlayerName, opponentName, updateGame } =
      this.props;

    // Check if the ship is placed inside the board
    if (validateLocation(row, col, this.state.checkedH)) {
      // Add ship position
      for (let i = 0; i < currentPlayer.ship.size; i++) {
        if (this.state.checkedH) {
          currentPlayer.ship.position.push([row, col + i]);
        } else {
          currentPlayer.ship.position.push([row + i, col]);
        }
      }

      currentPlayer.ship.position.forEach(([row, col]) => {
        currentPlayer.board[row][col].label = "S";
      });

      currentPlayer.shipSet = true;

      updateGame("PlaceShip", currentPlayerName, opponentName, currentPlayer);
    } else {
      message.error("You can not place your ship outside the board!");
    }
  };

  /**
   * Player can select a location to fire.
   * The location marked "X" if it has been fired.
   * A hit is when a ship part is in a grid unit that a player fires at.
   * Otherwise, print Miss.
   * @param {*} row
   * @param {*} col
   * @returns
   */
  handleFire = (row, col) => {
    const { currentPlayerName, opponent, opponentName, updateGame } =
      this.props;
    if (opponent.board[row][col].label === "X") {
      message.error("You have already fired this location before!");
      return null;
    } else {
      if (opponent.board[row][col].label === "S") {
        opponent.board[row][col].label = "X";
        opponent.ship.hits += 1;
        updateGame("Fire", currentPlayerName, opponentName, opponent);
        message.success("Hit!");
        if (opponent.ship.hits === opponent.ship.size) {
          updateGame("GameOver", currentPlayerName, opponentName, {});
        }
      } else {
        opponent.board[row][col].label = "X";
        updateGame("Fire", currentPlayerName, opponentName, opponent);
        message.info("Miss.");
      }
    }
  };

  /**
   * Columns are labeled A to H.
   * Rows are labeled 1 to 8.
   * @param {*} board
   * @returns
   */
  showBoard = (board) => {
    return board.map((row, i) => {
      const rowData = row.map((square, j) => {
        return (
          <Col>
            <Grid
              key={`${i}${j}`}
              i={i}
              j={j}
              square={square}
              shipSet={this.props.currentPlayer.shipSet}
              handleFire={this.handleFire}
              handlePlaceShip={this.handlePlaceShip}
            />
          </Col>
        );
      });
      return <Row justify="center">{rowData}</Row>;
    });
  };

  handleCheckbox = () => {
    this.setState((prevState) => ({
      checkedH: !prevState.checkedH,
    }));
  };

  render() {
    const { board, currentPlayer, currentPlayerName, opponentName } =
      this.props;

    const action = currentPlayer.shipSet ? (
      <Alert
        message={`Please click a location to hit ${opponentName}'s ship`}
        type="info"
      />
    ) : (
      <div>
        <Alert
          message={`Please click the initial ship location for ${currentPlayerName}`}
          type="info"
        />
        <div style={{ marginTop: 24 }}>
          Place the ship:{" "}
          <Checkbox
            checked={this.state.checkedH}
            onChange={this.handleCheckbox}
          >
            Horizontally
          </Checkbox>
          <Checkbox
            checked={!this.state.checkedH}
            onChange={this.handleCheckbox}
          >
            Vertically
          </Checkbox>
        </div>
      </div>
    );

    return (
      <div>
        <h1>
          {currentPlayerName} <span>✨</span>
        </h1>
        <div style={{ margin: 36 }}>{action}</div>
        {this.showBoard(board)}
      </div>
    );
  }
}
