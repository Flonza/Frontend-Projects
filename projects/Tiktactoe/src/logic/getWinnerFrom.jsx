import { combos } from "../constants";


export const getWinner = (board) => {
    for (const combo of combos ){
      const [a, b, c] = combo;
      if(board[a] && board[a] === board[b] && board[a] === board[c]){
        return board[a];
      }
    }
    return null;
  }

export const checkGame = (board) => {
  return board.every((square) => square !== null)
}