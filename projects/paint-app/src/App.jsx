import { useLayoutEffect, useState } from 'react'
import rough from 'roughjs/bundled/rough.esm'
import { MenuItems } from './constants/menus-items';
import './App.css'


  //---------------------------------------------------------------------------------------------------------------
  // CONSTANTES
  //---------------------------------------------------------------------------------------------------------------

    const generator = rough.generator();

  
  //---------------------------------------------------------------------------------------------------------------
  //FUNCIONES CONSTANTES
  //---------------------------------------------------------------------------------------------------------------
    //* Ecuacion de euclides para hallar la distancia entre 2 puntos del plano carteciano.
    const distance = (a, b) => { return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))}

    const isWithin = (x, y, element) => {
      //? Desarmo el objeto en las variables pertinentes
      const {x1, y1, x2, y2, type} = element;
      if(type === "rect") {
      //? Obtengo los valores minimos y maximos de estas mismas
        const minX = Math.min(x1, x2);
        const maxX = Math.max(x1, x2);
        const minY = Math.min(y1, y2);
        const maxY = Math.max(y1, y2);
      //? Esto lo que hace es devolver true o false si se encuentra x y y dentro del rango de los MAX and MIN
        return x >= minX && x <= maxX && y >= minY && y <= maxY;
      } else if (type === 'line'){
        const a = {x: x1, y: y1};
        const b = {x: x2, y: y2};
        const c = {x, y};
    
        //? 
        const offSet = distance(a, b) - (distance(a, c) + distance(b, c))
        //? Esto devolvera true si el valor obsoluto del offSet es menor a uno (0)
        return Math.abs(offSet) < 1;
      }
    }

  
  //---------------------------------------------------------------------------------------------------------------
  //FUNCIONES
  //---------------------------------------------------------------------------------------------------------------
    //? Esto crea los elementos y termina devolviendo un objeto 
    function createElement(id, x1, y1, x2, y2, type) {
      let roughtElement;
        if(type === "line") {
          roughtElement = generator.line(x1, y1, x2, y2)
        } else if (type === "rect") {
          roughtElement = generator.rectangle(x1, y1, x2 - x1, y2 -y1)
        }
        return {id, x1, y1, x2, y2, type,  roughtElement}
    }


    function getElementPosition(x, y, elements) {
      return elements.find(element => isWithin(x, y, element))
    }


function App() {

  
  //---------------------------------------------------------------------------------------------------------------
  // USE STATES
  //---------------------------------------------------------------------------------------------------------------
    const [elements, setElements] = useState([]);
    const [action, setAction] = useState('none');
    const [types, setTypes] = useState("line");
    const [slectElm, setSlect] = useState(null);
    const [isGrab, setGrab] = useState(false);


  //---------------------------------------------------------------------------------------------------------------
  // FUNCIONES CONSTANTES
  //---------------------------------------------------------------------------------------------------------------
    //* Esta funcion esta creada para evitar escribir codigo una y otra vez.
    // Se crea un nuevo elemento por medio del create element, luego se crea una variable para crear una copia de los ELEMENTOS
    // Y por ultimo se remplaza un valor del array que tenga el mismo index que el id que se recibe, es remplazado por lo qe deveulve la funcion
    const updateElement = (id, x1, y1, clientX, clientY, types) => {  
      const updateElement = createElement(id, x1, y1, clientX, clientY, types)
      const copyElements = [...elements];
      copyElements[id] = updateElement
      setElements(copyElements)
    }

    //! Funcion para cuando se clickee el canvas
    const handledMouseDown = (e) => {
      
      const {clientX, clientY} = e;

      if (types === "selection") {
        const element = getElementPosition(clientX, clientY, elements);
        e.target.style.cursor = element ? "grabbing" : "default";
        setGrab(true)
      }
      if(types === 'selection'){
        const element = getElementPosition(clientX, clientY, elements)
          if(element) {
            const offsetX = clientX - element.x1;
            const offsetY = clientY - element.y1;
            setAction('moving')
            setSlect({...element, offsetX, offsetY})
          }
      } else {
        const id = elements.length;
        //? Aqui se accede a las propiedades del objeto event por medio de su desustructuracion
        const element = createElement(id, clientX, clientY, clientX, clientY, types)
        
        //? Practicamente se hace un forEach en el cual se van agregando elementos dentro del state elements sin modificar el estado anterior
        setElements(prevState => [...prevState, element])

        setAction('drawing');
      }
    }

    //! Funcion para cuando se mueva atraves del canvas
    const handledMouseMove = (event) => {
      const {clientX, clientY} = event;

      if (types === "selection" && isGrab === false) {
        const element = getElementPosition(clientX, clientY, elements);
        event.target.style.cursor = element ? "grab" : "default";
      } else if(types === "selection" && isGrab === true) {
        const element = getElementPosition(clientX, clientY, elements);
        event.target.style.cursor = element ? "grabbing" : "default";
      }

      if (action === 'drawing') {
        //? Aqui lo que se hace es obtener el valor previo que fue agregado en la funcion de click en el canvas
        const index = elements.length - 1;
        const {x1, y1} = elements[index] 
        
        updateElement(index, x1, y1, clientX, clientY, types)
      } else if (action === 'moving') {
          const {id, x1, y1, x2, y2, type, offsetX, offsetY} = slectElm
          const width = x2-x1;
          const height = y2-y1;

          const nextX = clientX - offsetX;
          const nextY = clientY - offsetY
          updateElement(id, nextX, nextY, nextX + width, nextY + height, type)
      }
    }

    //! Funcion para cuando se suelte el click en el canvas canvas
    const handledMouseUp = (event) => {
      const {clientX, clientY} = event;

      if (types === "selection") {
        const element = getElementPosition(clientX, clientY, elements);
        event.target.style.cursor = element ? "grab" : "default";
        setGrab(false)
      }

      setAction('none');
      setSlect(null)

    }

  //---------------------------------------------------------------------------------------------------------------
  // USE EFFECTS
  //---------------------------------------------------------------------------------------------------------------
  useLayoutEffect(() => {
    const board = document.getElementById("board");
    const ctx = board.getContext("2d");
    ctx.clearRect(0, 0, board.height, board.width)

    //* Declaracion del tablero por medio de la API de Rought
    const roughtBoard = rough.canvas(board);

    elements.forEach(element => roughtBoard.draw(element.roughtElement))  
  }, [elements])


 return(
  
    <div> 
        <div className='fixed left-[calc(50%-75px)] my-3 py-2 px-4 border border-1 border-slate-300 rounded-md sombra'>
          <ul className="w-full gap-2 flex">
              <li>
                  <input type="radio" id="selection" name="Selection" className="hidden peer" 
                  checked={types === "selection"} onChange={() => setTypes("selection")}/>
                  <label htmlFor="selection" className="inline-flex items-center p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-slate-200 peer-checked:bg-gray-700 peer-checked:border-2 peer-checked:border-white peer-checked:text-white hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                      {MenuItems.selection}
                  </label>
              </li>
              <li>
                  <input type="radio" id="line" name="Line" className="hidden peer" 
                  checked={types === "line"} onChange={() => setTypes("line")}/>
                  <label htmlFor="line" className="inline-flex items-center p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-slate-200 peer-checked:bg-gray-700 peer-checked:border-2 peer-checked:border-white peer-checked:text-white hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                      {MenuItems.line}
                  </label>
              </li>
              <li>
                  <input type="radio" id="rectangle" name="Rectangle" className="hidden peer" 
                  checked={types === "rect"} onChange={() => setTypes("rect")}/>
                  <label htmlFor="rectangle" className="inline-flex items-center p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-slate-200 peer-checked:bg-gray-700 peer-checked:border-2 peer-checked:border-white peer-checked:text-white hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                      {MenuItems.square}
                  </label>
              </li>
          </ul>
      </div>
      <canvas 
        id='board' 
        height={window.innerHeight} 
        width={window.innerWidth} 
        className='bg-gray-800'
        onMouseDown={handledMouseDown}
        onMouseMove={handledMouseMove}
        onMouseUp={handledMouseUp}
      >
        
      </canvas>
    </div>
  )
}

export default App
