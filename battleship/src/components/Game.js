import React from "react";
import { createPlayer, whoIsOpponent } from "../utils/GameHelper";
import Board from "./Board";

export default class Game extends React.Component {
  state = {
    currentPlayer: "player1",
    player1: createPlayer(),
    player2: createPlayer(),
    gameStart: false,
    gameOver: false,
    winner: null,
  };

  updateGame = (action, playerName, opponentName, payload) => {
    if (action === "GameOver") {
      this.setState({
        winner: playerName,
        gameOver: true,
        currentPlayer: null,
      });
    } else if (action === "PlaceShip") {
      this.setState({
        [playerName]: payload,
        currentPlayer: opponentName,
      });
    } else {
      // Fire
      this.setState({
        [opponentName]: payload,
        currentPlayer: opponentName,
      });
    }
  };

  render() {
    const { currentPlayer, gameOver, allShipsPlaced } = this.state;
    const opponent = whoIsOpponent(currentPlayer);

    const gameState = gameOver ? (
      <h2>
        Congratulations {currentPlayer}, you sunk {opponent}'s battleship.
      </h2>
    ) : (
      <Board
        board={this.state[currentPlayer].board}
        currentPlayer={this.state[currentPlayer]}
        currentPlayerName={currentPlayer}
        opponent={this.state[opponent]}
        opponentName={opponent}
        allShipsPlaced={allShipsPlaced}
        updateGame={this.updateGame}
      />
    );

    return gameState;
  }
}
