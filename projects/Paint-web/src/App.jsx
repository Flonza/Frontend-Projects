import { useEffect, useState } from 'react';
import './App.css';
import { BoardCanvas } from './components/BoardCanvas';
import { MenuButtons } from './components/MenuBottoms';

function App() {

  
  const [estiloPadre, setEstiloPadre] = useState([]);
  const manejarEstilo = (estiloHijo) => {
    setEstiloPadre(estiloHijo);
  };

  useEffect(() => {
  }, [estiloPadre])
  return (
    <>  
      <div className='flex items-center justify-center h-full'>
        <div>
          <MenuButtons sendStyles={manejarEstilo}></MenuButtons>
        </div>
        <div className='w-10/12 h-full'>
          <BoardCanvas Arr={estiloPadre}></BoardCanvas>
        </div>
      </div>
    </>
  )
}

export default App
