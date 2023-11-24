"use client";

import { useState } from 'react';
import GameBoard from '../../components/gameBoard'
import { GameStateUpdate, State } from '../../models/gameState';
import Game from '../../components/game';

export default function Home() {
  return (
   <>
   <Game></Game>
   </>
  )
}
