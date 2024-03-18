
import { useState } from 'react'
import './App.css';
import confetti from "https://cdn.skypack.dev/canvas-confetti";

const TURNS = {
  x: 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-slade-50">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" stroke-width="2"/>
  </svg>,
  o: 
  <svg class="w-10 text-yellow-200" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><circle cx="10.5" cy="10.5" fill="none" r="8" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
}


//COMPONENTES
const Square = ({children, updateBoard, index}) => {
  const handleClick = () => {
    updateBoard(index)
  }
  return (
    <div onClick={handleClick} 
    className='sm:w-28 sm:h-28 border-2 border-slate-200 rounded-md grid place-items-center cursor-pointer text-5xl w-20 h-20'>
      {children}
    </div>
  )
}

const TurnsValue = ({isSelect, children}) => {
  const classValue = `${isSelect ? 'bg-slate-400 duration-200 border-3 text-slate-800' : 'text-slate-300'}`
  return (
    <div className={classValue + ` w-[100px] h-[100px] border-2 border-slate-200 rounded-full grid place-items-center mx-2 text-6xl duration-150`}>
      {children}
    </div>
  )
}

//VARIABLES DE ENTORNO
const combos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
  [0, 4, 8], [2, 4, 6]             // Diagonales
]

const getWinner = (board) => {
  for (const combo of combos ){
    const [a, b, c] = combo;
    if(board[a] && board[a] === board[b] && board[a] === board[c]){
      return board[a];
    }
  }
  return null;
}

const checkGame = (board) => {
  return board.every((square) => square !== null)
}

const confettiCheck = (value) => {
  if(value === false || value === null) return
  confetti();
}

function App() {
  
  const [BOARD, setBoard] = useState(Array(9).fill(null));
  const [Turn, setTurn] = useState(null);

  //Estado para determinar si hay un ganador
  const [winner, setWinner]= useState(null)
  const updateBoard = (index) => {

    if(BOARD[index] || winner) return

    //Actualizar el estado de los turnos del tablero
      const newBoard = [...BOARD]
      newBoard[index] = Turn
      setBoard(newBoard)
      const newTurn = Turn === TURNS.x ? TURNS.o : TURNS.x;
      setTurn(newTurn)

    //Revisar ganador
    const newWinner = getWinner(newBoard);
    if(newWinner){
      setWinner(newWinner)
    } else if (checkGame(newBoard) ){
      setWinner(false)
    }
  }

  const Bottons = ({children, value}) => {
    const selectTurn = () => {
      if(value == true){
        setTurn(TURNS.x);
      } else {
        setTurn(TURNS.o);
      }
    }
    return (
      <button
        onClick={selectTurn}
        className="text-gray-900 hover:text-white border-2 border-gray-600 hover:bg-gray-900 focus:ring-4 
        focus:outline-none focus:ring-gray-300 font-medium rounded-lg px-8 py-2.5 text-center 
        me-2 mb-2 dark:border-gray-600 dark:text-gray-400 text-3xl
        dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 mt-2">
        {children}
      </button>
    )
  }

  const ResetGame = () => {
    setWinner(null);
    setBoard(Array(9).fill(null));
    setTurn(null)
  }

  return (
    <>
       <div id='board' className='w-fit my-10 mx-auto'>
          <h1 className='text-center text-[2.2rem] font-bold mb-6'>Tic tac toe</h1>
          <div id="game" className='grid gap-3 grid-cols-3 text-center'>
            {
              BOARD.map((_, index) => {
                return (
                  <Square key={index} index={index}
                  updateBoard={updateBoard}>
                    {BOARD[index]}
                  </Square>
                )
              })
            }
          </div>     
          <div className='flex justify-center mt-4 mx-5 sm:mx-0'>
              <TurnsValue isSelect={Turn === TURNS.x}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </TurnsValue>
              <TurnsValue isSelect={Turn === TURNS.o}>
                <svg class="w-8 h-8" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><circle cx="10.5" cy="10.5" fill="none" r="8" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </TurnsValue>
          </div>  
          {
            winner !== null && (
              <div className="winner">
                <div className="text">
                  <h2>
                    {winner ? 'El ganador es:': 'Ha sido un empate'}  
                  </h2>
                  <div>
                    <TurnsValue onClick={confettiCheck(winner)}>
                      {winner ? winner : '='}
                    </TurnsValue>
                  </div>
                  <button
                  onClick={ResetGame}
                  className='text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 mt-2">'>
                    Volver a jugar
                  </button>
                </div>
              </div>
              
            )
          }
          {
            winner === null && Turn === null && (
              <div className='selectTurns'>
                <div className='text'>
                  <h2 className='text-center'>
                      Selecciona el turno que va a iniciar
                  </h2>
                  <div className='flex justify-center'>
                    <Bottons value={true}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    </Bottons>
                    <Bottons value={false} >
                    <svg class="w-6" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><circle cx="10.5" cy="10.5" fill="none" r="8" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </Bottons>
                  </div>
                </div>
              </div>
            )
          }
       </div>
    </>
  )
}

export default App
