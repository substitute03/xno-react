import { useState } from "react";

interface Props {
  isVisible: boolean;
  //   setPlayerNames: (player1Name: string, player2Name: string) => void;
  player1Name: string;
  player2Name: string;
  setPlayer1Name: (name: string) => void;
  setPlayer2Name: (name: string) => void;
}

export default function PlayerNames(props: Props) {
  if (!props.isVisible) return null;

  return (
    <>
      <div className="row col-2 offset-5 mb-3 mt-3">
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="player1Name"
            placeholder="Enter name..."
            value={props.player1Name}
            onChange={(event) => props.setPlayer1Name(event.target.value)}
          ></input>
          <label className="ps-4">Player 1 name</label>
        </div>
        <div className="form-floating pt-2">
          <input
            type="text"
            className="form-control"
            id="player2Name"
            placeholder="Enter name..."
            value={props.player2Name}
            onChange={(event) => props.setPlayer2Name(event.target.value)}
          ></input>
          <label className="ps-4 pt-4">Player 2 name</label>
        </div>
      </div>
    </>
  );
}
