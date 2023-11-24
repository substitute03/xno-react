export interface GameStateUpdate {
   description: string,
   state: State,
   scores: Scores
}

export enum State {
   InProgress,
   WinnerFound,
   Draw
}

export interface Scores {
   player1Score: number,
   player2Score: number
}