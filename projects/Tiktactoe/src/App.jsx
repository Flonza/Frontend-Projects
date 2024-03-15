
import './App.css'

const TURNS = {
  x: '×',
  o: 'o',
}

const BOARD = Array(9).fill(null);
function App() {

  return (
    <>
       <div id='board' className=''>
          <h1 className='text-center text-[2.2rem] font-bold'>Tik tac toe</h1>
          <div id="game" className='grid col-4 gap-3'>
            {
              BOARD.map((_, index) => {
                return (
                  <div key={index} className='cell'>
                    <span className='content'>{index}</span>
                  </div>
                )
              })
            }
          </div>       
       </div>
    </>
  )
}

export default App
