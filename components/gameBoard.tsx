import { useEffect, useRef, useState } from "react";
import { GameStateUpdate, State } from "../models/gameState";

interface GameBoardProps {
   gameStateUpdate: (state: GameStateUpdate) => void;
 }

export default function GameBoard({ gameStateUpdate: handleGameStateUpdate }: GameBoardProps ) {
   const defaultGridValue: number = -10;
   const initialGrid: number[][] = [
      [defaultGridValue, defaultGridValue, defaultGridValue],
      [defaultGridValue, defaultGridValue, defaultGridValue],
      [defaultGridValue, defaultGridValue, defaultGridValue]
   ];

   const[gameBoard, setGameBoard] = useState(initialGrid);
   const[playerTurn, setPlayerTurn] = useState(0);
   const[gameState, setGameState] = useState(State.InProgress);


   // useRef will store a reference to something. The component will then NOT re-render if this thing/object/variable changes.
   // This means I don't have to include it in the onGameStateChange useEffect hooks' dependency array, although this isn't really necessary or important.
   // The current thing stored in the ref is accessed using e.g. gameStateUpdateRef.current.
   const handleGameStateUpdateRef = useRef(handleGameStateUpdate);

   useEffect(function onGameStateChange() {
      const gameStateUpdate: GameStateUpdate = 
         gameState === State.WinnerFound
            ? {
                  description: `Player ${playerTurn === 0 ? "1" : "2"}`,
                  state: State.WinnerFound,
               }
            : gameState === State.Draw
            ? {
                  description: `Draw`,
                  state: State.Draw,
               }
            : {
                  description: `Player ${playerTurn === 0 ? 1 : 2}`,
                  state: State.InProgress,
               };
    
      // Communicate the game state to parent.
      handleGameStateUpdateRef.current(gameStateUpdate);

    }, [gameState, playerTurn]);

   function cellOnClick(r: number, c: number, moveType: number): void{
      if (gameBoard[r][c] !== defaultGridValue ||
          gameState === State.WinnerFound ||
          gameState === State.Draw) {
            return;
         }

      let newGameboard = [...gameBoard];
      newGameboard[r][c] = moveType;
      setGameBoard(newGameboard);
      checkForWinner();

      if (gameState === State.InProgress){
         const nextPlayer = playerTurn === 0 ? 1: 0;
         setPlayerTurn(nextPlayer);
      }
   }

   function checkForWinner(): void {
      if (!gameBoard.flatMap(row => row).some(value => value === defaultGridValue)){
         setGameState(State.Draw);
      }

      // Checking rows
      for (let i = 0; i < 3; i++) {
        const rowSum = gameBoard[i][0] + gameBoard[i][1] + gameBoard[i][2];

        if (rowSum === 0 || rowSum === 3){
         setGameState(State.WinnerFound);
        }     
      }
    
      // Checking columns
      for (let j = 0; j < 3; j++) {
        const colSum = gameBoard[0][j] + gameBoard[1][j] + gameBoard[2][j];

         if (colSum === 0 || colSum === 3){
            setGameState(State.WinnerFound);
         }  
      }
    
      // Checking diagonals
      const diagonal1Sum = gameBoard[0][0] + gameBoard[1][1] + gameBoard[2][2];
      const diagonal2Sum = gameBoard[0][2] + gameBoard[1][1] + gameBoard[2][0];

      if (diagonal1Sum === 0 || diagonal1Sum === 3 ||
         diagonal2Sum === 0 || diagonal2Sum === 3){
            setGameState(State.WinnerFound);
      }
    }
    
    function resetGameBoard(): void{
      setGameBoard(initialGrid);
      setPlayerTurn(0);
      setGameState(State.InProgress);
    }

   return (
      <>
      <div className='rowCenter gridContainer'>
         <div className="grid text-center">
            <div className="cell" onClick={() => cellOnClick(0, 0, playerTurn)}>
               {gameBoard[0][0] === 0 ? "O": gameBoard[0][0] === 1 ? "X" : ""}
            </div>
            <div className="cell" onClick={() => cellOnClick(0, 1, playerTurn)}>
               {gameBoard[0][1] === 0 ? "O": gameBoard[0][1] === 1 ? "X" : ""}
            </div>
            <div className="cell" onClick={() => cellOnClick(0, 2, playerTurn)}>
               {gameBoard[0][2] === 0 ? "O": gameBoard[0][2] === 1 ? "X" : ""}
            </div>
            <div className="cell" onClick={() => cellOnClick(1, 0, playerTurn)}>
               {gameBoard[1][0] === 0 ? "O": gameBoard[1][0] === 1 ? "X" : ""}
            </div>
            <div className="cell" onClick={() => cellOnClick(1, 1, playerTurn)}>
               {gameBoard[1][1] === 0 ? "O": gameBoard[1][1] === 1 ? "X" : ""}
            </div>
            <div className="cell" onClick={() => cellOnClick(1, 2, playerTurn)}>
               {gameBoard[1][2] === 0 ? "O": gameBoard[1][2] === 1 ? "X" : ""}
            </div>
            <div className="cell" onClick={() => cellOnClick(2, 0, playerTurn)}>
               {gameBoard[2][0] === 0 ? "O": gameBoard[2][0] === 1 ? "X" : ""}
            </div>
            <div className="cell" onClick={() => cellOnClick(2, 1, playerTurn)}>
               {gameBoard[2][1] === 0 ? "O": gameBoard[2][1] === 1 ? "X" : ""}
            </div>
            <div className="cell" onClick={() => cellOnClick(2, 2, playerTurn)}>
               {gameBoard[2][2] === 0 ? "O": gameBoard[2][2] === 1? "X": ""}
            </div>
         </div>
      </div>
      <div className="row col-2 offset-5 mt-5">
         <button className="btn btn-danger text fs-6" onClick={resetGameBoard}>Reset Game</button>
      </div>   
      </>
   )
}