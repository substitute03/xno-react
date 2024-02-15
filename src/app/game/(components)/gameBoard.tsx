"use client";

import { useEffect, useRef, useState } from "react";
import { GameStateUpdate, State, Scores } from "../../../../models/gameState";
import Cell from "./cell";

interface GameBoardProps {
  isVisible: boolean;
  gameStateUpdate: (state: GameStateUpdate) => void;
}

export default function GameBoard({
  gameStateUpdate: handleGameStateUpdate,
  isVisible,
}: GameBoardProps) {
  const defaultGridValue: number = -10;
  const initialGrid: number[][] = [
    [defaultGridValue, defaultGridValue, defaultGridValue],
    [defaultGridValue, defaultGridValue, defaultGridValue],
    [defaultGridValue, defaultGridValue, defaultGridValue],
  ];

  const initialScores: Scores = {
    player1Score: 0,
    player2Score: 0,
  };

  const [gameBoard, setGameBoard] = useState(initialGrid);
  const [playerTurn, setPlayerTurn] = useState(0);
  const [gameState, setGameState] = useState(State.InProgress);
  const [scores, setScores] = useState(initialScores);

  // useRef will store a reference to something. The component will then NOT re-render if this thing/object/variable changes.
  // This means I don't have to include it in the onGameStateChange useEffect hooks' dependency array, although this isn't really necessary or important.
  // The current thing stored in the ref is accessed using e.g. gameStateUpdateRef.current.
  const handleGameStateUpdateRef = useRef(handleGameStateUpdate);

  useEffect(
    function onGameStateChange() {
      if (gameState === State.WinnerFound) {
        let newScores = scores;

        switch (playerTurn) {
          case 0:
            newScores.player1Score++;
            setScores(newScores);
            break;
          case 1:
            newScores.player2Score++;
            setScores(newScores);
            break;
          default:
            break;
        }
      }

      const gameStateUpdate: GameStateUpdate =
        gameState === State.WinnerFound
          ? {
              description: `Player ${playerTurn === 0 ? "1" : "2"}`,
              state: State.WinnerFound,
              scores: scores,
            }
          : gameState === State.Draw
          ? {
              description: `Draw`,
              state: State.Draw,
              scores: scores,
            }
          : {
              description: `Player ${playerTurn === 0 ? 1 : 2}`,
              state: State.InProgress,
              scores: scores,
            };

      // Communicate the game state to parent.
      handleGameStateUpdateRef.current(gameStateUpdate);
    },
    [gameState, playerTurn, scores]
  );

  function cellOnClick(r: number, c: number): void {
    if (
      gameBoard[r][c] !== defaultGridValue ||
      gameState === State.WinnerFound ||
      gameState === State.Draw
    ) {
      return;
    }

    const newGameboard = [...gameBoard];
    newGameboard[r][c] = playerTurn;
    setGameBoard(newGameboard);
    checkForWinner();

    if (gameState === State.InProgress) {
      const nextPlayer: number = playerTurn === 0 ? 1 : 0;
      setPlayerTurn(nextPlayer);
    }
  }

  function checkForWinner(): void {
    checkForDraw();
    checkRows();
    checkColumns();
    checkDiagonals();
  }

  function checkForDraw(): void {
    if (
      !gameBoard
        .flatMap((row) => row)
        .some((value) => value === defaultGridValue)
    ) {
      setGameState(State.Draw);
    }
  }

  function checkRows(): void {
    for (let i = 0; i < 3; i++) {
      const rowSum = gameBoard[i][0] + gameBoard[i][1] + gameBoard[i][2];

      if (rowSum === 0 || rowSum === 3) {
        setGameState(State.WinnerFound);
      }
    }
  }

  function checkColumns(): void {
    for (let i = 0; i < 3; i++) {
      const colSum = gameBoard[0][i] + gameBoard[1][i] + gameBoard[2][i];

      if (colSum === 0 || colSum === 3) {
        setGameState(State.WinnerFound);
      }
    }
  }

  function checkDiagonals(): void {
    const diagonal1Sum = gameBoard[0][0] + gameBoard[1][1] + gameBoard[2][2];
    const diagonal2Sum = gameBoard[0][2] + gameBoard[1][1] + gameBoard[2][0];

    if (
      diagonal1Sum === 0 ||
      diagonal1Sum === 3 ||
      diagonal2Sum === 0 ||
      diagonal2Sum === 3
    ) {
      setGameState(State.WinnerFound);
    }
  }

  function resetGameBoard(): void {
    setGameBoard(initialGrid);
    setPlayerTurn(0);
    setGameState(State.InProgress);
  }

  function resetScores(): void {
    setScores(initialScores);
  }

  if (!isVisible) return null;

  return (
    <>
      <div className="rowCenter gridContainer">
        <div className="grid text-center">
          <Cell
            row={0}
            col={0}
            value={gameBoard[0][0]}
            onClickEvent={cellOnClick}
          ></Cell>
          <Cell
            row={0}
            col={1}
            value={gameBoard[0][1]}
            onClickEvent={cellOnClick}
          ></Cell>
          <Cell
            row={0}
            col={2}
            value={gameBoard[0][2]}
            onClickEvent={cellOnClick}
          ></Cell>
          <Cell
            row={1}
            col={0}
            value={gameBoard[1][0]}
            onClickEvent={cellOnClick}
          ></Cell>
          <Cell
            row={1}
            col={1}
            value={gameBoard[1][1]}
            onClickEvent={cellOnClick}
          ></Cell>
          <Cell
            row={1}
            col={2}
            value={gameBoard[1][2]}
            onClickEvent={cellOnClick}
          ></Cell>
          <Cell
            row={2}
            col={0}
            value={gameBoard[2][0]}
            onClickEvent={cellOnClick}
          ></Cell>
          <Cell
            row={2}
            col={1}
            value={gameBoard[2][1]}
            onClickEvent={cellOnClick}
          ></Cell>
          <Cell
            row={2}
            col={2}
            value={gameBoard[2][2]}
            onClickEvent={cellOnClick}
          ></Cell>
        </div>
      </div>
      <div className="row col-2 offset-5 mt-5">
        <button className="btn btn-danger text fs-6" onClick={resetGameBoard}>
          Reset Game
        </button>
      </div>
      <div className="row col-2 offset-5 mt-3 mb-3">
        <button className="btn btn-danger text fs-6" onClick={resetScores}>
          Reset Scores
        </button>
      </div>
    </>
  );
}
