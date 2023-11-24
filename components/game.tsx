import { useState } from 'react';
import GameBoard from './gameBoard';
import { GameStateUpdate, Scores, State } from '../models/gameState';



export default function Game() {
   const[message, setMessage] = useState("");
   const[scores, setScores] = useState({player1Score: 0, player2Score: 0} as Scores);

  // Callback function to receive winner information from GameBoard
  const handleGameStateUpdate = (gameState: GameStateUpdate) => {
   gameState.state === State.WinnerFound
   ? setMessage(`${gameState.description} wins! 🎉`)
   : setMessage(`${gameState.description}`)

   setScores(gameState.scores);
 };


  return (
   <>
   <div className='row col-2 offset-5 fs-3 text-center mt-5'>
      <img src="./XNO_Logo.png" alt="logo"></img>
   </div>
   <div className='row col-12 fs-5 text-center mt-4'>
      <p>Scores: {scores.player1Score} : {scores.player2Score} </p>
   </div>
   <div className='row col-12 fs-5 text-center mt-4'>
      <p>{message}</p>
   </div>
   <GameBoard gameStateUpdate={handleGameStateUpdate}></GameBoard>
   </>
  )
}