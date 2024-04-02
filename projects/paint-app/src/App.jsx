import { useLayoutEffect, useState } from 'react'
import rough from 'roughjs/bundled/rough.esm'
import { MenuItems } from './constants/menus-items';
import { useHistory } from './hooks/useHistory';
import { Labels } from './components/Labels';
import './App.css'


  //---------------------------------------------------------------------------------------------------------------
  // CONSTANTES
  //---------------------------------------------------------------------------------------------------------------

    const generator = rough.generator();
    const width = window.innerWidth;
    const height = window.innerHeight;
  
  //---------------------------------------------------------------------------------------------------------------
  //FUNCIONES CONSTANTES
  //---------------------------------------------------------------------------------------------------------------
    //* Ecuacion de euclides para hallar la distancia entre 2 puntos del plano carteciano.
    const distance = (a, b) => { return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))}

    /*Esta constante recibe 3 valores como parametros, x, y, element, el ultimo es un objeto. Del objeto se desarma para asi poder tener sus difetentes atributos.
    Uno de los atributos que tiene este objeto seria el atributo TYPE el cual tiene como tipo de dato un string en el cual se describe el tipo de elemento que este 
    posee, para que permita modificar o ejecutar las funciones de manera optima y deacuerdo al tipo de objeto.

    Esta funcion dependiendo del tipo de objeto realizara distintas operaciones matematicas deacuerdo a la geometria de estos (Por ejemplos los rectangulos o los vectores). Apartir de estas operaciones devolvera un valor verdadero o falso dependiendo del resultado de estas. */
    const positionWithin = (x, y, element) => {
      //? Desarmo el objeto en las variables pertinentes
      const {x1, y1, x2, y2, type} = element;
      if(type === "rect") {
        const topLeft = locationPoint(x, y, x1, y1, "topl")
        const topRight = locationPoint(x, y, x2, y1, "topr")
        const bottomLeft = locationPoint(x, y, x1, y2, "btnl")
        const bottomRight = locationPoint(x, y, x2, y2, "btnr")
        //? Esto lo que hace es devolver inside si se encuentra x y y dentro de los rangos de valores
        const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;

        return inside || topRight || bottomRight || topLeft || bottomLeft
      } else if (type === 'line'){
        const a = {x: x1, y: y1};
        const b = {x: x2, y: y2};
        const c = {x, y};
        const offSet = distance(a, b) - (distance(a, c) + distance(b, c))


        //? Esto devolvera true si el valor obsoluto del offSet es menor a uno (0)
        const inside = Math.abs(offSet) < 1 ? "inside" : null;
        const start = locationPoint(x, y, x1, y1, "start")
        const end = locationPoint(x, y, x2, y2, "end")
        return inside || start || end
      }
    }

    const adjustCoordinates = (element) => {
      const {x1, y1, x2, y2, type} = element;

      if(type === "rect" ) {
        const minX = Math.min(x1, x2);
        const maxX = Math.max(x1, x2);
        const minY = Math.min(y1, y2);
        const maxY = Math.max(y1, y2);

        return {x1: minX, y1: minY, x2: maxX, y2: maxY}
      } else if(type === "line"){
        if(x1 < x2 || (x1 === x2 && y1 < y2)){
          return {x1, y1, x2, y2}
        } else {
          return {x1:x2, y1:y2, x2:x1, y2:y1}
        }
      }
    }


    const locationPoint = (x1, y1, x2, y2, name) => {
        return Math.abs(x1 - x2) < 6 && Math.abs(y1 - y2) < 6 ? name : null
    }

    const cursorValue = (position) => {
      switch (position) {
        case "topl":
        case "btnr":
          return "nwse-resize";
        case "topr":
        case "btnl":
          return "nesw-resize"
        case "start":
        case "end":
          return "ns-resize" 
        default:
          return "grab"
      }
    }

    const resizeCoordinates = (x, y, position, coordinates) => {
        const {x1, y1, x2, y2} = coordinates;

        switch (position) {
          case "topl":
          case "start":
            return {x1: x, y1: y, x2, y2}
          case "topr":
            return {x1, y1: y, x2: x, y2}
          case "btnl": 
          case "end": 
            return {x1, y1, x2: x, y2:y}
          case "brnr":
            return {x1:x, y1, x2, y2:y}   
          default: 
            null
        }
    }
  
  //---------------------------------------------------------------------------------------------------------------
  //FUNCIONES
  //---------------------------------------------------------------------------------------------------------------
    // Esta funcion es mas sensilla de explicar. Recibe 6 parametros, dependiendo del parametro TYPE esta renderizara un elemento. 
    // Con los parametros obtenidos esta retornara un objeto que aparte de los parametros obtenidos, tambien enviara la renderizacion del elemento
    function createElement(id, x1, y1, x2, y2, type) {
      let roughtElement;
        if(type === "line") {
          roughtElement = generator.line(x1, y1, x2, y2)
        } else if (type === "rect") {
          roughtElement = generator.rectangle(x1, y1, x2 - x1, y2 -y1)
        }
        return {id, x1, y1, x2, y2, type,  roughtElement}
    }


    //Esta funcion es extraña. Lo que hace es por cada elemento del array ejecuta la funcion isWithin, para encontrar el elemento que tenga las cordenadas en el punto seleccionado
    function getElementPosition(x, y, elements) {
      return elements.map(element => 
        ({...element , position: positionWithin(x, y, element)})).find(element => element.position != null)
    }


function App() {

  
  //---------------------------------------------------------------------------------------------------------------
  // USE STATES
  //---------------------------------------------------------------------------------------------------------------
    const [elements, setElements, undo, redo] = useHistory([]);
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
      //Valores de la ubicacion del mouse
      const {clientX, clientY} = e;
      // Cambia el valor del cursor dependiendo de la ubicacion de este ademas de que cambia el valor de grab
      if(types === 'selection'){
        const element = getElementPosition(clientX, clientY, elements);
        e.target.style.cursor = element ? "grabbing" : "default";
        setGrab(true);
          if(element) {
            const offsetX = clientX - element.x1;
            const offsetY = clientY - element.y1;
            setSlect({...element, offsetX, offsetY})
            if(element.position === "inside") {
              setAction('moving')
            } else {
              setAction('resizing')
            }
          }
      } else {
        if(types === "rect" || types === "line"){
          const element = getElementPosition(clientX, clientY, elements);
          e.target.style.cursor = element ? "crosshair" : "default";
          setGrab(true);
        }
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
        event.target.style.cursor = element ?  cursorValue(element.position) : "default";
      } else if(types === "selection" && isGrab === true) {
        const element = getElementPosition(clientX, clientY, elements);
        event.target.style.cursor = element ? "grabbing" : "default";
      } else if(types === "rect" || types === "line"){
        event.target.style.cursor = "crosshair";
      }

      if (action === 'drawing') {
        //? Aqui lo que se hace es obtener el valor previo que fue agregado en la funcion de click en el canvas
        const index = elements.length - 1;
        const {x1, y1} = elements[index] 
        
        updateElement(index, x1, y1, clientX, clientY, types)
      } else if (action === "moving") {
          const { id, x1, y1, x2, y2, type, offsetX, offsetY } = slectElm
          const width = x2-x1;
          const height = y2-y1;

          const nextX = clientX - offsetX;
          const nextY = clientY - offsetY
          updateElement(id, nextX, nextY, nextX + width, nextY + height, type)
      } else if(action === "resizing") {
          const { id, type, position, ...coordinates } = slectElm
          const {x1, y1, x2, y2 } = resizeCoordinates(clientX, clientY, position, coordinates)
          updateElement(id, x1, y1, x2, y2, type)
      }
    }

    //! Funcion para cuando se suelte el click en el canvas canvas
    const handledMouseUp = (event) => {
      const {clientX, clientY} = event;
      if(slectElm) {
        const index = slectElm.id;
        const {id, type} = elements[index];

        if(action === "drawing" || action === "resizing"){  
          const {x1, y1, x2, y2} = adjustCoordinates(elements[index])
          updateElement(id, x1, y1, x2, y2, type)
        }
      }

      //? Este if es para cambiar el valor del mouse
      if (types === "selection") {
        const element = getElementPosition(clientX, clientY, elements);
        event.target.style.cursor = element ? "grab" : "default";
      } else  if(types === "rect" || types === "line"){
        event.target.style.cursor = "crosshair";
      }
      
      setGrab(false)
      setAction('none');
      setSlect(null);
    }

    const RedoElement = () => {

    }

    const UnDoElement = () => {

    }

  //---------------------------------------------------------------------------------------------------------------
  // USE EFFECTS
  //---------------------------------------------------------------------------------------------------------------
  useLayoutEffect(() => {
    const board = document.getElementById("board");
    const ctx = board.getContext("2d");
    ctx.clearRect(0, 0, board.width, board.height)

    //* Declaracion del tablero por medio de la API de Rought
    const roughtBoard = rough.canvas(document.getElementById("board"));
    roughtBoard.width = window.innerWidth

    elements.forEach(element => roughtBoard.draw(element.roughtElement))  
  }, [elements])


 return(
  
    <div> 
        <div className="fixed w-full">
          <div className="flex justify-between">
            <div className='my-3 py-2 px-4 border border-1 border-slate-300 rounded-md sombra ml-auto'>
                <ul className="w-auto gap-2 flex">
                    <li>
                        <input type="radio" id="selection" name="Selection" className="hidden peer" 
                        checked={types === "selection"} onChange={() => setTypes("selection")}/>
                        <Labels For={"selection"}>
                          { MenuItems.selection }
                        </Labels>
                    </li>
                    <li>
                        <input type="radio" id="line" name="Line" className="hidden peer" 
                        checked={types === "line"} onChange={() => setTypes("line")}/>
                        <Labels For={"line"}>
                          { MenuItems.line }
                        </Labels>
                    </li>
                    <li>
                        <input type="radio" id="rectangle" name="Rectangle" className="hidden peer" 
                        checked={types === "rect"} onChange={() => setTypes("rect")}/>
                        <Labels For={"rectangle"}>
                          { MenuItems.square }
                        </Labels>
                    </li>
                </ul>
            </div>
            <div className="my-3 py-2 px-4 border border-1 border-slate-300 rounded-md sombra ml-auto mr-3">
                <ul className='flex gap-2'>
                    <li>
                        <input type="button" id="undo" name="undo" className='hidden peer' 
                        onClick={redo}/>
                        <Labels For={'undo'}>
                              {MenuItems.undo}
                        </Labels>
                    </li>

                    <li>
                        <input type="button" id="redo" name="undo" className='hidden peer' 
                        onClick={undo}/>
                        <Labels For={'redo'}>
                              {MenuItems.redo}
                        </Labels>
                    </li>
                </ul>
            </div>
          </div>
        </div>
      
      <canvas 
        id='board' 
        width={width} 
        height={height} 
        className='bg-gray-600'
        onMouseDown={handledMouseDown}
        onMouseMove={handledMouseMove}
        onMouseUp={handledMouseUp}
      >
        
      </canvas>
    </div>
  )
}

export default App


/*
  Que es eso que hace que el mouse cambie de posicion?
  element es la variable que almacena el resultado de getElementPosition(clientX, clientY, elements). Si element tiene un valor (es decir, si el mouse está sobre un elemento), entonces event.target.style.cursor se establece en "grabbing", lo que generalmente indica que el cursor está en una posición donde se puede agarrar y arrastrar algo. Si element es null (el mouse no está sobre ningún elemento), entonces el cursor se establece en "default", que es el cursor estándar del navegador.
*/