import './App.css'
import { useState } from 'react';

const TURNS = {
  X: 'x',
  O: 'o'
}

const Square = ({children, isSelected,  updateBoard, index}:any) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`
  return (
    <div className={className}>
      {children}
    </div>
  )
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [change, stateChange] = useState(TURNS.X)
  return (
    <main className='board'>
      <h1>Tik tak toe</h1>
      <section className='game'>
          {
            board.map((_, index) =>{
              return (
                 <Square key={index} index={index}>
                  {board}
                 </Square>  
              )
            })
          }
      </section>
      <section className='turn'> 
          <Square isSelected={change === TURNS.X}>
            {TURNS.X}
          </Square>
          <Square isSelected={change === TURNS.O}>
            {TURNS.O}
          </Square>
      </section>
    </main>
  )
}

export default App
