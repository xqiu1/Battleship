import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import Game from "./components/Game";

function App() {
  return (
    <div className="App">
      <h1>Battleship</h1>
      <Game />
    </div>
  );
}

export default App;
