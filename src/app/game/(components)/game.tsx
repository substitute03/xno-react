"use client";

import { useEffect, useState } from "react";
import GameBoard from "./gameBoard";
import { GameStateUpdate, Scores, State } from "../../../../models/gameState";
import PlayerNames from "./playerNames";
import logo from "../../../../public/XNO_Logo.png";
import Image from "next/image";

export default function Game() {
  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");
  const [message, setMessage] = useState(player1Name); // Message defaults to player 1's name
  const [scores, setScores] = useState({
    player1Score: 0,
    player2Score: 0,
  } as Scores);

  useEffect(
    function updateMessageOnPlayer1NameChange() {
      addPlayerNamesToMessage(1);
    },
    [player1Name]
  );

  useEffect(
    function updateMessageOnPlayer2NameChange() {
      addPlayerNamesToMessage(2);
    },
    [player2Name]
  );

  function addPlayerNamesToMessage(player: number) {
    if (
      scores.player1Score !== 0 &&
      scores.player2Score !== 0 &&
      scores.player1Score !== 3 &&
      scores.player2Score !== 3
    ) {
      if (player === 1) {
        setMessage(player1Name);
      } else if (player === 2) {
        setMessage(player2Name);
      }
    }
  }

  // Callback function to receive winner information from GameBoard
  const handleGameStateUpdate = (gameState: GameStateUpdate) => {
    gameState.state === State.WinnerFound
      ? setMessage(`${gameState.description} wins! 🎉`)
      : setMessage(`${gameState.description}`);

    setScores(gameState.scores);
  };

  return (
    <>
      <div className="row col-2 offset-5 fs-3 text-center mt-3">
        <Image src={logo} alt="xno logo" />
      </div>

      <PlayerNames
        isVisible={true}
        setPlayer1Name={setPlayer1Name}
        setPlayer2Name={setPlayer2Name}
        player1Name={player1Name}
        player2Name={player2Name}
      />

      <div className="row col-12 fs-5 text-center mt-4">
        <p>
          {player1Name} <span className="fw-bold">vs</span> {player2Name}
        </p>
      </div>
      <div className="row col-12 fs-5 text-center">
        <p>
          {scores.player1Score} : {scores.player2Score}
        </p>
      </div>
      <div className="row col-12 fs-5 text-center mt-2">
        <p>{message}</p>
      </div>

      <GameBoard isVisible={true} gameStateUpdate={handleGameStateUpdate} />
    </>
  );
}
