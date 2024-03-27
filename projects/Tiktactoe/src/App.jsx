
import { useState } from 'react'
import './App.css';
import confetti from "https://cdn.skypack.dev/canvas-confetti";
import { Square } from './components/Square.jsx';
import { TurnsValue } from './components/Turnsvalue.jsx';
import { TURNS } from './constants.jsx';
import { getWinner, checkGame } from './logic/getWinnerFrom.jsx';
import { Winner } from './components/Winner.jsx'


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

    //Guardar en el LOCALSTORAGE
    window.localStorage.setItem('board', newBoard);
    window.localStorage.setItem('turn', newTurn);

    //Revisar ganador
    const newWinner = getWinner(newBoard);
    if(newWinner){
      setWinner(newWinner);
      confetti();
    } else if (checkGame(newBoard) ){
      setWinner(false)
    }

    console.log(window.localStorage.getItem('board'));
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </TurnsValue>
              <TurnsValue isSelect={Turn === TURNS.o}>
                <svg className="w-8 h-8" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><circle cx="10.5" cy="10.5" fill="none" r="8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </TurnsValue>
          </div>  
          <Winner winner={winner} ResetGame={ResetGame} />
          {
            winner === null && Turn === null && (
              <div className='selectTurns'>
                <div className='text'>
                  <h2 className='text-center'>
                      Selecciona el turno que va a iniciar
                  </h2>
                  <div className='flex justify-center'>
                    <Bottons value={true}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </Bottons>
                    <Bottons value={false} >
                      <svg className="w-6" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg"><circle cx="10.5" cy="10.5" fill="none" r="8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
