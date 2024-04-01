import { useLayoutEffect } from 'react'
import rough from 'roughjs/bundled/rough.esm'
import './App.css'

const generator = rough.generator();

function App() {

  useLayoutEffect(() => {
    const board = document.getElementById("board");
    const ctx = board.getContext("2d");

    const roughtBoard = rough.canvas(board);
    const rect = generator.rectangle(100, 100, 100, 100);
    const line = generator.line(100, 100, 200, 200);

    roughtBoard.draw(rect)
    roughtBoard.draw(line)
  })

 return(
  
    <>
      <canvas id='board' height={window.innerHeight} width={window.innerWidth} className='bg-gray-800'>
        
      </canvas>
    </>
  )
}

export default App
