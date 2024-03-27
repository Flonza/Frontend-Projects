import { TurnsValue } from "./Turnsvalue"

export function Winner ({winner, ResetGame}){
    if(winner === null) return null
    
    const winnerText = winner ? 'El ganador es:' : 'Ha sido un empate'

    return (
        <div className="winner">
        <div className="text">
          <h2>
            {winnerText}
          </h2>
          <div>
            <TurnsValue>
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