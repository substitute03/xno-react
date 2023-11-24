"use client";

import { useState } from 'react';
import GameBoard from '../../components/gameBoard'
import { GameStateUpdate, State } from '../../models/gameState';

export default function Home() {
   const[message, setMessage] = useState("");

  // Callback function to receive winner information from GameBoard
  const handleGameStateUpdate = (gameState: GameStateUpdate) => {
   gameState.state === State.WinnerFound
   ? setMessage(`${gameState.description} wins! 🎉`)
   : setMessage(`${gameState.description}`)
 };


  return (
   <>
   <div className='row col-2 offset-5 fs-3 text-center mt-5'>
      <img src="./XNO_Logo.png" alt="logo"></img>
   </div>
   <div className='row col-12 fs-5 text-center mt-4'>
      <p>{message}</p>
   </div>
   <GameBoard gameStateUpdate={handleGameStateUpdate}></GameBoard>
   </>
  )
}
