export interface GameStateUpdate{
   description: string,
   state: State
}

export enum State{
   InProgress,
   WinnerFound,
   Draw
}